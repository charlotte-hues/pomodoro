let sessionTime = {
    name: 'work',
	minute: 0,
	second: 4,
	active: true
}

let breakTime = {
    name: 'break',
	minute: 0,
	second: 2,
	active: false
}

let currentMinute = sessionTime.minute;
let currentSecond = sessionTime.second;
let isPaused = false;
let id = setInterval(startTimer, 1000);

function checkActive() {
	clearInterval(id);
	sessionTime.active === true ? switchTimer(breakTime, sessionTime) : switchTimer(sessionTime, breakTime);
}

function switchTimer(active, inactive) {
    console.log(active.name);
	currentMinute = active.minute;
	currentSecond = active.second;
	active.active = true;
	inactive.active = false;
	id = setInterval(startTimer, 1000);
}

function startTimer() {
    console.log(currentMinute + ":" + currentSecond);
    if (currentMinute > 0 && currentSecond === 0) {
        currentMinute -= 1;
        currentSecond = 59;
    } else if (currentSecond > 0) { currentSecond -= 1; }
    else { checkActive(); }
}

function pause() {
    clearInterval(id);
    isPaused = true;
}

function play() {
    isPaused === true ? id = setInterval(startTimer, 1000) : checkActive();
}

function stop() {
    clearInterval(id);
    sessionTime.active = false;
}

