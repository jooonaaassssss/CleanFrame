import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const source = new URL('../app/assets/cleanframe-logo.svg', import.meta.url);
const target = fileURLToPath(new URL('../app/icon.png', import.meta.url));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 256, height: 256 }, deviceScaleFactor: 1 });
  await page.setContent('<style>body{margin:0}svg{display:block}</style>' + readFileSync(source, 'utf8'));
  await page.locator('svg').screenshot({ path: target });
  const png = readFileSync(target);
  assert.equal(png.subarray(1, 4).toString('ascii'), 'PNG');
  assert.equal(png.readUInt32BE(16), 256);
  assert.equal(png.readUInt32BE(20), 256);
  console.log('Built and verified 256 x 256 application icon.');
} finally {
  await browser.close();
}
