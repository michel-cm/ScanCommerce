import * as path from 'path';
import { launchBrowser } from './browser';
import { scrollPage } from './scroll';
import { takeDesktopScreenshots } from './screenshot';
import { DesktopEngineResult, DesktopScreenshotResult } from './types';

export async function runDesktopEngine(url: string): Promise<DesktopEngineResult> {
  const start = Date.now();
  const browser = await launchBrowser();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  const errors: string[] = [];

  const loadStart = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  const loadMs = Date.now() - loadStart;

  const title = await page.title();
  const finalUrl = page.url();
  const html = await page.content();

  const totalFolds = await scrollPage(page);

  const screenshotsDir = path.resolve(
    process.cwd(),
    'screenshots',
    'desktop'
  );

  const screenshots: DesktopScreenshotResult = await takeDesktopScreenshots(
    page,
    totalFolds,
    screenshotsDir
  );

  await browser.close();

  return {
    url,
    finalUrl,
    title,
    html: {
      length: html.length,
    },
    screenshots: {
      desktop: {
        totalFolds,
        files: screenshots.folds,
        fullPage: screenshots.fullPage,
      },
    },
    timings: {
      loadMs,
      totalMs: Date.now() - start,
    },
    errors: errors.length ? errors : undefined,
  };

}
