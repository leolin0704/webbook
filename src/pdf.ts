import PDFDocument from 'pdfkit';
import fs from 'fs';

const generatePdf = ({pageCount, fileName}:{pageCount:number;fileName:string}) => {
  // Create a document
  const doc = new PDFDocument({
    margin: 0,
    size: [2256, 3024]
  });

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream(fileName));

  doc.image('./screenshots/0.png', {  
    fit: [2256, 3024],
    align: 'center',
    valign: 'center'
  });

  for (let index = 1; index < pageCount; index++) {
    doc.addPage({
      margin: 0,
      size: [2256, 3024]
    }).image(`./screenshots/${index}.png`, {  
      fit: [2256, 3024],
      align: 'center',
      valign: 'center'
    });
  }

  // Finalize PDF file
  doc.end();

}

export default generatePdf;
