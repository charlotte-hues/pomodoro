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
let isPaused = true;
let id;

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
    isPaused = false;
    console.log(currentMinute + ":" + currentSecond);
    if (currentMinute > 0 && currentSecond === 0) {
        currentMinute -= 1;
        currentSecond = 59;
    } else if (currentSecond > 0) { currentSecond -= 1; }
    else { checkActive(); }
}

function pause() {
    pauseButton.classList.toggle('inactive');
    playButton.classList.toggle('inactive');
    clearInterval(id);
    isPaused = true;
}

function play() {
    pauseButton.classList.toggle('inactive');
    playButton.classList.toggle('inactive');
    console.log(this);
    isPaused === true ? id = setInterval(startTimer, 1000) : checkActive();
}

function stop() {
    clearInterval(id);
    sessionTime.active = false;
}


const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);

