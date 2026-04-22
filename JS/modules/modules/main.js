console.show();
console.clear();
setScreenMetrics(1080,2400)

auto.waitFor();
if (!images.requestScreenCapture()) {
    console.error("截图权限获取失败，脚本已停止");
    exit();
}
let ocr_thread = threads.start(ocr_thread);
let startNetworkGuard = threads.start(startNetworkGuard);
let ts_moneyget = threads.start(ts_moneyget);
// 维持主线程
setInterval(() => { }, 10000);
events.on("exit", () => {
    console.log("运行时间：" + (new Date().now - global.startTime) / 1000 + "sec");
    //...
});