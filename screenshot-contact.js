const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ bypassCSP: true });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; opacity: 1 !important; }';
    document.head.appendChild(style);
  });

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/Juanchi/AppData/Local/Temp/tablet-section.png' });
  await browser.close();
  console.log('done');
})();
