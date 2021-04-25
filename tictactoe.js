let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	let foundEmpty = false;
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

// My Work ——————————————————————————————

function newGame() {
	clearTimeout(computerMoveTimeout);
	computerMoveTimeout = 0;
	let buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.innerHTML = "";
		button.removeAttribute("class");
		button.removeAttribute("disabled");
	}
	playerTurn = true;
	document.getElementById("turnInfo").innerHTML = "Your turn";
}

function boardButtonClicked(button) {
	if (playerTurn === true) {
		button.innerHTML = "X";
		button.classList.add("x");
		button.setAttribute("disabled", true);
		playerTurn = false;
		switchTurn();
	}
}

function switchTurn() {
	checkForWinner();
	if (checkForWinner() === gameStatus.MORE_MOVES_LEFT) {
		document.getElementById("turnInfo").textContent = "Computer's turn";
		if (playerTurn === false) {
			setTimeout(function() {
				makeComputerMove();
				return computerMoveTimeout;
			}, 1000);
			playerTurn = true;
			document.getElementById("turnInfo").textContent = "Your turn";
		}
	}
	else {
		if (checkForWinner() === gameStatus.HUMAN_WINS) {
			document.getElementById("turnInfo").textContent = "You win!";
		}
		else if (checkForWinner() === gameStatus.COMPUTER_WINS) {
			document.getElementById("turnInfo").textContent = "Computer wins!";
		}
		else if (checkForWinner() === gameStatus.DRAW_GAME) {
			document.getElementById("turnInfo").textContent = "Draw game";
		}
	}
}

function makeComputerMove() {
	let buttons = getGameBoardButtons();
	for (let i = 0; i < buttons.length; i++) {
		let btnNum = Math.floor(Math.random() * 9);
		if (buttons[btnNum].innerHTML !== "X" && buttons[btnNum].innerHTML !== "O") {
			buttons[btnNum].innerHTML = "O";
			buttons[btnNum].classList.add("o");
			buttons[btnNum].setAttribute("disabled", true);
			i = 9;
		}
	}
	switchTurn();
	
}