
var board = new Array(20);
for(var i = 0; i < 20; ++i) {
	board[i] = new Array(20);
	for(var c = 0; c < 20; ++c) {
		board[i][c] = -1;
	}
}

var choicelist = new Array(20);
for(var i = 0; i < 20; ++i) {
	choicelist[i] = new Array(20);
	for(var c = 0; c < 20; ++c) {
		choicelist[i][c] = 0;
	}
}

var winCall = new Array(20);
for(var i = 0; i < 20; ++i) {
	winCall[i] = new Array(20);
	for(var c = 0; c < 20; ++c) {
		winCall[i][c] = 0;
	}
}



var highlight = [];
var turns = 0;

function inArray(buffer, check) {
	for(var i = 0; i < buffer.length; ++i) {
		if((buffer[i][0] == check[0]) && (buffer[i][1] == check[1])) {
			return true;
		}
	}
	return false;
}

function newBoard() {
	var clonedArray = JSON.parse(JSON.stringify(board))
	return clonedArray;
}

function renew(x, y, choice) {
	highlight.push([x,y,choice]);
	var changer = "#" + x.toString() + "_" + y.toString();
	$(changer).css('backgroundColor', 'grey');
	if(highlight.length > 1) {
	var recolor = highlight.shift();
	changer = "#" + recolor[0].toString() + "_" + recolor[1].toString();
	if(recolor[2]) {
		$(changer).css('backgroundColor', 'white');
	} else {
		$(changer).css('backgroundColor', 'black');
	}
	}
}

var area = [[-2,-2],[-2,-1],[-2,0], [-2, 1], [-2, 2], [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2]
	,[0, -2], [0, -1], [0, 1], [0, 2], [1, -2], [1, -1], [1, 0], [1, 1], [1, 2], [2, -2],
	[2, -1], [2, 0], [2, 1], [2, 2]];

var wincheck = [[[[-4, -4], [-3, -3], [-2, -2], [-1, -1], [0, 0]],
 [[-3, -3], [-2, -2], [-1, -1], [0, 0], [1, 1]],
  [[-2, -2], [-1, -1], [0, 0], [1, 1], [2, 2]],
  [[-1, -1], [0, 0], [1, 1], [2, 2], [3, 3]],
  [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]],
  [[[-4, 4], [-3, 3], [-2, 2], [-1, 1], [0, 0]],
  [[-3, 3], [-2, 2], [-1, 1], [0, 0], [1, -1]],
  [[-2, 2], [-1, 1], [0, 0], [1, -1], [2, -2]],
  [[-1, 1], [0, 0], [1, -1], [2, -2], [3, -3]],
  [[0, 0], [1, -1], [2, -2], [3, -3], [4, -4]]],
	[[[4, 0], [3, 0], [2, 0], [1, 0], [0, 0]],
	[[3, 0], [2, 0], [1, 0], [0, 0], [-1, 0]],
	[[2, 0], [1, 0], [0, 0], [-1, 0], [-2, 0]],
	[[1, 0], [0, 0], [-1, 0], [-2, 0], [-3, 0]],
	[[0, 0], [-1, 0], [-2, 0], [-3, 0], [-4, 0]]],
	[[[0, 4], [0, 3], [0, 2], [0, 1], [0, 0]],
	[[0, 3], [0, 2], [0, 1], [0, 0], [0, -1]],
	[[0, 2], [0, 1], [0, 0], [0, -1], [0, -2]],
	[[0, 1], [0, 0], [0, -1], [0, -2], [0, -3]],
	[[0, 0], [0, -1], [0, -2], [0, -3], [0, -4]]]];

var fourcheck = [[[[-3, -3], [-2, -2], [-1, -1], [0, 0]],
 [[-2, -2], [-1, -1], [0, 0], [1, 1]],
  [[-1, -1], [0, 0], [1, 1], [2, 2]],
  [[0, 0], [1, 1], [2, 2], [3, 3]]],
  [[[-3, 3], [-2, 2], [-1, 1], [0, 0]],
  [[-2, 2], [-1, 1], [0, 0], [1, -1]],
  [[-1, 1], [0, 0], [1, -1], [2, -2]],
  [[0, 0], [1, -1], [2, -2], [3, -3]]],
	[[[3, 0], [2, 0], [1, 0], [0, 0]],
	[[2, 0], [1, 0], [0, 0], [-1, 0]],
	[[1, 0], [0, 0], [-1, 0], [-2, 0]],
	[[0, 0], [-1, 0], [-2, 0], [-3, 0]]
	],
	[[[0, 3], [0, 2], [0, 1], [0, 0]],
	[[0, 2], [0, 1], [0, 0], [0, -1]],
	[[0, 1], [0, 0], [0, -1], [0, -2]],
	[[0, 0], [0, -1], [0, -2], [0, -3]]
]];

