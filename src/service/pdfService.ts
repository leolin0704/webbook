import browse from "./pdf/browse";
import path from "path";
import fs from "fs-extra";
import pdf from "./pdf/pdf";
import { PAGE_SIZE, SCREENSHOTS_DIR_BASE } from "../consts";

export const getPdf = async (url: string, destination: any): Promise<boolean> => {
  console.log("Start getPdf", new Date());

  const screenshotsDir = path.join(
    SCREENSHOTS_DIR_BASE,
    `${new Date().getTime()}_${Math.random()}`
  );
  await fs.ensureDir(screenshotsDir);

  const { pageCount } = await browse({
    url,
    dir: screenshotsDir,
    size: PAGE_SIZE,
  });

  if (pageCount > 0) {
    await pdf({
      size: PAGE_SIZE,
      pageCount,
      dir: screenshotsDir,
      destination,
    });
  }

  console.log("End getPdf", new Date());

  fs.remove(screenshotsDir);

  return pageCount > 0;
};


export const generateImages = async (url: string, bookId: string): Promise<boolean> => {
  console.log("Start generateImages", new Date());
  const realPath= path.join(SCREENSHOTS_DIR_BASE, "roadbook", bookId);

  if(await fs.existsSync(realPath)) {
    await  fs.removeSync(realPath);
  }
 
  await fs.ensureDir(realPath);
  console.log("ensureDir for generateImages", realPath);
  const { pageCount } = await browse({
    url,
    dir: realPath,
    size: PAGE_SIZE,
  });

  console.log("End generateImages", new Date());

  return pageCount > 0;
};
