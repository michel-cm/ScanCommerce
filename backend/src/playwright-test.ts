import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function test() {
 const browser = await chromium.launch({
    headless: false, //  ABRE O NAVEGADOR
    slowMo: 50,      //  pra ver acontecendo
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  const url = 'https://blandigital.uappi.dev.br/';

  await page.goto(url, { waitUntil: 'networkidle' });

  const html = await page.content();
  const title = await page.title();
  const finalUrl = page.url();

  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const desktopPath = path.join(screenshotsDir, 'desktop.png');

  await page.screenshot({
    path: desktopPath,
    fullPage: true,
  });

  console.log({
    title,
    finalUrl,
    htmlLength: html.length,
    desktopScreenshotPath: desktopPath,
  });

  // deixa o navegador aberto 5s pra você ver
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
}

test();
