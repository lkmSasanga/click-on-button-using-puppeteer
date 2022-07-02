const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();

  await page.goto("https://www.wikipedia.org/", {
    waitUntil: "networkidle2",
  });

  await page.waitForTimeout(2000);

  let searchText = await page.waitForXPath('//*[@id="searchInput"]');
  await searchText.type("puppeteer");

  await page.waitForXPath(`//*[@id="search-form"]/fieldset/button`, {
    visible: true,
  });

  const [search] = await page.$x(`//*[@id="search-form"]/fieldset/button`);
  if (search) {
    await search.click();
  }
})();
