import { launch } from "puppeteer";

const browse = async ({
  url,
  size,
  dir,
}: {
  url: string;
  size: [number, number];
  dir: string;
}): Promise<{ pageCount: number }> => {
  const browser = await launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    console.log("browser lauched");
    const page = await browser.newPage();

    await page.goto(url, {
      timeout: 60 * 10 * 1000,
      waitUntil: "networkidle0",
    });
    console.log("visit page");

    const wraps = await page.$$(".wrap");

    console.log("get wraps", wraps.length);

    await page.setViewport({
      width: size[0],
      height: size[1] * wraps.length,
      deviceScaleFactor: 1,
    });

    console.log("set viewport");

    for (let index = 0; index < wraps.length; index++) {
      const element = wraps[index];

      await element.screenshot({
        path: `./${dir}/${index}.png`,
        type: "png",
      });

      console.log(`screenshot ${index} finished`);
    }

    console.log("screenshot finished");
    browser.close();

    return {
      pageCount: wraps.length,
    };
  } catch (ex) {
    console.log("访问路书失败", ex);
    throw ex;
  } finally {
    browser.close();
  }
};

export default browse;
