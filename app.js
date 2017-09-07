// =========
// VARIABLES
// =========

var userSymbol;

var whoGoesFirstKey = {
	1: 'User',
	2: 'Computer'
}

// ===================
// AUXILIARY FUNCTIONS
// ===================

// [min,max]
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ==============
// MAIN FUNCTIONS
// ==============

function doesUserGoFirst(){
	var random = getRandomInt(1,2);
	return whoGoesFirstKey[random] === 'User';
}

function displayModalAndSetUserSymbol(){
	$('.ui.basic.modal')
	  .modal({
	  	onApprove: function(){
	  		userSymbol = 'O';
	  		console.log('user is ' + userSymbol);
	  	},
	  	onDeny: function(){
	  		userSymbol = 'X';
	  		console.log('user is ' + userSymbol);
	  	},
        blurring: true,
	    inverted: true,
	  })
	  .modal('show')
	;
}

function clickBoxToMark(){
	$('td').text('');
	$('td').on('click', function(e){
		$(this).text(userSymbol);
		$(this).addClass(userSymbol);
	});
}


function updateFontColor(){
    var r = getRandomInt(0,200);
    var g = getRandomInt(0,200);
    var b = getRandomInt(0,200);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    $('h1').css('color', rgb);
    $('h2').css('color', rgb);
    $('h3').css('color', rgb);
    $('label').css('color', rgb);
    $('input').css('color', rgb);
    $('#paused').css('color', rgb);
    $('.ui.raised.segment').css('borderColor', rgb);
}

function init(){
	displayModalAndSetUserSymbol();
	clickBoxToMark();
}

init();

// randomly decide who goes first
// have modal that user can click to choose x or o

// make a way to represent the board so that you can figure out a way for the computer to pick the right option

// computer needs to know when game is over

// computer needs to know whether it lost, it won, or a draw

// computer needs to wait for user to act

// depending on user symbol, mark each clicked box with user's symbol

