let countdown;
const timerDisplay = document.getElementById('countdown');
const startButton = document.getElementById('start');
const workText = document.getElementById('work');
const breakText = document.getElementById('break');
const stopButton = document.getElementById('stop');
const breakSound = new Audio('alarm.mp3');

let clickCount = 0;
let timerRunning = false;

const workTime = 25; //25
const breakTime = 5; //5
const totalTime = (workTime + breakTime)*60; //(workTime + breakTime)*60

//just a test function
function test() {
	console.log(timerRunning);
}

function timer(seconds) {
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);

	countdown = setInterval(() => {
		timerRunning = true;
		const secondsLeft = Math.round((then - Date.now()) / 1000);

	 	if (secondsLeft < 0) {
			timerRunning = false;
			clearInterval(countdown);
			document.title = "Session Ended";
			alert("Session has ended ! Press RESET for another one.");
			return;
		} else if (secondsLeft <= breakTime) {
			breakSound.play();
			switchClass(workText, breakText, "inactive");
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}	

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

	document.title = display;
	timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
	clickCount = 0;
	timerDisplay.classList.add("countdown");
	timerDisplay.classList.remove("init");
	switchClass(breakText, workText, "inactive");
	startButton.textContent = "reset";
	stopButton.textContent = "stop";
	showStatus();
	
	timer(totalTime);	
});

stopButton.addEventListener('click', () => {
	clickCount = clickCount + 1;
	
	if (clickCount % 2 != 0) {
		timerRunning = false;
		clearInterval(countdown);
		stopButton.textContent = "continue";
	} else {
		if (getTime(timerDisplay.textContent) == 0) {
			return;
		} else {
			stopButton.textContent = "stop";
			timer(getTime(timerDisplay.textContent));
		}
	}	
});


function getTime(text) {
	//0 - minutes, 1 - seconds
	let timeUnits = text.toString().split(":");

	for(let i = 0; i < timeUnits.length; i++) {
		timeUnits[i] = Number(timeUnits[i]);
	}

	const timeInSeconds = timeUnits[0] * 60 + timeUnits[1];
	return timeInSeconds;
}

function hideStatus() {
	workText.style.display = 'none';
	breakText.style.display = 'none';
}

function showStatus() {
	workText.style.display = 'flex';
	breakText.style.display = 'flex';
}
//adds a class to element1 and removes it to the second
//switchClass(workText, breakText, "inactive"); <- code to switch between work and break
function switchClass(element1, element2, className) {
	element1.classList.add(className);
	element2.classList.remove(className);
}