var threecheck = [[[[-2, -2], [-1, -1], [0, 0]],
 [[-1, -1], [0, 0], [1, 1]],
  [[0, 0], [1, 1], [2, 2]] ],
  [[[-2, 2], [-1, 1], [0, 0]],
  [[-1, 1], [0, 0], [1, -1]],
  [[0, 0], [1, -1], [2, -2]]],
	[[[2, 0], [1, 0], [0, 0]],
	[[1, 0], [0, 0], [-1, 0]],
	[[0, 0], [-1, 0], [-2, 0]]
	],
	[[ [0, 2], [0, 1], [0, 0]],
	[[0, 1], [0, 0], [0, -1]],
	[[0, 0], [0, -1], [0, -2]]
]];

var twocheck = [[[[-1, -1], [0, 0]],
 	[[0, 0], [1, 1]]],
  [[[-1, 1], [0, 0]],
  [[0, 0], [1, -1]]],
	[[[1, 0], [0, 0]],
	[[0, 0], [-1, 0]]
	],
	[[[0, 1], [0, 0]],
	[[0, 0], [0, -1]]
]];

var gameover = false;

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function isHoled(buffer) {
	var holeCount = 0;
	var holes = [];
	var len = 0;
	var max = -1;
	var comp = board[buffer[0][0]][buffer[0][1]];
	for(var i = 1; i < buffer.length; ++i) {
		var x = buffer[i][0];
		var y = buffer[i][1];
		if(i == (buffer.length - 1)) {
			if(board[x][y] != comp) {
				return false;
			}
		}
		if(board[x][y] == -1) {
			len = 0;
			holes.push([x,y]);
			holeCount++;
			if(holeCount > 1) {
				return false;
			}
		} else {
			len++;
			if(board[x][y] == !board[buffer[0][0]][buffer[0][1]]) {
				return false;
			}
		}
		if(max < len) {
			max = len;
		}
	}
	if(holeCount == 1) {
		if(max == (buffer.length - 2)) {
			return false;
		}
		for(var i = 0; i < holes.length; ++i) {
		}
		return true;
	} else {
		return false;
	}
}

function inBoard(x, y) {
	return (x >= 0) && (y >= 0) && (x < 20) && (y < 20);
}

//ignorable space? for win or three check for now
function ignorable(board, x, y, checkx, checky) {
	if(inBoard(x,y)) {
		if(board[x][y] != board[checkx][checky]) {
			return true;
		}
	} else {
		return true;
	}
	return false;
}


function didWin(board, x, y) {
	var called = 0;
	var winningmove = false;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 5; ++c) {
			var newx1 = x + wincheck[i][c][4][0] + (wincheck[i][c][4][0] - wincheck[i][c][3][0]);
			var newy1 = y + wincheck[i][c][4][1] + (wincheck[i][c][4][1] - wincheck[i][c][3][1]);
			var newx2 = x + wincheck[i][c][0][0] - (wincheck[i][c][1][0] - wincheck[i][c][0][0]);
			var newy2 = y + wincheck[i][c][0][1] - (wincheck[i][c][1][1] - wincheck[i][c][0][1]);
			if(inBoard(x + wincheck[i][c][0][0], y + wincheck[i][c][0][1]) &&
				inBoard(x + wincheck[i][c][1][0], y + wincheck[i][c][1][1]) &&
				inBoard(x + wincheck[i][c][2][0], y + wincheck[i][c][2][1]) &&
				inBoard(x + wincheck[i][c][3][0], y + wincheck[i][c][3][1]) &&
				inBoard(x + wincheck[i][c][4][0], y + wincheck[i][c][4][1]))
				{
				if((board[x + wincheck[i][c][0][0]][y + wincheck[i][c][0][1]] == board[x][y]) &&
					(board[x + wincheck[i][c][1][0]][y + wincheck[i][c][1][1]] == board[x][y]) &&
					(board[x + wincheck[i][c][2][0]][y + wincheck[i][c][2][1]] == board[x][y]) &&
					(board[x + wincheck[i][c][3][0]][y + wincheck[i][c][3][1]] == board[x][y]) &&
					(board[x + wincheck[i][c][4][0]][y + wincheck[i][c][4][1]] == board[x][y]) &&
					(ignorable(board, newx1, newy1, x, y) && ignorable(board, newx2, newy2, x, y))) {

					gameover = false;
					winCall[x][y]++;
					choicelist[x][y] += 1510;
					console.log(turns, x,y, choicelist[x][y], winCall[x][y], [x + wincheck[i][c][0][0], y + wincheck[i][c][0][1]], [x + wincheck[i][c][4][0], y + wincheck[i][c][4][1]]);

					winningmove = true;
				}
			}
		}
	}
	if(winningmove) {
		return true;
	} else {
		return false;
	}
}

