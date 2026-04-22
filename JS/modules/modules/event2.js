// 半自动刷悬赏
import {
     TextClick, Waitfor, press, gestures, sleep, device, icon_home, icon_map, icon_target }
    from './utils.js';

const steps = [
    { action: () => TextClick("荒屋"), wait: "祖咒之轮" },
    { action: () => TextClick("祖咒之轮"), wait: "小哈" },
    { action: () => { TextClick("小哈"); TextClick("跳转"); }, wait: "正在" },
    { action: () => press(icon_home), wait: "归还" },
    { action: () => TextClick("归还"), wait: "回到" },
    { action: () => TextClick("回到"), wait: "公会" },
    { action: () => press(icon_map), wait: "关闭" },
    { action: () => { 
        gestures([0, 200, [device.width / 4, device.height / 2], [device.width / 2, device.height / 2]]);
        sleep(2000);
    }, wait: "王" },
    { action: () => TextClick("王", 10, -20), wait: "公会" },
    { action: () => TextClick("公会"), wait: "委托" },
    { action: () => TextClick("委托"), wait: "悬赏令" },
    { action: () => TextClick("悬赏令"), wait: "确认" },
    { action: () => TextClick("返回"), wait: "离开" },
    { action: () => TextClick("离开"), wait: "郊外" },
    { action: () => TextClick("郊外"), wait: "回到" },
    { action: () => { TextClick("初始的"); TextClick("B2F"); }, wait: "郊外", waitType: "notWait" },
    { action: () => press(icon_target), wait: "NEXT" },
    { action: () => {}, wait: "成功"},
    { action: () => press(icon_home), wait: "归还" },
    { action: () => TextClick("回到"), wait: "公会" },
    { action: () => TextClick("公会"), wait: "委托" },
    { action: () => TextClick("委托"), wait: "悬赏令" },
    { action: () => TextClick("悬赏令"), wait: "确认" },
    { action: () => TextClick("完成报告"), wait: "关闭" },
    { action: () => TextClick("关闭"), wait: "确认" },
    { action: () => TextClick("返回"), wait: "离开" },
    { action: () => TextClick("离开"), wait: "荒屋" }
];

// 主执行函数 - 修复版
async function event2(startStep = 0) {
    console.log(`开始执行悬赏任务，总步骤数：${steps.length}`);

        for (let i = startStep; i < steps.length;) {
            step = steps[i];
            step.action();
            if(Waitfor(step.wait))i++;
            sleep(1000)
        }

    console.log("悬赏任务完成！");
}

// 保持原有接口
export default event2;
