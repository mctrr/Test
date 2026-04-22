function ocr_thread() {
    
    while (true) {
        try {
            global.captureScreen = images.captureScreen();
            if (!global.captureScreen) {
                // 如果截图返回 null，通常是权限暂时没准备好
                sleep(2000);
                continue;
            }
            let results = ocr.detect(global.captureScreen);
            if (results) {
                global.ocrData.results = results;
                global.ocrData.allText = results.map(o => o.text).join("");
                // console.error(global.ocrData.allText);           
            }
        } catch (error) {
            console.error(error);
        }
        sleep(global.ocr_time);
    }
}