function holedFive(board, x, y) {
	var called = 0;
	var winningmove = false;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 5; ++c) {
			var newx1 = x + wincheck[i][c][4][0] + (wincheck[i][c][4][0] - wincheck[i][c][3][0]);
			var newy1 = y + wincheck[i][c][4][1] + (wincheck[i][c][4][1] - wincheck[i][c][3][1]);
			var newx2 = x + wincheck[i][c][0][0] - (wincheck[i][c][1][0] - wincheck[i][c][0][0]);
			var newy2 = y + wincheck[i][c][0][1] - (wincheck[i][c][1][1] - wincheck[i][c][0][1]);
			if(inBoard(x + wincheck[i][c][0][0], y + wincheck[i][c][0][1]) &&
				inBoard(x + wincheck[i][c][1][0], y + wincheck[i][c][1][1]) &&
				inBoard(x + wincheck[i][c][2][0], y + wincheck[i][c][2][1]) &&
				inBoard(x + wincheck[i][c][3][0], y + wincheck[i][c][3][1]) &&
				inBoard(x + wincheck[i][c][4][0], y + wincheck[i][c][4][1]))
				{
				if(isHoled([[x, y], [x + wincheck[i][c][0][0], y + wincheck[i][c][0][1]],
					[x + wincheck[i][c][1][0], y + wincheck[i][c][1][1]],
					[x + wincheck[i][c][2][0], y + wincheck[i][c][2][1]],
					[x + wincheck[i][c][3][0], y + wincheck[i][c][3][1]],
					[x + wincheck[i][c][4][0], y + wincheck[i][c][4][1]]]) &&
					(ignorable(board, newx1, newy1, x, y) && ignorable(board, newx2, newy2, x, y))) {
					gameover = false;

					choicelist[x][y] += 79;
					console.log(turns, x,y, choicelist[x][y], winCall[x][y], [x + wincheck[i][c][0][0], y + wincheck[i][c][0][1]], [x + wincheck[i][c][4][0], y + wincheck[i][c][4][1]]);
					winningmove = true;
				}
			}
		}
	}
}

function closedFour(board,x,y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 4; ++c) {
			var newx1 = x + fourcheck[i][c][3][0] + (fourcheck[i][c][3][0] - fourcheck[i][c][2][0]);
			var newy1 = y + fourcheck[i][c][3][1] + (fourcheck[i][c][3][1] - fourcheck[i][c][2][1]);
			var newx2 = x + fourcheck[i][c][0][0] - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy2 = y + fourcheck[i][c][0][1] - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			if(inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][1][0], y + fourcheck[i][c][1][1]) &&
				inBoard(x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]) &&
				inBoard(x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1])) {
					if((board[x + fourcheck[i][c][0][0]][y + fourcheck[i][c][0][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][1][0]][y + fourcheck[i][c][1][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][2][0]][y + fourcheck[i][c][2][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][3][0]][y + fourcheck[i][c][3][1]] == board[x][y]) &&
					(((inBoard(newx1, newy1) && board[newx1][newy1] == !board[x][y]) && (inBoard(newx2, newy2) && board[newx2][newy2] != board[newx1][newy1]))
					|| ((inBoard(newx2, newy2) && board[newx2][newy2] == !board[x][y]) && (inBoard(newx1, newy1) && inBoard(newx2, newy2) && board[newx1][newy1] != board[newx2][newy2])))){
						choicelist[x][y] += 80;
						called++;
				}
			}
		}
	}
	return;
}

function openFour(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 4; ++c) {
			var newx1 = x + fourcheck[i][c][3][0] + (fourcheck[i][c][3][0] - fourcheck[i][c][2][0]);
			var newy1 = y + fourcheck[i][c][3][1] + (fourcheck[i][c][3][1] - fourcheck[i][c][2][1]);
			var newx2 = x + fourcheck[i][c][0][0] - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy2 = y + fourcheck[i][c][0][1] - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			if(inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][1][0], y + fourcheck[i][c][1][1]) &&
				inBoard(x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]) &&
				inBoard(x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1])) {
				if((board[x + fourcheck[i][c][0][0]][y + fourcheck[i][c][0][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][1][0]][y + fourcheck[i][c][1][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][2][0]][y + fourcheck[i][c][2][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][3][0]][y + fourcheck[i][c][3][1]] == board[x][y]) &&
					((inBoard(newx1, newy1) && board[newx1][newy1] == -1) && (inBoard(newx2, newy2) && board[newx2][newy2] == -1))){
					choicelist[x][y] += 500;
					called++;
				}
			}
		}
	}
	return;
}

