export type LighthouseCategory =
  | 'performance'
  | 'accessibility'
  | 'seo'
  | 'best-practices';

export interface LighthouseRunOptions {
  url: string;
  outputDir?: string;
  onlyCategories?: LighthouseCategory[];
}

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

export interface LighthouseMetrics {
  fcp: number | null;
  lcp: number | null;
  speedIndex: number | null;
  totalBlockingTime: number | null;
  cls: number | null;
}

export interface LighthouseDeviceResult {
  scores: LighthouseScores;
  metrics: LighthouseMetrics;
}

export interface LighthouseCoreWebVitalsResult {
  mobile: LighthouseDeviceResult;
  desktop: LighthouseDeviceResult;
  reportPaths: {
    mobile: string;
    desktop: string;
  };
}
