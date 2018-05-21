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

A checker is an object ?


*/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker() {
  // Your code here
}

class Board {
  constructor() {
    this.grid = []
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
    const originArr = whichPiece.split('');
    const destinArr = toWhere.split('');
    const originRow = originArr[0];
    const originCol = originArr[1];
    const destinRow = destinArr[0];
    const destinCol = destinArr[1];
    if (this.board.grid[originRow][originCol] && !this.board.grid[destinRow][destinCol]) {
      if (Math.abs(destinRow - originRow) == 1 && Math.abs(destinCol - originCol) == 1) {
        // move a checker
      } else if (Math.abs(destinRow - originRow) == 2 && Math.abs(destinCol - originCol) == 2) {
          if (this.board.grid[originRow + 1][originCol + 1])
      } else console.log('invalid move')
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
