// 1. 初始化控制台
console.show();
console.clear();
setScreenMetrics(1080,2400)

// 全局变量：作为所有线程共享的“数据总线”
global.ocrData = {
    results: [],       // 原始的坐标等对象数组
    allText: "",       // 拼接好的纯文本
};
global.cp = {
    retry:   { x: 540,  y: 1340 },
    home:    { x: 1000,  y: 500 },
    map:     { x: 950,  y: 2200 }
};
global.money = 0;
global.ocr_time = 1000; // OCR 线程的视觉刷新率，单位毫秒
global.captureScreen = null; // 截图函数占位，确保在 OCR 线程中能访问到
global.startTime = Date.now();
// 2. 权限初始化
auto.waitFor(); // 强烈建议加上这句，确保无障碍开启能点下去
if (!images.requestScreenCapture()) {
    console.error("截图权限获取失败，脚本已停止");
    exit();
}

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
// 断网守护，
function startNetworkGuard() {
    while (true) {
        try {
            if (global.ocrData.allText.includes("网络") || global.ocrData.allText.includes("正在连接")) {
                ts_moneyget.sleep(3000);
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
function TextClick(Text,x=0,y=0) {
        var btn = null;     
        if (btn = global.ocrData.results.find(o => o.text.includes(Text))) {
        longClick(btn.bounds.centerX()+x, btn.bounds.centerY()+y);
        console.error("点击了: " + Text+" 坐标: " + btn.bounds);
        sleep(global.ocr_time + 1000);
        return true;
        }
        else return false;
}
function ts_moneyget() {
    var control = 1;
    var btn = null;

    while (1) {
        console.error("control:"+control);
        switch (control) {
            // 1: 荒屋
            case 1:
                TextClick("荒屋");
                TextClick("祖咒之轮");
                sleep(1000);
                TextClick("抵达要塞地下");
                if (TextClick("跳转")) control++;
                break;             
            case 2:
                longClick(cp.home.x,cp.home.y);
                longClick(cp.home.x,cp.home.y);
                if (global.ocrData.allText.includes("归还")) control++;
                break;
            case 3:
                TextClick("归还");
                if (global.ocrData.allText.includes("回到城镇")) TextClick("回到城镇");
                if (global.ocrData.allText.includes("AUTO")) control++;
                break;
            case 4:
                TextClick("骑士");
                sleep(3000);
                control++;
                break;
            case 5:
                sleep(2000);
                longClick(cp.map.x,cp.map.y);sleep(3000);                
                gestures([0,200,[device.width/4,device.height/2],[device.width/2,device.height/2]]);sleep(2000);
                if (global.ocrData.allText.includes("王")) control++;
                break;
            case 6:
                TextClick("王都",10,-20);
                TextClick("冒险者公会");
                if(TextClick("这就去")) control++;
                break;
            case 7:
                TextClick("市街");
                if (TextClick("这里是王都")) control++;
                break;
            case 8:
                sleep(2000);
                if (global.ocrData.allText.includes("留下")) control++;
                click(200, 1700);sleep(5000);if(TextClick("什么"))sleep(4000);
                click(530, 1700);sleep(5000);if(TextClick("什么"))sleep(4000);
                click(950, 1700);sleep(5000);if(TextClick("什么"))sleep(4000);
                if (global.ocrData.allText.includes("留下")) control++;
            case 9:
                TextClick("留下");
                TextClick("不赞成");
                TextClick("市街");
                TextClick("一同");
                if(TextClick("个大工程"))control++;
                break;
            case 10:
                global.money += 7000;
                control = 1;
                break;
            default:
                console.error("未知的操作类型: " + control);
                break;
        }
        sleep(1000);
    }

}
// 3. 启动所有独立线程
let ocr_thread = threads.start(ocr_thread);
let startNetworkGuard = threads.start(startNetworkGuard);
let ts_moneyget = threads.start(ts_moneyget);
// 维持主线程
setInterval(() => { }, 10000);
events.on("exit", () => {
    console.log("脚本已退出，最终收获//: " + global.money);
    console.log("运行时间：" + (new Date().now - global.startTime) / 1000 + "sec");
    //...
});