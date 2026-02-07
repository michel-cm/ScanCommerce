export interface DesktopScreenshot {
  fold: number;
  path: string;
}

export interface DesktopScreenshotResult {
  folds: DesktopScreenshot[];
  fullPage: string;
}

export interface DesktopEngineResult {
  url: string;
  finalUrl: string;
  title: string;

  html: {
    length: number;
  };

  screenshots: {
    desktop: {
      totalFolds: number;
      files: DesktopScreenshot[];
      fullPage: string;
    };
  };

  timings: {
    loadMs: number;
    totalMs: number;
  };

  errors?: string[];
}
