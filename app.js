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
	// $('td').text('');
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

// have modal that user can click to choose x or o
// make a way to represent the board so that you can figure out a way for the computer to pick the right option (numbered ids)
// depending on user symbol, mark each clicked box with user's symbol


// randomly decide who goes first
// but start with user going first
// then do computer going first
// then do random going first

// computer needs to know when game is over

// computer needs to know whether it lost, it won, or a draw

// function checkIfGameOver()
// check for if any of these number combinations are the same symbol
// [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
// check if all the boxes are filled

// as i click boxes, append to an array, userArray
// have a computerArray too?

// have an array in order of numbers by best move.
// iterate through it.
// if number is already used, go to the next one?

// have a bunch of if statements

// computer chooses a corner
// if I choose center ...
// if I choose edge ...
// if I choose corner ...

// have a function that makes sure to only consider vacant squares

// have an obj
// ehh maybe not
// var numberNameObj = {
// 	center: [5],
// 	edge: [2,4,6,8],
// 	corner: [1,3,7,9]
// }

// have a function that takes in a number and returns what type of square it is
// center, edge, or corner

// utilize that function to make the if statements more concise

// if move() === 'edge' ... etc



// center is 5
// edge is even
// corner is odd and not 5

