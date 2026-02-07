import * as fs from 'fs';
import * as path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

import type { Flags, Config } from 'lighthouse';

import {
  LighthouseRunOptions,
  LighthouseRunResult,
  LighthouseScores,
} from './types';

export async function runLighthouse(
  options: LighthouseRunOptions
): Promise<LighthouseRunResult> {
  const {
    url,
    outputDir = path.resolve(process.cwd(), 'reports', 'lighthouse'),
    onlyCategories,
  } = options;

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox'],
  });

  try {
    const lighthouseOptions: Flags = {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories,
    };

    const config: Config = {
      extends: 'lighthouse:default',
    };

    const runnerResult = await lighthouse(url, lighthouseOptions, config);

    if (!runnerResult || !runnerResult.report) {
      throw new Error('Lighthouse failed to generate report');
    }

    // 👇 resolve string | string[]
    const report =
      Array.isArray(runnerResult.report)
        ? runnerResult.report.join('')
        : runnerResult.report;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const hostname = new URL(url).hostname.replace(/[:/]/g, '_');
    const reportPath = path.join(outputDir, `${hostname}.json`);

    fs.writeFileSync(reportPath, report);

    const categories = runnerResult.lhr.categories;

    const scores: LighthouseScores = {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
      bestPractices: Math.round(
        (categories['best-practices']?.score ?? 0) * 100
      ),
    };

    return {
      reportPath,
      scores,
    };
  } finally {
    await chrome.kill();
  }
}
