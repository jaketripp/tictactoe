// =========
// VARIABLES
// =========

var userSymbol;
var computerSymbol;

var indicesOfXs = [];
var indicesOfOs = [];
var emptyIndices = [1,2,3,4,5,6,7,8,9];

var winningCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var filteredWinningCombos;

// corners, center, then edges
var movesRanked = [1,3,7,9,5,2,4,6,8];
var result = 'TIE!';

// ===================
// AUXILIARY FUNCTIONS
// ===================

// [min,max] exclusive
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==============
// MAIN FUNCTIONS
// ==============

// returns boolean of whether user goes first
function doesUserGoFirst(){
	var whoGoesFirstKey = {
		1: 'User',
		2: 'Computer'
	}
	var random = getRandomInt(1,2);
	return whoGoesFirstKey[random] === 'User';
}

// modal to set userSymbol and computerSymbol
function setUserSymbol(){
	$('#setSymbol')
		.modal({
			closable: false,
			blurring: true,
			inverted: true,
			onApprove: function(){
				userSymbol = 'O';
				computerSymbol = 'X';
			},
			onDeny: function(){
				userSymbol = 'X';
				computerSymbol = 'O';
			},
			onHide: function(){
				if (!doesUserGoFirst()){
					computerMove();
				}
			}      
		})
		.modal('show');
}

// modal for game results
function resultModal(){
	$('#result .header').text(result);
	$('#result')
		.modal({
			inverted: true,
			blurring: true,
			onHidden: function(){
				reset();
				setUserSymbol();
			}		
		})
	.modal('show')
}

function reset(){
	indicesOfXs = [];
	indicesOfOs = [];
	emptyIndices = [1,2,3,4,5,6,7,8,9];
	result = 'TIE!';
	$('td').text('');
	$('td').removeClass();
}

function clickBoxToMark(){
	$('td').on('click', function(e){
		if ($(this).text() === ''){
			$(this).text(userSymbol);
			$(this).addClass(userSymbol);

			// 'X' or 'O'
			var symbol = e.target.innerText;
			// index of block (1-9)
			var index = parseInt(e.target.dataset.num);
			updateArraysOfSymbols(symbol, index);

			displayGameOver();
			
			if (!isGameOver()){
				setTimeout(function(){
					computerMove();
					displayGameOver();
				}, 500);
			}

		}
	});
}

function updateArraysOfSymbols(symbol, index){

	var position = emptyIndices.indexOf(index);
	emptyIndices.splice(position, 1)

	if (symbol === 'X') {
		indicesOfXs.push(index);
	}
	if (symbol === 'O') {
		indicesOfOs.push(index);
	}
}

// AI FUNCTIONS

// returns possible winning combinations
function filterWinningCombos(){

	// find all possible win combinations where computer has 2 of 3 (even if user occupies the other 1)
	filteredWinningCombos = winningCombos.filter(function(combo){
		var count = 0;
		for (var i = 0; i < combo.length; i++){
			if (computerSpaces.indexOf(combo[i]) !== -1) {
				count++;
			}
		}
		return count === 2;
	});

	// remove combos where user has occupied one 
	filteredWinningCombos = filteredWinningCombos.filter(function(combo){
		for (var i = 0; i < combo.length; i++){
			if (userSpaces.indexOf(combo[i]) !== -1){
				return false;
			}
		}
		return true;
	});

	return filteredWinningCombos[0];
}

