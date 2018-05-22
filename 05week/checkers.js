'use strict';

/*
Take input from player
  two numbers, each two digits
  .split('') each number in new array
  array[0] is row, array[1] is col
  first number is origin, second number is destination

Origin number must contain a checker

Destination number must not contain a checker
  must be either 1/1 away or 2/2 away
  if 1 row away, must be 1 col away
  if 2 row away, must be 2 col away and there must be a checker 1/1 away

A checker is an object such that any occupied space has a .symbol

*/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.symbol = "O";
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
    this.populateGrid();
  }
  populateGrid() {
    // find the six rows (0, 1, 2, 5, 6 ,7) that start with checkers and populate them
    this.grid.forEach((rowItem, rowIndex) => {
      // select the even rows, ignoring the middle of the board
      if (rowIndex == 0 || rowIndex == 2 || rowIndex == 6) {
        this.grid[rowIndex].forEach((colItem, colIndex) => {
          // skip every other square - for even rows, skip even columns
          if (colIndex % 2 == 1) {
            // make a new Checker, place it, and push it to the game's storage array
            const newChecker = new Checker(rowIndex, colIndex);
            this.grid[rowIndex][colIndex] = newChecker;
            game.board.checkers.push(new Checker);
          }
        })
        // select the odd rows, ignoring the middle
      } else if (rowIndex == 1 || rowIndex == 5 || rowIndex == 7) {
        this.grid[rowIndex].forEach((colItem, colIndex) => {
          // skip the odd columns in these rows
          if (colIndex % 2 == 0) {
            const newChecker = new Checker(rowIndex, colIndex);
            this.grid[rowIndex][colIndex] = newChecker;
            game.board.checkers.push(new Checker);
          }
        })
      }
    })
  }

  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
  }
  moveChecker(whichPiece, toWhere) {
    // make array of each input number
    const originArr = whichPiece.split('');
    const destinArr = toWhere.split('');
    // make a variable of everything being reused for readability
    const originRow = parseInt(originArr[0]);
    const originCol = parseInt(originArr[1]);
    const destinRow = parseInt(destinArr[0]);
    const destinCol = parseInt(destinArr[1]);
    const rowDifference = destinRow - originRow;
    const colDifference = destinCol - originCol;
    const rowAbs = Math.abs(rowDifference);
    const colAbs = Math.abs(colDifference);
    const checkerStart = this.board.grid[originRow][originCol];
    const checkerEnd = this.board.grid[destinRow][destinCol];

    // first ensure there's a checker at whichPiece and no checker at toWhere
    if (checkerStart && !checkerEnd) {
      // regular move, 1 space diagonally
      if (rowAbs == 1 && colAbs == 1) {
        const hand = checkerStart;
        this.board.grid[originRow][originCol] = null;
        this.board.grid[destinRow][destinCol] = checkerStart;
        console.log(game.board.checkers.length);
      // kill move, jumping 2 spaces diagonally over another checker
      } else if (rowAbs == 2 && colAbs == 2) {
        // store the location immediately between whichPiece and toWhere with math expressions, retaining positive/negative
        const jumpedRow = (rowDifference / 2) + originRow;
        const jumpedCol = (colDifference / 2) + originCol;
        const jumpedSpot = game.board.grid[jumpedRow][jumpedCol];
        // ensure there is a checker at that spot
        if (jumpedSpot) {
          // delete the checker immediately between whichPieceand toWhere, remove from storage array
          game.board.grid[jumpedRow][jumpedCol] = null;
          game.board.checkers.pop();
          // move the checker to destination
          const hand = checkerStart;
          this.board.grid[originRow][originCol] = null;
          this.board.grid[destinRow][destinCol] = checkerStart;
          console.log(game.board.checkers.length);
        } else console.log('Only move 2 spaces if jumping another checker')
      } else console.log('Checkers may only move 1 space diagonally, or 2 spaces diagonally by jumping another checker')
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
