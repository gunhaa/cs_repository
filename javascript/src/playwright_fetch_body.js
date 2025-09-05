const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const bodyText = await page.textContent('body');
  console.log('본문 텍스트:');
  console.log(bodyText);
  await browser.close();
})();