function closedHoledThree(board,x,y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 4; ++c) {
			var newx1 = x + fourcheck[i][c][3][0] + (fourcheck[i][c][3][0] - fourcheck[i][c][2][0]);
			var newy1 = y + fourcheck[i][c][3][1] + (fourcheck[i][c][3][1] - fourcheck[i][c][2][1]);
			var newx2 = x + fourcheck[i][c][0][0] - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy2 = y + fourcheck[i][c][0][1] - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			if(inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][1][0], y + fourcheck[i][c][1][1]) &&
				inBoard(x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]) &&
				inBoard(x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1])) {
					if(isHoled([[x, y], [x + fourcheck[i][c][0][0],y + fourcheck[i][c][0][1]],
					[x + fourcheck[i][c][1][0],y + fourcheck[i][c][1][1]], [x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]],
					[x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1]]]) &&
					(((inBoard(newx1, newy1) && board[newx1][newy1] == !board[x][y]) && (inBoard(newx2, newy2) && board[newx2][newy2] != board[newx1][newy1]))
					|| ((inBoard(newx2, newy2) && board[newx2][newy2] == !board[x][y]) && (inBoard(newx1, newy1) && board[newx1][newy1] != board[newx2][newy2])))){
						choicelist[x][y] += 40;
						called++;
				}
			}
		}
	}
	return;
}

function openHoledThree(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 4; ++c) {
			var newx1 = x + fourcheck[i][c][3][0] + (fourcheck[i][c][3][0] - fourcheck[i][c][2][0]);
			var newy1 = y + fourcheck[i][c][3][1] + (fourcheck[i][c][3][1] - fourcheck[i][c][2][1]);
			var newx2 = x + fourcheck[i][c][0][0] - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy2 = y + fourcheck[i][c][0][1] - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			if(inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][0][0], y + fourcheck[i][c][0][1]) &&
				inBoard(x + fourcheck[i][c][1][0], y + fourcheck[i][c][1][1]) &&
				inBoard(x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]) &&
				inBoard(x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1])) {
				if(isHoled([[x, y], [x + fourcheck[i][c][0][0],y + fourcheck[i][c][0][1]],
					[x + fourcheck[i][c][1][0], y + fourcheck[i][c][1][1]],
					[x + fourcheck[i][c][2][0], y + fourcheck[i][c][2][1]],
					[x + fourcheck[i][c][3][0], y + fourcheck[i][c][3][1]]]) &&
					((inBoard(newx1, newy1) && board[newx1][newy1] == -1) && (inBoard(newx2, newy2) && board[newx2][newy2] == -1))){
					choicelist[x][y] += 70;
					called++;

				}
			}
		}
	}
	return;
}

//closed three
function closedThree(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 3; ++c) {
			var newx1 = x + threecheck[i][c][2][0] + (threecheck[i][c][2][0] - threecheck[i][c][1][0]);
			var newy1 = y + threecheck[i][c][2][1] + (threecheck[i][c][2][1] - threecheck[i][c][1][1]);
			var newx2 = x + threecheck[i][c][0][0] - (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy2 = y + threecheck[i][c][0][1] - (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			if(inBoard(x + threecheck[i][c][0][0], y + threecheck[i][c][0][1]) &&
			inBoard(x + threecheck[i][c][1][0], y + threecheck[i][c][1][1]) &&
			inBoard(x + threecheck[i][c][2][0], y + threecheck[i][c][2][1])) {
				if((board[x + threecheck[i][c][0][0]][y + threecheck[i][c][0][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][1][0]][y + threecheck[i][c][1][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][2][0]][y + threecheck[i][c][2][1]] == board[x][y]) &&
					(((inBoard(newx1, newy1) && board[newx1][newy1] == !board[x][y]) && (inBoard(newx2,newy2) && board[newx2][newy2] != board[newx1][newy1]))
					|| ((inBoard(newx2, newy2) && board[newx2][newy2] == !board[x][y]) && inBoard(newx1, newy1) && (board[newx2][newy2] != board[newx1][newy1])))){
						choicelist[x][y] += 30;
						called++;
				}
			}
		}
	}
	return;
}

//open three
function openThree(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 3; ++c) {
			var newx1 = x + threecheck[i][c][2][0] + (threecheck[i][c][2][0] - threecheck[i][c][1][0]);
			var newy1 = y + threecheck[i][c][2][1] + (threecheck[i][c][2][1] - threecheck[i][c][1][1]);
			var newx2 = x + threecheck[i][c][0][0] - (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy2 = y + threecheck[i][c][0][1] - (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			if((x + threecheck[i][c][0][0] >= 0) && (y + threecheck[i][c][0][1] >= 0) && (x + threecheck[i][c][0][0] < 20) && (y + threecheck[i][c][0][1] < 20) &&
			(x + threecheck[i][c][1][0] >= 0) && (y + threecheck[i][c][1][1] >= 0) && (x + threecheck[i][c][1][0] < 20) && (y + threecheck[i][c][1][1] < 20) &&
			(x + threecheck[i][c][2][0] >= 0) && (y + threecheck[i][c][2][1] >= 0) && (x + threecheck[i][c][2][0] < 20) && (y + threecheck[i][c][2][1] < 20)) {
				if((board[x + threecheck[i][c][0][0]][y + threecheck[i][c][0][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][1][0]][y + threecheck[i][c][1][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][2][0]][y + threecheck[i][c][2][1]] == board[x][y]) &&
					((((newx1 >= 0) && (newx1 < 20) && (newy1 >= 0) && (newy1 < 20)) && (board[newx1][newy1] == -1)) && (((newx2 >= 0) && (newx2 < 20) && (newy2 >= 0) && (newy2 < 20)) && (board[newx2][newy2] == -1)))){
						choicelist[x][y] += 80;
						called++;
				}
			}
		}
	}
	return;
}

