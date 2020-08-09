import { Request, Response } from "express";
import getPdf from "../service/pdfService";
import cache from "../cache";

const index = async (req: Request, res: Response): Promise<void> => {
  req.setTimeout(60 * 20 * 1000);
  try {
    const { query } = req;

    const url = query["url"] as string;

    if(!url || url.length === 0) {
      res.status(500).json({ error: "缺少参数url" });
      return;
    }

    if(cache.get(url)) {
      res.status(201).json({ message: "已经在处理该页面" });
      return;
    }

    cache.set(url, true);

    console.log("pdf request received url:", url);

    const result = await getPdf(url, res);

    if (!result) {
      res.status(500).json({ error: "没有页面需要生成" });
    }
  } catch (ex) {
    console.log("err:", ex);
    res.status(500).json({ error: ex });
  }
};

export { index };
