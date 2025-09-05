const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.title();
  if (title.includes('Example')) {
    console.log('Title contains "Example"');
  } else {
    console.log('Title does not contain "Example"');
  }
  await browser.close();
})();