function openHoledTwo(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 3; ++c) {
			var newx1 = x + threecheck[i][c][2][0] + (threecheck[i][c][2][0] - threecheck[i][c][1][0]);
			var newy1 = y + threecheck[i][c][2][1] + (threecheck[i][c][2][1] - threecheck[i][c][1][1]);
			var newx2 = x + threecheck[i][c][0][0] - (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy2 = y + threecheck[i][c][0][1] - (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			if((x + threecheck[i][c][0][0] >= 0) && (y + threecheck[i][c][0][1] >= 0) && (x + threecheck[i][c][0][0] < 20) && (y + threecheck[i][c][0][1] < 20) &&
			(x + threecheck[i][c][1][0] >= 0) && (y + threecheck[i][c][1][1] >= 0) && (x + threecheck[i][c][1][0] < 20) && (y + threecheck[i][c][1][1] < 20) &&
			(x + threecheck[i][c][2][0] >= 0) && (y + threecheck[i][c][2][1] >= 0) && (x + threecheck[i][c][2][0] < 20) && (y + threecheck[i][c][2][1] < 20)) {
				if(isHoled([[x,y],
					[x + threecheck[i][c][0][0], y + threecheck[i][c][0][1]],
					[x + threecheck[i][c][1][0], y + threecheck[i][c][1][1]],
					[x + threecheck[i][c][2][0], y + threecheck[i][c][2][1]]]) &&
					((inBoard(newx1, newy1) && (board[newx1][newy1] == -1)) && (inBoard(newx2, newy2) && (board[newx2][newy2] == -1)))){
						choicelist[x][y] += 9;
						called++;
				}
			}
		}
	}
	return;
}

