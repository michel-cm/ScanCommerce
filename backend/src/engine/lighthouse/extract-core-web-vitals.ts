import { LighthouseMetrics } from './types';

export function extractCoreWebVitalsFromLhr(
  lhr: any
): LighthouseMetrics {
  const audits = lhr.audits;

  const getNumeric = (id: string): number | null => {
    const value = audits[id]?.numericValue;
    return typeof value === 'number' ? Math.round(value) : null;
  };

  return {
    fcp: getNumeric('first-contentful-paint'),
    lcp: getNumeric('largest-contentful-paint'),
    speedIndex: getNumeric('speed-index'),
    totalBlockingTime: getNumeric('total-blocking-time'),
    cls: audits['cumulative-layout-shift']?.numericValue ?? null,
  };
}
