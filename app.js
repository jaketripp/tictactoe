// =========
// VARIABLES
// =========

var userSymbol;
var computerSymbol;

var indicesOfXs = [];
var indicesOfOs = [];
var emptyIndices = [1,2,3,4,5,6,7,8,9];

var result = 'TIE!';

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
	var whoGoesFirstKey = {
		1: 'User',
		2: 'Computer'
	}
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

function allBlocksFilled(){
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
// removes index from emptyIndices
function updateArraysOfSymbols(symbol, index){

	var position = emptyIndices.indexOf(index);
	emptyIndices.splice(position, 1)

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
	console.log('empty spaces array');
	console.log(emptyIndices);

}


function sameSymbolInWinningCombo(){

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
			result = 'X wins';
			return true;
		}
		if (Ocount === 3){
			result = 'O wins';
			return true;
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

// returns true if all blocks filled or if the same symbol has been used in a winning combo
function isGameOver(){
	return allBlocksFilled() || sameSymbolInWinningCombo();
}

function displayGameOver(){
	if (isGameOver()){
		setTimeout(function(){
			alert(result);
		}, 300)
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

// have an array of currently vacant squares

// as i click boxes, append to an array

// computer needs to know whether it lost, it won, or a draw

// as you add xs and os to their respective arrays, remove the index from the total array
// use the total array for considering positions


// randomly decide who goes first
// but start with user going first
// then do computer going first
// then do random going first

// have an array in order of numbers by best move.
// iterate through it.
// if number is already used, go to the next one?

// have a bunch of if statements

// computer chooses a corner
// if I choose center ...
// if I choose edge ...
// if I choose corner ...

