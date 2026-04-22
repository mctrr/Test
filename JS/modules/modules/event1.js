//提前打开AUTO和加速,刷取7000每3分钟
function events1(control = 0) {
    while (1) {
        switch (control) {
            // 1: 荒屋
            case 1:
                TextClick("荒屋");
                TextClick("祖咒之轮");
                sleep(3000);
                TextClick("抵达要塞地下");
                if (TextClick("跳转")) control++;
                break;
            case 2:
                if (TextClick("跳转")) control--;
                longClick(cp.home.x, cp.home.y); sleep(3000);
                longClick(cp.home.x, cp.home.y);
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
                sleep(3000);
                longClick(cp.map.x, cp.map.y); sleep(3000);
                gestures([0, 200, [device.width / 4, device.height / 2], [device.width / 2, device.height / 2]]); sleep(2000);
                if (global.ocrData.allText.includes("王")) control++;
                break;
            case 6:
                sleep(2000);
                TextClick("王都", 10, -20);
                TextClick("冒险者公会");
                if (TextClick("这就去")) control++;
                break;
            case 7:
                sleep(5000);
                TextClick("市街");
                if (TextClick("这里是王都")) control++;
                break;
            case 8:
                sleep(2000);
                if (!global.ocrData.allText.includes("中央")) {
                    control++;
                    break;
                } else {
                    click(200, 1700); sleep(6000); if (TextClick("什么")) sleep(3000);
                    click(530, 1700); sleep(6000); if (TextClick("什么")) sleep(3000);
                    click(950, 1700); sleep(6000); if (TextClick("什么")) sleep(3000);
                }
                break;
            case 9:
                TextClick("留下");
                TextClick("不赞成");
                TextClick("市街");
                TextClick("一同");
                if (TextClick("个大工程")) control++;
                break;
            case 10:
                global.money += 7000;
                log("完成一次，当前总收益: " + global.money);
                control = 1;
                break;
            default:
                console.error("未知的操作类型: " + control);
                break;
        }
        sleep(1000);
    }
}