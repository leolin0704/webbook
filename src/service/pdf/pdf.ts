import PDFDocument from 'pdfkit';

import { SCREENSHOTS_DIR, PDF_DIR } from '../../consts';

const generatePdf = (destination:any, { size, pageCount, fileName }: { size: [number, number], pageCount: number; fileName: string }) => {
  
  try {
    // Create a document
    const doc = new PDFDocument({
      margin: 0,
      size,
    });

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(destination);

    doc.image(`${SCREENSHOTS_DIR}/0.png`, {
      fit: size,
      align: 'center',
      valign: 'center'
    });

    for (let index = 1; index < pageCount; index++) {
      doc.addPage({
        margin: 0,
        size: size,
      }).image(`${SCREENSHOTS_DIR}/${index}.png`, {
        fit: size,
        align: 'center',
        valign: 'center'
      });
    }

    // Finalize PDF file
    doc.end();
  }catch (ex) {
    console.log('生成PDF失败', ex);
    throw ex;
  }
}

export default generatePdf;
