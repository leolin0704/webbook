import browse from './pdf/browse';
import pdf from './pdf/pdf';
import { PDF_DIR, PAGE_SIZE } from '../consts';

const getPdf = async (url: string, destination: any) => {
  console.log('Start', new Date());

  const { pageCount } = await browse({
    url,
    size: PAGE_SIZE,
  });

  if(pageCount > 0) {
    await pdf(destination,
      {
        size: PAGE_SIZE,
        pageCount,
        fileName: `${PDF_DIR}/roadbook_${new Date().toLocaleTimeString()}.pdf`,
      });
  }

  console.log('End', new Date());

  return pageCount > 0;
}

export default getPdf;