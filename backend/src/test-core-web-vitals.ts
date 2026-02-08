import * as fs from 'fs';

export interface CoreWebVitalsResult {
  lcp: number | null;
  fcp: number | null;
  cls: number | null;
  inp: number | null;
}

export function extractCoreWebVitals(
  lighthouseJsonPath: string
): CoreWebVitalsResult {
  const raw = JSON.parse(fs.readFileSync(lighthouseJsonPath, 'utf-8'));

  // 🔥 Normalização do formato
  const lhr =
    raw.lhr ??
    (Array.isArray(raw) ? raw[0]?.lhr : raw);

  if (!lhr || !lhr.audits) {
    throw new Error('Formato inválido de Lighthouse JSON');
  }

  const audits = lhr.audits;

  const getNumericValue = (id: string): number | null =>
    audits[id]?.numericValue ?? null;

  return {
    lcp: getNumericValue('largest-contentful-paint'),
    fcp: getNumericValue('first-contentful-paint'),
    cls: getNumericValue('cumulative-layout-shift'),
    inp: getNumericValue('interaction-to-next-paint'),
  };
}
