import { Request, Response } from "express";
import getPdf from "../service/pdfService";

const index = async (req: Request, res: Response): Promise<void> => {
  req.setTimeout(60 * 20 * 1000);
  try {
    const { query } = req;

    const url = query["url"] as string;

    console.log("pdf request received url:", url);

    const result = await getPdf(url);

    if (!result) {
      res.status(500).json({ error: "没有页面需要生成" });
    } else {
      res.status(200).end();
    }
  } catch (ex) {
    console.log("err:", ex);
    res.status(500).json({ error: ex });
  }
};

export { index };
