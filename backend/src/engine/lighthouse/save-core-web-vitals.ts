import * as fs from 'fs';
import * as path from 'path';
import { extractCoreWebVitals } from './extract-core-web-vitals';

export function saveCoreWebVitals(
  lighthouseJsonPath: string,
  outputDir: string
) {
  const raw = JSON.parse(
    fs.readFileSync(lighthouseJsonPath, 'utf-8')
  );

  if (!raw?.audits || !raw?.categories) {
    throw new Error('Invalid Lighthouse JSON');
  }

  const vitals = extractCoreWebVitals(raw);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(
    outputDir,
    'core-web-vitals.json'
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(vitals, null, 2)
  );

  return outputPath;
}
