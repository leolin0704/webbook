import { Request, Response } from "express";
import getPdf from "../service/pdfService";
import cache from "../cache";
import { PROCESS_KEY } from '../consts';


const index = async (req: Request, res: Response): Promise<void> => {
  req.setTimeout(60 * 20 * 1000);
  try {
    const { query } = req;

    const url = query["url"] as string;

    if(!url || url.length === 0) {
      res.status(500).json({ message: "缺少参数url" });
      return;
    }

    if(cache.get(PROCESS_KEY)) {
      res.status(405).json({ message: "同一时间只能生成一份路书，请稍后重试" });
      return;
    }

    cache.set(PROCESS_KEY, true);

    console.log("pdf request received url:", url);

    const result = await getPdf(url, res);

    cache.del(PROCESS_KEY);

    if (!result) {
      res.status(405).json({ message: "没有页面需要生成" });
    }
  } catch (ex) {
    console.log("err:", ex);
    res.status(500).json({ message: ex });
  }
};

export { index };
