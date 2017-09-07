// =========
// VARIABLES
// =========

var userSymbol;
var computerSymbol;

var indicesOfXs = [];
var indicesOfOs = [];

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
	  		computerSymbol = 'X';
	  	},
	  	onDeny: function(){
	  		userSymbol = 'X';
	  		computerSymbol = 'O';
	  	},
        blurring: true,
	    inverted: true,
	  })
	  .modal('show')
	;
}

function clickBoxToMark(){
	$('td').on('click', function(e){
		$(this).text(userSymbol);
		$(this).addClass(userSymbol);

		// 'X' or 'O'
		var symbol = e.target.innerText;
		// index of block (1-9)
		var index = parseInt(e.target.dataset.num);
		updateArraysOfSymbols(symbol, index);

		displayGameOver();
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

function checkIfAllBlocksFilled(){
	for (var i = 1; i <= 9; i++){
		if ($('[data-num="' + i + '"]').text() === ''){
			return false;
		}
	}
	return true;
}

// takes in a number and a symbol
// if symbol is 'X', appends number to indicesOfXs
// else if symbol is 'O', appends number to indicesOfOs
function updateArraysOfSymbols(symbol, index){
	if (symbol === 'X') {
		indicesOfXs.push(index);
	}
	if (symbol === 'O') {
		indicesOfOs.push(index);
	}

	console.log('x array');
	console.log(indicesOfXs);
	console.log('o array');
	console.log(indicesOfOs);

}


function sameSymbolInWinningCombo(symbol){

	var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

	for (var i = 0; i < winningCombos.length; i++){
		
		var Xcount = 0;
		var Ocount = 0;

		for (var j = 0; j < winningCombos[i].length; j++){
			// if the other two symbols in the array are the same, return true
			if (indicesOfXs.indexOf(winningCombos[i][j]) !== -1){
				Xcount++;
			}
			if (indicesOfOs.indexOf(winningCombos[i][j]) !== -1){
				Ocount++;
			}
		}

		if (Xcount === 3){
			// make a function here that takes in 'X' and makes another modal
			alert('x wins');
		}
		if (Ocount === 3){
			// use it again here
			alert('o wins');
		}
	}
	return false;
}

// takes in index, returns block type (edge, corner, or corner)

// utilize that function to make the if statements more concise

// if move() === 'edge' ... etc

function indexToBlockType(index){
	if (index % 2 === 0) {
		return 'edge';
	} else if (index === 5) {
		return 'center';
	} else {
		return 'corner';
	}
}



function isGameOver(){

	checkIfAllBlocksFilled();
	
	sameSymbolInWinningCombo();
	
}

function displayGameOver(){
	if (isGameOver()){
		console.log('gameover')
	}
}

function init(){
	displayModalAndSetUserSymbol();
	clickBoxToMark();
}

init();

// have modal that user can click to choose x or o
// make a way to represent the board so that you can figure out a way for the computer to pick the right option (numbered ids)
// depending on user symbol, mark each clicked box with user's symbol

// computer needs to know when game is over

// function checkIfGameOver()
// check for if any of these number combinations are the same symbol
// [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
// check if all the boxes are filled

// as i click boxes, append to an array, userArray
// have a computerArray too?

// randomly decide who goes first
// but start with user going first
// then do computer going first
// then do random going first


// computer needs to know whether it lost, it won, or a draw





// have an array in order of numbers by best move.
// iterate through it.
// if number is already used, go to the next one?

// have a bunch of if statements

// computer chooses a corner
// if I choose center ...
// if I choose edge ...
// if I choose corner ...

// have a function that makes sure to only consider vacant squares