//open two in a row by two spaces
function openTwo(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 2; ++c) {
			var newx1 = x + twocheck[i][c][1][0] + (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy1 = y + twocheck[i][c][1][1] + (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx2 = x + twocheck[i][c][0][0] - (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy2 = y + twocheck[i][c][0][1] - (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx3 = newx1 + (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy3 = newy1 + (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx4 = newx2 - (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy4 = newy2 - (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			if((x + twocheck[i][c][0][0] >= 0) && (y + twocheck[i][c][0][1] >= 0) && (x + twocheck[i][c][0][0] < 20) && (y + twocheck[i][c][0][1] < 20) &&
				(x + twocheck[i][c][1][0] >= 0) && (y + twocheck[i][c][1][1] >= 0) && (x + twocheck[i][c][1][0] < 20) && (y + twocheck[i][c][1][1] < 20)) {
					if((board[x + twocheck[i][c][0][0]][y + twocheck[i][c][0][1]] == board[x][y]) &&
					(board[x + twocheck[i][c][1][0]][y + twocheck[i][c][1][1]] == board[x][y]) &&
					((((newx1 >= 0) && (newx1 < 20) && (newy1 >= 0) && (newy1 < 20)) && (board[newx1][newy1] == -1)) && (((newx2 >= 0) && (newx2 < 20) && (newy2 >= 0) && (newy2 < 20)) && (board[newx2][newy2] == -1))) &&
					((((newx3 >= 0) && (newx3 < 20) && (newy3 >= 0) && (newy3 < 20)) && (board[newx3][newy3] == -1)) && (((newx4 >= 0) && (newx4 < 20) && (newy4 >= 0) && (newy4 < 20)) && (board[newx4][newy4] == -1))))
					{
						called++;
						choicelist[x][y] += 20;
					}
			}
		}
	}
}

function closedTwo(board, x, y) {
	var called = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 2; ++c) {
			var newx1 = x + twocheck[i][c][1][0] + (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy1 = y + twocheck[i][c][1][1] + (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx2 = x + twocheck[i][c][0][0] - (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy2 = y + twocheck[i][c][0][1] - (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx3 = newx1 + (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy3 = newy1 + (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			var newx4 = newx2 - (twocheck[i][c][1][0] - twocheck[i][c][0][0]);
			var newy4 = newy2 - (twocheck[i][c][1][1] - twocheck[i][c][0][1]);
			if((x + twocheck[i][c][0][0] >= 0) && (y + twocheck[i][c][0][1] >= 0) && (x + twocheck[i][c][0][0] < 20) && (y + twocheck[i][c][0][1] < 20) &&
				(x + twocheck[i][c][1][0] >= 0) && (y + twocheck[i][c][1][1] >= 0) && (x + twocheck[i][c][1][0] < 20) && (y + twocheck[i][c][1][1] < 20)) {
					if((board[x + twocheck[i][c][0][0]][y + twocheck[i][c][0][1]] == board[x][y]) &&
					(board[x + twocheck[i][c][1][0]][y + twocheck[i][c][1][1]] == board[x][y]) &&
					((inBoard(newx1, newy1) && (board[newx1][newy1] == !board[x][y])) && (inBoard(newx3, newy3) && (board[newx3][newy3] == -1) && inBoard(newx4, newy4) && (board[newx4][newy4] == -1))) &&
					((inBoard(newx2, newy2) && (board[newx2][newy2] == !board[x][y])) && (inBoard(newx4, newy4) && (board[newx4][newy4] == -1) && inBoard(newx3, newy3) && (board[newx3][newy3] == -1))))
					{
						called++;
						choicelist[x][y] += 10;
					}
			}
		}
	}
	return;
}

//double threes
function threeCheck(board, x, y) {
	var threes = 0;
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 3; ++c) {
			var newx1 = x + threecheck[i][c][2][0] + (threecheck[i][c][2][0] - threecheck[i][c][1][0]);
			var newy1 = y + threecheck[i][c][2][1] + (threecheck[i][c][2][1] - threecheck[i][c][1][1]);
			var newx2 = x + threecheck[i][c][0][0] - (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy2 = y + threecheck[i][c][0][1] - (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			var newx3 = newx1 + (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy3 = newy1 + (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			var newx4 = newx2 - (threecheck[i][c][1][0] - threecheck[i][c][0][0]);
			var newy4 = newy2 - (threecheck[i][c][1][1] - threecheck[i][c][0][1]);
			if(inBoard(x + threecheck[i][c][0][0], y + threecheck[i][c][0][1]) && inBoard(x + threecheck[i][c][0][0], y + threecheck[i][c][0][1]) &&
				inBoard(x + threecheck[i][c][1][0], y + threecheck[i][c][1][1]) && inBoard(x + threecheck[i][c][1][0], y + threecheck[i][c][1][1]) &&
			(x + threecheck[i][c][2][0] >= 0) && (y + threecheck[i][c][2][1] >= 0) && (x + threecheck[i][c][2][0] < 20) && (y + threecheck[i][c][2][1] < 20)) {
				if((board[x + threecheck[i][c][0][0]][y + threecheck[i][c][0][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][1][0]][y + threecheck[i][c][1][1]] == board[x][y]) &&
					(board[x + threecheck[i][c][2][0]][y + threecheck[i][c][2][1]] == board[x][y]) &&
					((((newx1 >= 0) && (newx1 < 20) && (newy1 >= 0) && (newy1 < 20)) && (board[newx1][newy1] == -1)) && (((newx2 >= 0) && (newx2 < 20) && (newy2 >= 0) && (newy2 < 20)) && (board[newx2][newy2] == -1))) &&
					(!inBoard(newx3, newy3) || (board[newx3][newy3] != board[x][y])) && (!inBoard(newx4, newy4) || (board[newx4][newy4] != board[x][y]))){
					threes++;
					if(threes == 2) {
						return true;
					}
				}
			}
		}
	}
	for(var i = 0; i < 4; ++i) {
		for(var c = 0; c < 4; ++c) {
			var newx1 = x + fourcheck[i][c][3][0] + (fourcheck[i][c][3][0] - fourcheck[i][c][2][0]);
			var newy1 = y + fourcheck[i][c][3][1] + (fourcheck[i][c][3][1] - fourcheck[i][c][2][1]);
			var newx2 = x + fourcheck[i][c][0][0] - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy2 = y + fourcheck[i][c][0][1] - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			var newx3 = newx1 + (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy3 = newy1 + (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			var newx4 = newx2 - (fourcheck[i][c][1][0] - fourcheck[i][c][0][0]);
			var newy4 = newy2 - (fourcheck[i][c][1][1] - fourcheck[i][c][0][1]);
			if((x + fourcheck[i][c][0][0] >= 0) && (y + fourcheck[i][c][0][1] >= 0) && (x + fourcheck[i][c][0][0] < 20) &&
				(y + fourcheck[i][c][0][1] < 20) && (x + fourcheck[i][c][1][0] >= 0) && (y + fourcheck[i][c][1][1] >= 0) && (x + fourcheck[i][c][1][0] < 20) &&
				(y + fourcheck[i][c][1][1] < 20) && (x + fourcheck[i][c][2][0] >= 0) && (y + fourcheck[i][c][2][1] >= 0) && (x + fourcheck[i][c][2][0] < 20) &&
				(y + fourcheck[i][c][2][1] < 20) && (x + fourcheck[i][c][3][0] >= 0) && (y + fourcheck[i][c][3][1] >= 0) && (x + fourcheck[i][c][3][0] < 20) &&
				(y + fourcheck[i][c][3][1] < 20)) {
				if((((board[x + fourcheck[i][c][0][0]][y + fourcheck[i][c][0][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][1][0]][y + fourcheck[i][c][1][1]] == -1) &&
					(board[x + fourcheck[i][c][2][0]][y + fourcheck[i][c][2][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][3][0]][y + fourcheck[i][c][3][1]] == board[x][y])) ||
					((board[x + fourcheck[i][c][0][0]][y + fourcheck[i][c][0][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][1][0]][y + fourcheck[i][c][1][1]] == board[x][y]) &&
					(board[x + fourcheck[i][c][2][0]][y + fourcheck[i][c][2][1]] == -1) &&
					(board[x + fourcheck[i][c][3][0]][y + fourcheck[i][c][3][1]] == board[x][y]))) &&
					((inBoard(newx1, newy1) && board[newx1][newy1] == -1) && (inBoard(newx2, newy2) && board[newx2][newy2] == -1)) &&
					ignorable(newx3, newy3) && ignorable(newx4, newy4)){
					threes++;
					if(threes == 2) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

function getComputerMove(choice) {
	var taken = [];
	var moves =[[],[],[],[],[]];

	// resettting choicelist
	for(var i = 0; i < 20; ++i) {
		choicelist[i] = new Array(20);
		for(var c = 0; c < 20; ++c) {
			choicelist[i][c] = 0;
		}
	}

	// resetting winCall
	for(var i = 0; i < 20; ++i) {
		winCall[i] = new Array(20);
		for(var c = 0; c < 20; ++c) {
			winCall[i][c] = 0;
		}
	}

	// getting taken moves
	for(var x = 0; x < 20; ++x) {
		for(var y = 0; y < 20; ++y) {
			if(board[x][y] != -1) {
				taken.push([x,y]);
			}
		}
	}

	if(taken.length == 0) {
		taken.push([9, 9]);
	}

	// getting untaken moves
	for(var i = 0; i < taken.length; ++i) {
		for(var check = 0; check < area.length; ++check) {
			var x = taken[i][0] + area[check][0];
			var y = taken[i][1] + area[check][1];
			if(inBoard(x, y) && (board[x][y] == -1)
				&& (!inArray(moves[2], [x,y]))) {
				moves[2].push([x, y]);
			}
		}
	}

	for(var i = 0; i < moves[2].length; ++i) {
		board[moves[2][i][0]][moves[2][i][1]] = choice;
		if(!threeCheck(board, moves[2][i][0], moves[2][i][1])) {
			moves[1].push([moves[2][i][0], moves[2][i][1]]);
			moves[3].push([moves[2][i][0], moves[2][i][1]]);
		}
		board[moves[2][i][0]][moves[2][i][1]] = -1;
	}

	//attack points
	for(var i = 0; i < moves[1].length; ++i) {
		var newx = moves[1][i][0];
		var newy = moves[1][i][1];
		board[newx][newy] = choice;
		didWin(board, newx, newy);
		holedFive(board, newx, newy);
		closedFour(board, newx, newy);
		openFour(board, newx, newy);
		closedThree(board, newx, newy);
		openThree(board, newx, newy);
		openHoledThree(board, newx, newy);
		closedHoledThree(board, newx, newy);
		openHoledTwo(board, newx, newy)
		closedTwo(board, newx, newy);
		openTwo(board, newx, newy);
		board[newx][newy] = -1;
	}

	//defense points
	for(var i = 0; i < moves[3].length; ++i) {
		var newx = moves[3][i][0];
		var newy = moves[3][i][1];
		var buffer = 0;
		board[newx][newy] = !choice;
		buffer = choicelist[newx][newy];
		didWin(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 150;
		}
		buffer = choicelist[newx][newy];
		holedFive(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 100;
		}
		buffer = choicelist[newx][newy];
		closedFour(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		openFour(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 90;
		}
		buffer = choicelist[newx][newy];
		closedThree(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		openThree(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		openHoledThree(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		closedHoledThree(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		openHoledTwo(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		closedTwo(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		openTwo(board, newx, newy);
		if(buffer != choicelist[newx][newy]) {
			choicelist[newx][newy] -= 10;
		}
		buffer = choicelist[newx][newy];
		board[newx][newy] = -1;
	}

	var minimum = -1;
	var queue = [];

	//the exceptional case where the values are the same aren't considered
	for(var i = 0; i < moves[1].length; ++i) {
		var x = moves[1][i][0];
		var y = moves[1][i][1];
		queue.push(choicelist[x][y]);
	}

	for(var i = 0; i < moves[3].length; ++i) {
		var x = moves[3][i][0];
		var y = moves[3][i][1];
		queue.push(choicelist[x][y]);
	}

	var queue2 = [];
	var maximum = getMaxOfArray(queue);

	for(var i = 0; i < moves[2].length; ++i) {
		var x = moves[2][i][0];
		var y = moves[2][i][1];
		if(choicelist[x][y] == maximum) {
			queue2.push([x,y]);
		}
	}

	// getting the random index of queue2
	var index = Math.floor(Math.random() * queue2.length);

	board[queue2[index][0]][queue2[index][1]] = choice;

	var changer = "#" + queue2[index][0].toString() + "_" + queue2[index][1].toString();

	if(choice == true){
		$(changer).html("<b>"+turns+"</b>");
		$(changer).css('backgroundColor', 'white');
	} else {
		$(changer).html("<b>"+turns+"</b>");
		$(changer).css('backgroundColor', 'black');
	}
	if(didWin(board, queue2[index][0], queue2[index][1])) {
		$('.stones').unbind( "click touch tap");
		$('.stones').unbind('mouseenter mouseleave');
		alert("DIPPER WINS");
		return;
	}

	turns++;
	var a = [[1,2], [2,3]];
	var b = [1,2];

} // end of getComputerMove


var user = "";

$('#white').on('click touch tap', function() {
	user = "white";
	$('#black').css('visibility', 'hidden');
	$('.stones').on('click touch tap', function() {
		if(board[parseInt($(this).attr('id').split("_")[0])][parseInt($(this).attr('id').split("_")[1])] == -1) {
			this.style.backgroundColor= user;
			$(this).html("<b>"+turns+"</b>");

			board[parseInt($(this).attr('id').split("_")[0])][parseInt($(this).attr('id').split("_")[1])] = true;

			if(threeCheck(board, parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]))) {
				alert("THREE THREE");
				board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] = -1;
				$(this).css('backgroundColor', 'rgba(0,0,0,0)');
				return;
			}

			if(didWin(board, parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]))) {
				$('.stones').unbind( "click touch tap");
				$('.stones').unbind('mouseenter mouseleave');
				alert("YOU WIN");
				return;
			}

			++turns;
			getComputerMove(false);

	}
});
	$('.stones').hover(function() {
		if(board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] == -1) {
			$(this).css('backgroundColor', 'rgba(255,255,255, 0.75)');
		}
	}, function() {
		if(board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] == -1) {
			$(this).css('backgroundColor', 'rgba(0,0,0,0)');
		}
	});
});

$('#black').on('click touch tap', function() {
	user = "black";
	$('#white').css('visibility', 'hidden');
	turns++;
	getComputerMove(true);
	$('.stones').on('click touch tap', function() {
		if(board[parseInt($(this).attr('id').split("_")[0])][parseInt($(this).attr('id').split("_")[1])] == -1) {
			this.style.backgroundColor= user;
			$(this).html("<b>"+turns+"</b>");
			//alert($(this).attr('id').split("_"));
			board[parseInt($(this).attr('id').split("_")[0])][parseInt($(this).attr('id').split("_")[1])] = false;
		//	renew(parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]), false);
			if(threeCheck(board, parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]))) {
				alert("THREE THREE");
				board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] = -1;
				$(this).css('backgroundColor', 'rgba(0,0,0,0)');
				return;
			}
	/*		if(onethreeCheck(board, parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]))) {
				alert("One Three");
			}*/

			if(didWin(board, parseInt($(this).attr('id').split("_")[0]), parseInt($(this).attr('id').split("_")[1]))) {
				$('.stones').unbind( "click touch tap");
				$('.stones').unbind( "hover");
				alert("YOU WIN");
				return;
			}
		turns++;
		getComputerMove(true);
	}
});
	$('.stones').hover(function() {
		if(board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] == -1) {
			$(this).css('backgroundColor', 'rgba(0,0,0,0.75)');
	}
	}, function() {
		if(board[$(this).attr('id').split("_")[0]][$(this).attr('id').split("_")[1]] == -1) {
			$(this).css('backgroundColor', 'rgba(0,0,0,0)');
		}
	});
});


var displaytext;
$('form').submit(function(e) {
	e.preventDefault();
	$('.para').text($('#username').val());
	$('.para2').text($('#roomname').val());
//	alert($('#roomname').val());
	if(($('#username').val() != "") && ($('#roomname').val() != "")) {
		alert("DONE");
		$('fieldset').css('visibility', 'hidden');
	}
});

$(window).unload(function() {
	return "YOU LOSE";
});
