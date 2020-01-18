let sessionTime = {
    name: 'work',
	minute: 25,
	second: 0,
	active: true
}

let breakTime = {
    name: 'break',
	minute: 5,
	second: 0,
	active: false
}

let currentMinute = sessionTime.minute;
let currentSecond = sessionTime.second;
let isPaused = true;
let id;

function checkActive() {
    clearInterval(id);
    currentMinute = sessionTime.minute;
    currentSecond = sessionTime.second;
	sessionTime.active === true ? switchTimer(breakTime, sessionTime) : switchTimer(sessionTime, breakTime);
}

function switchTimer(active, inactive) {
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
    timerDisplay.innerHTML = currentMinute + ":" + currentSecond;
}

function pause() {
    pauseButton.classList.toggle('inactive');
    playButton.classList.toggle('inactive');
    clearInterval(id);
    isPaused = true;
}

function play() {
    pauseButton.classList.remove('inactive');
    playButton.classList.add('inactive');
    stopButton.classList.remove('disabled');
    skipButton.classList.remove('disabled');
    console.log(this);
    isPaused === true ? id = setInterval(startTimer, 1000) : checkActive();
}

function stop() {
    clearInterval(id);
    pauseButton.classList.add('inactive');
    playButton.classList.remove('inactive');
    stopButton.classList.add('disabled');
    skipButton.classList.add('disabled');
    timerDisplay.innerHTML = sessionTime.minute + ":" + sessionTime.second;
    sessionTime.active = false;
}


const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop');
const skipButton = document.getElementById('skip');

playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pause);
skipButton.addEventListener('click', checkActive);
stopButton.addEventListener('click', stop);

const workUp = document.querySelector('.session .up');
const workDown = document.querySelector('.session .down');
const breakUp = document.querySelector('.break .up');
const breakDown = document.querySelector('.break .down');
const timeAdjusters = document.querySelectorAll('.times button');
timeAdjusters.forEach(button => button.addEventListener('click', adjustTime))


const workTimeDisplay = document.querySelector('.session h2');
const breakTimeDisplay = document.querySelector('.break h2');
const timerDisplay = document.querySelector('#time-left h1');
breakTimeDisplay.innerHTML = breakTime.minute;
workTimeDisplay.innerHTML = sessionTime.minute;
timerDisplay.innerHTML = currentMinute + ":" + currentSecond;



function adjustTime() {
    switch(this.dataset.parent + this.classList) {
        case 'breakup':
            breakTime.minute += 1;;
            break;
        case 'breakdown':
            if (breakTime.minute === 1) {
                break;
            }  else {
                breakTime.minute -= 1;
                break;
            }      
        case 'sessionup':
            sessionTime.minute += 1;
            break;
        case 'sessiondown':
            sessionTime.minute -= 1;
    }
    breakTimeDisplay.innerHTML = breakTime.minute;
    workTimeDisplay.innerHTML = sessionTime.minute; 
    sessionTime.minute <= 1 ? workDown.classList.add('disabled') : workDown.classList.remove('disabled');
    breakTime.minute <= 1 ? breakDown.classList.add('disabled') : breakDown.classList.remove('disabled');
    sessionTime.minute >= 60 ? workUp.classList.add('disabled') : workUp.classList.remove('disabled');
    breakTime.minute >= 60 ? breakUp.classList.add('disabled') : breakUp.classList.remove('disabled');

    timerDisplay.innerHTML = sessionTime.minute + ":" + sessionTime.second;
}

