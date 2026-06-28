import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.SMOKE_URL || 'http://localhost:5173/';
const outputDir = 'test-results';

const viewports = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 1100 },
    isMobile: false,
    hasTouch: false,
  },
  {
    name: 'mobile',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const config of viewports) {
    const context = await browser.newContext({
      viewport: config.viewport,
      isMobile: config.isMobile,
      hasTouch: config.hasTouch,
      deviceScaleFactor: config.isMobile ? 2 : 1,
    });
    const page = await context.newPage();

    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(1800);

    const heroVisible = await page.getByText('To My Habibty ❤️').isVisible();
    assert(heroVisible, `${config.name}: hero heading is not visible`);

    const layout = await page.evaluate(() => {
      const heading = document.querySelector('h1')?.getBoundingClientRect();
      const button = Array.from(document.querySelectorAll('button')).find((node) =>
        node.textContent.includes('Start Our Story'),
      )?.getBoundingClientRect();

      return {
        heading,
        button,
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });

    assert(layout.heading?.width > 0, `${config.name}: heading has no measurable width`);
    assert(layout.button?.top > layout.heading?.top, `${config.name}: hero button overlaps above heading`);
    assert(
      layout.bodyWidth <= layout.viewportWidth + 4,
      `${config.name}: page has unexpected horizontal overflow`,
    );

    const imageStatus = await page.evaluate(() =>
      Array.from(document.images).map((image) => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        width: image.naturalWidth,
        height: image.naturalHeight,
      })),
    );

    const brokenImages = imageStatus.filter(
      (image) => !image.complete || image.width < 1 || image.height < 1,
    );
    assert(brokenImages.length === 0, `${config.name}: images failed to load`);

    const canvasStats = await page.locator('canvas').first().evaluate((canvas) => {
      const gl =
        canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
        canvas.getContext('webgl', { preserveDrawingBuffer: true }) ||
        canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });

      if (!gl) {
        return { width: canvas.width, height: canvas.height, nonBlankSamples: 0 };
      }

      const pixel = new Uint8Array(4);
      let nonBlankSamples = 0;
      const columns = 9;
      const rows = 9;

      for (let xIndex = 1; xIndex < columns; xIndex += 1) {
        for (let yIndex = 1; yIndex < rows; yIndex += 1) {
          const x = Math.floor((canvas.width * xIndex) / columns);
          const y = Math.floor((canvas.height * yIndex) / rows);
          gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

          if (pixel[3] > 0 && pixel[0] + pixel[1] + pixel[2] > 0) {
            nonBlankSamples += 1;
          }
        }
      }

      return { width: canvas.width, height: canvas.height, nonBlankSamples };
    });

    assert(canvasStats.width > 0 && canvasStats.height > 0, `${config.name}: canvas has no size`);
    assert(canvasStats.nonBlankSamples > 0, `${config.name}: Three.js canvas appears blank`);

    await page.screenshot({
      path: `${outputDir}/${config.name}.png`,
      fullPage: true,
      animations: 'disabled',
    });

    await context.close();
  }
} finally {
  await browser.close();
}

console.log(`Smoke checks passed for ${viewports.map((item) => item.name).join(' and ')}.`);
