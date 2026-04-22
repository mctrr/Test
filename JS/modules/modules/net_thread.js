function startNetworkGuard() {
    while (true) {
        try {
            if (global.ocrData.allText.includes("网络") || global.ocrData.allText.includes("正在连接")) {
                console.warn("发现网络异常");
                if (global.ocrData.results.find(o =>
                    (o.text.includes("重试") || o.text.includes("确认"))
                    &&o.bounds.top > device.height / 4)) {   
                    longClick(cp.retry.x,cp.retry.y);
                    sleep(2000);
                }
            }
        } catch (e) {
            console.error("网络守护报错: " + e.message);
        }
        sleep(1000);
    }
}