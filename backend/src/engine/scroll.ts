import { Page } from 'playwright';

export async function scrollPage(page: Page): Promise<number> {
  const viewportHeight = page.viewportSize()?.height || 1080;

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const totalFolds = Math.ceil(totalHeight / viewportHeight);

  for (let i = 0; i < totalFolds; i++) {
    await page.evaluate((h) => window.scrollBy(0, h), viewportHeight);
    await page.waitForTimeout(400);
  }

  await page.evaluate(() => window.scrollTo(0, 0));

  return totalFolds;
}
