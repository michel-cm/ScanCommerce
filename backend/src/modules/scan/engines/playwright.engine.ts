import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

export interface PlaywrightResult {
  html: string;
  title: string;
  finalUrl: string;
  screenshots: {
    desktop: string;
    mobile: string;
  };
}

@Injectable()
export class PlaywrightEngine {
  async capture(url: string): Promise<PlaywrightResult> {
    const browser = await chromium.launch({ headless: true });

    try {
      // --- Contexto Desktop ---
      const desktopContext = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
      const desktopPage = await desktopContext.newPage();

      // Acessar URL e aguardar networkidle
      await desktopPage.goto(url, { waitUntil: 'networkidle',  timeout: 60_000, });

      // Capturar dados principais (usando a versão desktop como referência)
      const html = await desktopPage.content();
      const title = await desktopPage.title();
      const finalUrl = desktopPage.url();

      // Screenshot Desktop
      const desktopBuffer = await desktopPage.screenshot({ fullPage: true });
      const desktopScreenshot = desktopBuffer.toString('base64');

      await desktopContext.close();

      // --- Contexto Mobile ---
      const mobileContext = await browser.newContext({
        viewport: { width: 375, height: 667 }, // Viewport similar ao iPhone SE
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        hasTouch: true,
      });
      const mobilePage = await mobileContext.newPage();

      // Acessar URL novamente para renderização mobile
      await mobilePage.goto(url, { waitUntil: 'networkidle',  timeout: 60_000, });

      // Screenshot Mobile
      const mobileBuffer = await mobilePage.screenshot({ fullPage: true });
      const mobileScreenshot = mobileBuffer.toString('base64');

      await mobileContext.close();

      return {
        html,
        title,
        finalUrl,
        screenshots: {
          desktop: desktopScreenshot,
          mobile: mobileScreenshot,
        },
      };
    } finally {
      await browser.close();
    }
  }
}
