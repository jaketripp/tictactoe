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
var movesRanked = [1,3,7,9,5,2,4,6,8];
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
			}        
		})
		.modal('show');
}

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




function computerMove(){
	var computerSpaces = computerSymbol === 'X' ? indicesOfXs : indicesOfOs;
	var userSpaces = userSymbol === 'O' ? indicesOfOs : indicesOfXs;

	// check if any move will be a win or prevent a loss
	for (var i = 0; i < emptyIndices.length; i++){


		// close but not working because it thinks that the user won even if the computer blocked it
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

	try {
		var combo = filteredWinningCombos[0];
		for (var i = 0; i < combo.length; i++){
			if (computerSpaces.indexOf(combo[i]) === -1){
				$('[data-num="' + combo[i] + '"]').addClass(computerSymbol);
				$('[data-num="' + combo[i] + '"]').text(computerSymbol);
				
				updateArraysOfSymbols(computerSymbol, combo[i]);

				displayGameOver();
				return;
			}
		}
	} catch(e){

		for (var i = 0; i < movesRanked.length; i++){
			if (emptyIndices.indexOf(movesRanked[i]) !== -1){
				$('[data-num="' + movesRanked[i] + '"]').addClass(computerSymbol);
				$('[data-num="' + movesRanked[i] + '"]').text(computerSymbol);
				
				updateArraysOfSymbols(computerSymbol, movesRanked[i]);

				displayGameOver();
				return;
			}
		}
	}

		
}

function sameSymbolInWinningCombo(){

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
			result = 'X wins!';
			return true;
		}
		if (Ocount === 3){
			result = 'O wins!';
			return true;
		}
	}
	return false;
}

// function minimax(emptySpaces, symbol){

// 	var score = 0;
// 	for (var i = 0; i < emptySpaces.length; i++){
// 		updateArraysOfSymbols(symbol, emptySpaces[i]);
// 		if (isGameOver() && result === (symbol + ' wins!'){
// 			score += 10;
// 		}
// 	}

// }

// function score(){
// 	if (isGameOver()){
// 		if (result === (computerSymbol + ' wins!'){
// 			return 10;
// 		} else {
// 			return -10;
// 		}
// 	} else {
// 		return 0;
// 	}
// }

// trying to get computer to win
// go through the empty places on the board
// pick one, is game over and computer won?
// score += 10
// did user win?
// score -= 10

// if game not over, 
	// score += minimax(board.slice(), symbol)

// function fillField(input, player) {

//     player = player === "X" ? "O" : "X";
//     var score = 0;
//     input = emptyIndices.slice();

//     for (var i = 0; i < 9; i++) {
//       if (input.indexOf(i) !== -1) {
//           input[i] = player;
//           if (checkWin(player, input) && player == "X") {
//               score -= 10;
//               continue;
//             }
//           if (checkWin(player, input) && player == "O") {
//               score += 10;
//               continue;
//             }
//           if (player == "X") {
//                 score += fillField(input.slice(0,9),"X");
//             } else {
//                 score += fillField(input.slice(0,9),"O");
//             }
//           input[i] = 0;
//       }
//     }
//     return score;
// }

function isGameOver(){
	return  sameSymbolInWinningCombo() || allBlocksFilled();
}

function displayGameOver(){
	if (isGameOver()){
		resultModal();
		$('#result').modal('show');
	}
}

// just to speed up dev process
function tempToggleSymbol(){
	$('#toggle').on('click', function(){
		if (userSymbol === 'X'){
			userSymbol = 'O';
		} else {
			userSymbol = 'X'
		}
	});
}

function init(){
	tempToggleSymbol()
	setUserSymbol();
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

// have a bunch of if statements

// computer chooses a corner
// if I choose center ...
// if I choose edge ...
// if I choose corner ...




// have an array in order of numbers by best move.
// iterate through it.
// if number is already used, go to the next one?

// make it so that the first modal can't be closed

// why is the second modal janky only the first time?

// first make a function that picks a random tile from the remaining empty tiles and marks it properly

// then the last thing to do is implement the strategy so the computer tries to win



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




















