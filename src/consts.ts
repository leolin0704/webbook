
const os = require('os');
let TMP_SCREENSHOTS_DIR_BASE = "/usr/project-data/yuejie/storage/images";
if (os.type() == 'Windows_NT') {
    TMP_SCREENSHOTS_DIR_BASE = "D:/money/yuejie/jingyantong/src/main/webapp/WEB-INF/storage/images";
}

export const SCREENSHOTS_DIR_BASE = TMP_SCREENSHOTS_DIR_BASE;
export const PAGE_SIZE: [number, number] = [2256, 3024];
export const PROCESS_KEY = 'PROCESS_KEY';
