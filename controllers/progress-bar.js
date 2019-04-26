function barChange(){
    let total = player.duration;
    let current = player.currentTime;
    let percent = total / current;
    postMessage(percent);
    return setTimeout(barChange(),1000)
}
barChange();