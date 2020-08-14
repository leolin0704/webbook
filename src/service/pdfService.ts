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


export const generateImages = async (url: string, path: string): Promise<boolean> => {
  console.log("Start generateImages", new Date());

  await fs.ensureDir(path);

  const { pageCount } = await browse({
    url,
    dir: path,
    size: PAGE_SIZE,
  });

  console.log("End generateImages", new Date());

  return pageCount > 0;
};
