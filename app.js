// =========
// VARIABLES
// =========

var lengthOfPomodoro = 25;
var lengthOfBreak = 5;
var millisecondsPom = 1000 * 60 * lengthOfPomodoro;
var timerCount = 2;

var arr = $('h2').text();
arr = arr.split(':');
var minutes = parseInt(arr[0]);
var seconds = parseInt(arr[1]);

var killInterval;
var timerRunning = true;


// ===================
// AUXILIARY FUNCTIONS
// ===================

function pluralize(count, word) {
    return count === 1 ? count + ' ' + word : count + ' ' + word + 's';
}

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

// converts hours to simplified time (1 year, 3 months, 2 weeks, 1 day, 9 hours) and appends string
function formatTime(seconds) {
    var value = seconds;

    var units = {
        "year": 24*365*60*60,
        "month": 24*30*60*60,
        "week": 24*7*60*60,
        "day": 24*60*60,
        "hour": 60*60,
        "minute": 60,
        "second": 1
    }

    var result = [];

    for(var name in units) {
        var p =  Math.floor(value/units[name]);
        if (p > 0) {
            result.push(p);
        }
        value %= units[name];
    }

    var str = result[0];

    for (var i = 1; i < result.length; i++) {
        str += (':' + result[i]);
    }

    return str;
}

// [min,max]
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

// ==============
// MAIN FUNCTIONS
// ==============

function decreaseTimer(){
	killInterval = setInterval(function(){
		timerRunning = true;
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
		console.log('time for break')
		minutes = lengthOfBreak;
		$('h3').text('BREAK TIME');
	} else {
		console.log('time for work')
		minutes = lengthOfPomodoro;
		$('h3').text('WORK TIME');
	}
	seconds = 0;
}

function bindEvents(){
	$('.ui.raised.segment').on('click', function(){
		if (timerRunning){
			clearInterval(killInterval);
			timerRunning = false;
		} else {
			decreaseTimer();
		}
	})
}

function updateDOM(){
	decreaseTimer();
}

function init(){
	updateDOM();
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




// User Story: I can customize the length of each pomodoro.

// after the timer goes to zero, play a sound, start the 5 break

// change the time from 25 minutes to whatever
// use a global variable to store it
// use an input type number to change it
// have event onChange to update the variable


