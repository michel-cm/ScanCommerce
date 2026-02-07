// engine/lighthouse/types.ts

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

export interface LighthouseRunResult {
  reportPath: string;
  scores: LighthouseScores;
}

export interface CoreWebVitalMetric {
  value: number;
  display: string;
  score: number | null;
}

export interface CoreWebVitalsResult {
  lcp: CoreWebVitalMetric;
  inp: CoreWebVitalMetric;
  cls: CoreWebVitalMetric;
  fcp: CoreWebVitalMetric;
  ttfb: CoreWebVitalMetric;
}