let sessionTime = {
    minute: 0,
    second: 6
}

let breakTime = {
    minute: 0,
    second: 4
}

let Timers = [sessionTime, breakTime];


function startTimer(i) {
    let activeTimer = i;
    let minute = Timers[i].minute;
    let second = Timers[i].second;
        setInterval(function () {
                second -= 1;

                if (minute > 0 && second < 0) {
                    minute -= 1;
                    second = 59;
                }

                if (minute === 0 && second < 0) {
                    (activeTimer === 0) ? activeTimer = 1 : activeTimer = 0;
                    minute = Timers[activeTimer].minute;
                    second = Timers[activeTimer].second;
                }
                console.log(Timers[activeTimer])
                console.log(minute + ":" + second);   
        }, 1000);
    }
// startTimer(0);
