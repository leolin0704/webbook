import browse from './pdf/browse';
import path from 'path';
import fs from 'fs-extra';
import pdf from './pdf/pdf';
import { PAGE_SIZE, SCREENSHOTS_DIR_BASE } from '../consts';

const getPdf = async (url: string, destination: any) => {
  console.log('Start', new Date());

  const screenshotsDir = path.join(SCREENSHOTS_DIR_BASE, `${new Date().getTime()}_${Math.random()}`);
  await fs.ensureDir(screenshotsDir);

  const { pageCount } = await browse({
    url,
    dir: screenshotsDir,
    size: PAGE_SIZE,
  });

  if(pageCount > 0) {
    await pdf(destination,
      {
        size: PAGE_SIZE,
        pageCount,
        dir: screenshotsDir,
      });
  }

  console.log('End', new Date());

  fs.remove(screenshotsDir);
  
  return pageCount > 0;
}

export default getPdf;