function computerMove(){
	var computerSpaces = computerSymbol === 'X' ? indicesOfXs : indicesOfOs;
	var userSpaces = userSymbol === 'O' ? indicesOfOs : indicesOfXs;

	// check if any move will be a win or prevent a loss
	for (var i = 0; i < emptyIndices.length; i++){

		var index = emptyIndices[i];

		computerSpaces.push(index);
		if (isGameOver()){
			computerSpaces.pop();
			$('[data-num="' + index + '"]').addClass(computerSymbol);
			$('[data-num="' + index + '"]').text(computerSymbol);
			updateArraysOfSymbols(computerSymbol, index);
			return;
		}
		computerSpaces.pop();

		userSpaces.push(index);
		if (isGameOver()){
			userSpaces.pop();
			$('[data-num="' + index + '"]').addClass(computerSymbol);
			$('[data-num="' + index + '"]').text(computerSymbol);
			updateArraysOfSymbols(computerSymbol, index);
			return;
		}
		userSpaces.pop();

	}

	try {
		var combo = filterWinningCombos();

		for (var i = 0; i < combo.length; i++){
			if (computerSpaces.indexOf(combo[i]) === -1){
				handlePickedMove(combo, i);
				return;
			}
		}
	} catch(e){

		for (var i = 0; i < movesRanked.length; i++){
			if (emptyIndices.indexOf(movesRanked[i]) !== -1){
				handlePickedMove(movesRanked, i);
				return;
			}
		}
	}		
}

function handlePickedMove(moves, i){
	$('[data-num="' + moves[i] + '"]').addClass(computerSymbol);
	$('[data-num="' + moves[i] + '"]').text(computerSymbol);
	
	updateArraysOfSymbols(computerSymbol, moves[i]);
	displayGameOver();
}

// GAME OVER FUNCTIONS

function checkBothSidesForWinningCombo(){
	sameSymbolInWinningCombo(indicesOfXs, 'X');
	sameSymbolInWinningCombo(indicesOfOs, 'O');

	return sameSymbolInWinningCombo(indicesOfXs, 'X') || sameSymbolInWinningCombo(indicesOfOs, 'O');
}

function sameSymbolInWinningCombo(pastMoves, symbol){

	var filteredWinningCombos = winningCombos.filter(function(combo){
		var count = 0;
		for (var i = 0; i < combo.length; i++){
			if (pastMoves.indexOf(combo[i]) !== -1){
				count++;
			}
		}

		if (count === 3){
			result = symbol + ' wins!';
			return true;
		}
	})
	// at least one winning combo on one side
	return filteredWinningCombos.length > 0;
}

// checks if all blocks filled
function allBlocksFilled(){
	for (var i = 1; i <= 9; i++){
		if ($('[data-num="' + i + '"]').text() === ''){
			return false;
		}
	}
	return true;
}

function isGameOver(){
	return  checkBothSidesForWinningCombo() || allBlocksFilled();
}

function displayGameOver(){
	if (isGameOver()){
		resultModal();
		$('#result').modal('show');
	}
}


function init(){
	setUserSymbol();
	clickBoxToMark();
}

init();


// why is the second modal janky only the first time?

// fix it so that it says tie when you tie

// refactor


// minimax algorithm
// weights a win for you as 10
// weights a win for your opponent as -10
// weights each level of the tree as the number (level 1 is 1, level 2 is 2)

// 10 - depth
// you winning on level 2 is weighted 10 - 2 = 8
// winning on level 1 is better, so weighted at 10 - 1 = 9

// depth - 10
// opponent winning on level 2 is weighted -10 + 2 = -8
// opponent winning on level 1 is better, so weighted at -10 + 1 = -9


// 0 for tie

// a way to make your AI slightly beatable is cut down the number of levels it can look (you're going to be using a for loop i think)
// so instead of being able to look all the way and see all the possibilities, only see like 2 levels


// keep a list of possible moves (emptyIndices)
// for each, append to an object (index: score)
// check if any of them end the game with you (the computer) winning, if they do them give them 10-depth score
// pick that move, if not, run minimax again


// check each move, if game is over, return the score (win, tie, or loss)
// if game is not over, recursively check again, keep diving deeper until game is over

// alpha beta algorithm is you go 2 levels deep, see what the value that bubbles up is
// if the next branch is less than the bubbled up value, skip (return?)

// max first
// min		
// 		   /\
//    <= 2    <= 1	
// 	   /\      /\
//    2  7    1  8




















