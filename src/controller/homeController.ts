import { Request, Response } from "express";
import { getPdf, generateImages } from "../service/pdfService";
import cache from "../cache";
import { PROCESS_KEY } from '../consts';


export const index = async (req: Request, res: Response): Promise<void> => {
  req.setTimeout(60 * 20 * 1000);

  const { query } = req;

  const url = query["url"] as string;

  console.log("pdf request received url:", url);

  if (!url || url.length === 0) {
    res.status(500).json({ message: "缺少参数url" });
    return;
  }

  if (cache.get(PROCESS_KEY)) {
    res.status(405).json({ message: "同一时间只能生成一份路书，请稍后重试" });
    return;
  }

  cache.set(PROCESS_KEY, true);

  try {
    const result = await getPdf(url, res);

    if (!result) {
      res.status(400).json({ message: "没有页面需要生成" });
    }
  } catch (ex) {
    console.log("err:", ex);
    res.status(500).json({ message: ex });
  } finally {
    cache.del(PROCESS_KEY);
  }
};


export const images = async (req: Request, res: Response): Promise<void> => {
  req.setTimeout(60 * 20 * 1000);

  const { query } = req;

  const url = query["url"] as string;
  const path = query["path"] as string;

  console.log("pdf request received url:", url);
  console.log("pdf request received path:", path);

  if (!url || url.length === 0) {
    res.status(500).json({ message: "缺少参数url" });
    return;
  }

  if (!path || path.length === 0) {
    res.status(500).json({ message: "缺少参数path" });
    return;
  }

  try {
    const result = await generateImages(url, path);

    if (!result) {
      res.status(400).json({ message: "没有页面需要生成" });
    }else{
      res.status(200).json({ path });
    }
  } catch (ex) {
    console.log("err:", ex);
    res.status(500).json({ message: ex });
  }
};
