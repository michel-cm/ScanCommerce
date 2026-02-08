import * as fs from 'fs';
import * as path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

import type { Flags, Config } from 'lighthouse';

import { urlToDirName } from '../utils/url-to-dir';
import {
  LighthouseRunOptions,
  LighthouseScores,
  LighthouseCoreWebVitalsResult,
} from './types';

import { extractCoreWebVitalsFromLhr } from './extract-core-web-vitals';

function extractScores(lhr: any): LighthouseScores {
  const categories = lhr.categories;

  return {
    performance: Math.round((categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
    seo: Math.round((categories.seo?.score ?? 0) * 100),
    bestPractices: Math.round(
      (categories['best-practices']?.score ?? 0) * 100
    ),
  };
}

async function runSingleLighthouse(
  url: string,
  chromePort: number,
  config: Config,
  outputPath: string,
  onlyCategories?: string[]
) {
  const flags: Flags = {
    port: chromePort,
    output: 'json',
    logLevel: 'error', // 👈 agora é literal, não string genérica
    onlyCategories,
  };

  const result = await lighthouse(url, flags, config);

  if (!result || !result.report || !result.lhr) {
    throw new Error('Lighthouse failed');
  }

  const report =
    Array.isArray(result.report)
      ? result.report.join('')
      : result.report;

  fs.writeFileSync(outputPath, report);

  return {
    lhr: result.lhr,
  };
}

export async function runLighthouse(
  options: LighthouseRunOptions
): Promise<LighthouseCoreWebVitalsResult> {
  const { url, onlyCategories } = options;

  const siteDir = urlToDirName(url);

  const baseDir = path.resolve(
    process.cwd(),
    'reports',
    'lighthouse',
    siteDir
  );

  fs.mkdirSync(baseDir, { recursive: true });

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox'],
  });

  try {
    // ---------- MOBILE ----------
    const mobileReportPath = path.join(baseDir, 'mobile.full.json');

    const mobileConfig: Config = {
      extends: 'lighthouse:default',
    };

    const mobile = await runSingleLighthouse(
      url,
      chrome.port,
      mobileConfig,
      mobileReportPath,
      onlyCategories
    );

    // ---------- DESKTOP ----------
    const desktopReportPath = path.join(baseDir, 'desktop.full.json');

    const desktopConfig: Config = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    };

    const desktop = await runSingleLighthouse(
      url,
      chrome.port,
      desktopConfig,
      desktopReportPath,
      onlyCategories
    );

    const result: LighthouseCoreWebVitalsResult = {
      mobile: {
        scores: extractScores(mobile.lhr),
        metrics: extractCoreWebVitalsFromLhr(mobile.lhr),
      },
      desktop: {
        scores: extractScores(desktop.lhr),
        metrics: extractCoreWebVitalsFromLhr(desktop.lhr),
      },
      reportPaths: {
        mobile: mobileReportPath,
        desktop: desktopReportPath,
      },
    };

    const coreVitalsPath = path.join(baseDir, 'core-web-vitals.json');
    fs.writeFileSync(
      coreVitalsPath,
      JSON.stringify(result, null, 2)
    );

    return result;
  } finally {
    await chrome.kill();
  }
}
