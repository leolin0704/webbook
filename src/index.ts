import browse from './browse';
import pdf from './pdf';
import { PDF_DIR, PAGE_SIZE } from './consts';

const main = async () => {
  console.log('Start', new Date());

  const { pageCount } = await browse({
    url: 'http://www.raejoy.com/roadbook/fullpage?id=165',
    size: PAGE_SIZE,
  });

  await pdf({
    size: PAGE_SIZE,
    pageCount,
    fileName: `${PDF_DIR}/roadbook_${new Date().toLocaleTimeString()}.pdf`,
  });
  
  console.log('End', new Date());
}

main();
