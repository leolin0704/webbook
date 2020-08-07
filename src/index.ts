import { launch } from 'puppeteer';
import fs from 'fs-extra';
import generatePdf from './pdf';

const SCREENSHOTS_DIR = './screenshots';
const PDF_DIR = './pdfs';

launch().then(async browser => {
  try {

    await fs.ensureDir(SCREENSHOTS_DIR);
    await fs.ensureDir(PDF_DIR);

    console.log('browser lauched', new Date());
    const page = await browser.newPage();

    await page.goto('http://www.raejoy.com/roadbook/fullpage?id=165', {
      timeout: 60 * 10 * 1000,
      waitUntil: 'networkidle0'
    });
    console.log('visit page');

    const wraps = await page.$$('.wrap');

    console.log('get wraps', wraps.length);

    await page.setViewport({
      width: 2256,
      height: 3024 * wraps.length,
      deviceScaleFactor: 1,
    });

    console.log('set viewport');

    for (var index = 0; index < wraps.length; index++) {
      const element = wraps[index];

      await element.screenshot({
        path: `./screenshots/${index}.png`,
        type: 'png',
      });

      console.log(`screenshot ${index} finished`);

      await page.evaluate((_x, _y) => {
        window.scrollTo(0, _y + 3024);
      });

      console.log(`scroll to next`);
    }

    console.log('screenshot finished');
    browser.close();

    generatePdf({
      pageCount: wraps.length,
      fileName: `${PDF_DIR}/roadbook_${new Date().toLocaleTimeString()}.pdf`,
    });

    console.log('PDf generated', new Date());
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
});
