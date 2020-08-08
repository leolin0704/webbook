import PDFDocument from "pdfkit";
import fs from "fs";

const generatePdf = ({
  size,
  pageCount,
  dir,
  destination
}: {
  size: [number, number];
  pageCount: number;
  dir: string;
  destination: any;
}): void => {
  try {
    // Create a document
    const doc = new PDFDocument({
      margin: 0,
      size,
    });

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(destination);

    doc.image(`${dir}/0.png`, {
      fit: size,
      align: "center",
      valign: "center",
    });

    for (let index = 1; index < pageCount; index++) {
      doc
        .addPage({
          margin: 0,
          size: size,
        })
        .image(`${dir}/${index}.png`, {
          fit: size,
          align: "center",
          valign: "center",
        });
    }

    // Finalize PDF file
    doc.end();
  } catch (ex) {
    console.log("生成PDF失败", ex);
    throw ex;
  }
};

export default generatePdf;
