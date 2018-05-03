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

let playerTurn = 'X';

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

function horizontalWin() {
  if ( (board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] === playerTurn) || (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] === playerTurn) || (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] === playerTurn) ) {
    console.log(playerTurn + " wins y'all");
    return true;
  } else return false;
}

function verticalWin() {
  if ( (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === playerTurn) || (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === playerTurn) || (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === playerTurn) ) {
    console.log(playerTurn + " rises to the occasions")
    return true;
  } else return false;
}

function diagonalWin() {
  if ( (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === playerTurn) || (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === playerTurn) ) {
    console.log(playerTurn + " wins diagonally")
    return true;
  } else return false;
}

function checkForWin() {
  console.log("win check");
  if (horizontalWin) {
    console.log("horizontal check");
    return true;
  } else {
    if (verticalWin()) {
      console.log("vertical check");
      return true;
    } else {
      if (diagonalWin()) {
        console.log("diagonal check");
        return true;
      } else {
        console.log("no win")
        return false
      }
    }
  }
}

function ticTacToe(row, column) {
  board[row].splice(column, 1, playerTurn);
  // checkForWin();
  if (checkForWin()) {
    console.log("how did we get here")
    return ("Congratulations " + playerTurn);
  }
  if (playerTurn === 'X') {
    let playerTurn = 'O';
  } else {
    let playerTurn = 'X';
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

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
