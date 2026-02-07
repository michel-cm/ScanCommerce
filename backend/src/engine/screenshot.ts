import { Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { DesktopScreenshot, DesktopScreenshotResult } from './types';

export async function takeDesktopScreenshots(
  page: Page,
  totalFolds: number,
  baseDir: string
): Promise<DesktopScreenshotResult> {
  const viewportHeight = page.viewportSize()?.height || 1080;
  const screenshots: DesktopScreenshot[] = [];

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Remove sticky / fixed elements
  await page.addStyleTag({
    content: `
      * {
        scroll-behavior: auto !important;
      }
      header,
      [style*="position: sticky"],
      [style*="position: fixed"],
      [class*="sticky"],
      [class*="fixed"] {
        position: static !important;
        top: auto !important;
      }
    `,
  });

  for (let i = 0; i < totalFolds; i++) {
    const filePath = path.join(baseDir, `fold-${i + 1}.png`);

    await page.evaluate(
      ({ height, index }) => {
        window.scrollTo(0, height * index);
      },
      {
        height: viewportHeight,
        index: i,
      }
    );

    await page.waitForTimeout(300);

    await page.screenshot({
      path: filePath,
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: viewportHeight,
      },
    });

    screenshots.push({
      fold: i + 1,
      path: filePath,
    });
  }

  // ---- Full page screenshot ----
  const fullPagePath = path.join(baseDir, 'fullpage.png');
  await page.screenshot({
    path: fullPagePath,
    fullPage: true,
  });

  return {
    folds: screenshots,
    fullPage: fullPagePath,
  };
}
