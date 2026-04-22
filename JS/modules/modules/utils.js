function TextClick(Text,x=0,y=0) {
        var btn = null;     
        if (btn = global.ocrData.results.find(o => o.text.includes(Text))) {
        longClick(btn.bounds.centerX()+x, btn.bounds.centerY()+y);
        console.error("点击了: " + Text+" 坐标: " + btn.bounds);
        sleep(global.ocr_time);
        return true;
        }
        else return false;
}
function WaitFor(next) {
    return  global.ocrData.results.find(o => o.text.includes(next));
}

function press(position) {
        longClick(position.x,position.y);
        return true;
}