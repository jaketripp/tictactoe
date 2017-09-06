// =========
// VARIABLES
// =========

var lengthOfPomodoro = 25;
var lengthOfBreak = 5;
var millisecondsPom = 1000 * 60 * lengthOfPomodoro;
var timerCount = 1;

var arr = $('h2').text();
arr = arr.split(':');
var minutes = parseInt(arr[0]);
var seconds = parseInt(arr[1]);

var killInterval;
var isTimerRunning = true;


// ===================
// AUXILIARY FUNCTIONS
// ===================

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

// [min,max]
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ==============
// MAIN FUNCTIONS
// ==============

function decreaseTimer(){
	killInterval = setInterval(function(){
		isTimerRunning = true;
		if (seconds === 0 && minutes === 0){
			timerCount++;
			handleBreakOrTimer();
		}
		if (seconds === 0 && minutes !== 0){
			minutes--;
			updateFontColor();
			seconds = 60;
		}
		seconds--;

		var str = minTwoDigits(minutes) + ':' + minTwoDigits(seconds);
		$('h2').text(str);
	}, 1000)
}


// if even
	// BREAKTIME 
// else {
	// TIMERTIME
function isTimeForBreak(){
	return (timerCount % 2 === 0);
}

function handleBreakOrTimer(){
	if (isTimeForBreak()){
		if (minutes === 0 && seconds === 0){
			$('#timeForBreak')[0].play();
		}
		minutes = lengthOfBreak;
		$('h3').text('BREAK TIME');
	} else {
		if (minutes === 0 && seconds === 0){
			$('#timeForWork')[0].play();
		}
		minutes = lengthOfPomodoro;
		$('h3').text('WORK TIME');
	}
	seconds = 0;
}

function showModal(){
	$('.ui.modal')
	  .modal({
        onHidden: function(){
        	setTimeout(function(){
        		decreaseTimer();
        	}, 0);
        },
        blurring: true,
	    inverted: true,
	  })
	  .modal('show')
	;
}

function bindEvents(){
	$('.ui.raised.segment').on('click', function(){
		if (isTimerRunning){
			clearInterval(killInterval);
			isTimerRunning = false;
			showModal();
		} else {
			decreaseTimer();
		}
	});

	$('input').on('change', function(e){
		// lengthOfPomodoro = $(this).val();
		if ($(this).attr('name') === 'work'){
			lengthOfPomodoro = $(this).val();
			onUpdateTimes();
		}
		if ($(this).attr('name') === 'break'){
			lengthOfBreak = $(this).val();
			onUpdateTimes();			
		}
	});
}

function onUpdateTimes(){
	clearInterval(killInterval);
	killInterval++;
	handleBreakOrTimer();
	decreaseTimer();
}

function updateFontColor(){
    var r = getRandomInt(0,200);
    var g = getRandomInt(0,200);
    var b = getRandomInt(0,200);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    $('h1').css('color', rgb);
    $('h2').css('color', rgb);
    $('h3').css('color', rgb);
    $('.ui.raised.segment').css('borderColor', rgb);
}

function init(){
	handleBreakOrTimer();
	updateFontColor();
	decreaseTimer();
	bindEvents();
}

init();



// User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.

// User Story: I can reset the clock for my next pomodoro.
// on click, have the 25 minute timer start
// have an animation so visually you can tell that the clock is going (and when the break is going)
// have it be able to pause the timer or break on click
// change to a random color (steal from as of today) every such period of time
// every minute? every 10 seconds? every 5 seconds?

// change the time from 25 minutes to whatever
// use a global variable to store it
// use an input type number to change it
// have event onChange to update the variable

// User Story: I can customize the length of each pomodoro.
// have a thing pop up and blur the background so you know that it's paused



// after the timer goes to zero, play a sound, start the 5 break



