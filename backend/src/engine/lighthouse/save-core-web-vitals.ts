import * as fs from 'fs';
import * as path from 'path';
import { extractCoreWebVitalsFromLhr } from './extract-core-web-vitals';

export function saveCoreWebVitals(
  lighthouseJsonPath: string,
  outputPath: string
) {
  const raw = JSON.parse(fs.readFileSync(lighthouseJsonPath, 'utf-8'));

  if (!raw.lhr) {
    throw new Error('Invalid Lighthouse JSON: missing lhr');
  }

  const vitals = extractCoreWebVitalsFromLhr(raw.lhr);

  fs.writeFileSync(
    outputPath,
    JSON.stringify(vitals, null, 2)
  );

  return vitals;
}
