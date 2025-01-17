import { launch, Browser } from "puppeteer";

let browser: Browser;

const getBrowser = async (): Promise<Browser> => {
  if (!browser || !browser.isConnected()) {
    console.log("browser lauched");

    browser = await launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  return browser;
};

const browse = async ({
  url,
  size,
  dir,
}: {
  url: string;
  size: [number, number];
  dir: string;
}): Promise<{ pageCount: number }> => {
    const browser = await getBrowser();
    const page = await browser.newPage();
  try {
    await page.goto(url, {
      timeout: 60 * 10 * 1000,
      waitUntil: "networkidle0",
    });
    console.log("visit page");

    const wraps = await page.$$(".wrap");

    console.log("get wraps", wraps.length);

    await page.setViewport({
      width: size[0],
      height: size[1],
      deviceScaleFactor: 1,
    });

    console.log("set viewport");

    for (let index = 0; index < wraps.length; index++) {
      const element = wraps[index];

      await element.screenshot({
        path: `${dir}/${index}.png`,
        type: "png",
      });

      console.log(`screenshot ${index} finished`);

      await page.evaluate((_x, _y) => {
        window.scrollTo(0, _y + 3024);
      });

      console.log(`scroll to next`);
    }

    console.log("screenshot finished");
    

    return {
      pageCount: wraps.length,
    };
  } catch (ex) {
    console.log("访问路书失败", ex);
    throw ex;
  } finally {
    try {
      page.close();
    }catch {

    }
  }
};

export default browse;
