'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

/*
Take player 1 input (row, column) and turn it into a mark
  use splice() to find and replace empty spot with player mark
  position is board[row][column]
  board[row].splice(column, 1, playerTurn)

Switch to player 2, take input and turn it into a mark
  After mark is placed, if playerTurn is X, let playerTurn be O, else let playerTurn be X
  ACTUALLY do this after win check

At the end of each turn, check for a win
  call checkForWin, which will call each win function
  could ignore diagonalwin if last mark was not corner or center
  horizontalWin - if board[0][0] === board[0][1] === board[0][2] etc.
  verticalWin - if board[0][0] === board[1][0] === board[2][0] etc.
  diagonalWin - if board[0][0] === board[1][1] === board[2][2] etc.
*/

let playerTurn = 'X';
let gameEnd = false;

function horizontalWin() {
  if ((board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] === playerTurn) || (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] === playerTurn) || (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] === playerTurn)) {
    gameEnd = true;
  }
}

function verticalWin() {
  if ((board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === playerTurn) || (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === playerTurn) || (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === playerTurn)) {
    gameEnd = true;
  }
}

function diagonalWin() {
  if ((board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === playerTurn) || (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === playerTurn)) {
    gameEnd = true;
  }
}

function checkForWin() { // run each win check, stop checking if win found
  horizontalWin();
  if (gameEnd === false) {
    verticalWin();
    if (gameEnd === false) {
      diagonalWin();
    }
  }
}

function ticTacToe(row, column) {
  if (board[row][column] === " ") { // make sure the space has not already been marked
    board[row].splice(column, 1, playerTurn); // mark the space
    checkForWin(); // check if the move was a winning one
    if (gameEnd === true) {
      console.log(" "); // aesthetics
      return ("Congratulations " + playerTurn);
    }
    if (playerTurn === "X") { // switch turns
      playerTurn = "O";
    } else playerTurn = "X";
  } else {
    console.log(" ");  // aesthetics
    console.log("That space is not available!")
  }
}

function getPrompt() {
  console.log(" "); // aesthetics
  printBoard();
  console.log(" ");
  if (gameEnd === false) {
    console.log("It's Player " + playerTurn + "'s turn.");
    rl.question('row: ', (row) => {
      rl.question('column: ', (column) => {
        ticTacToe(row, column);
        getPrompt();
      });
    });
  } else {
    console.log(" ");
    console.log("Victory for " + playerTurn + "!");
    console.log(" ");
    console.log("Ctrl+C to exit game");
  }
}

// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [
        [' ', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' ']
      ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [
        ['O', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' ']
      ]);
    });
    it('should check for vertical wins', () => {
      board = [
        [' ', 'X', ' '],
        [' ', 'X', ' '],
        [' ', 'X', ' ']
      ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [
        ['X', 'X', 'X'],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [
        ['X', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', 'X']
      ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
