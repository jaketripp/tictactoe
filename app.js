// =========
// VARIABLES
// =========

var userSymbol;

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

function modal(){
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

modal();

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
	
}

init();

// 
