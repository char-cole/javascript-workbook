'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

/*
Take input from user: startStack and endStack.
Remove & store (const = .pop) last item from startStack
  Reject move if startStack is empty
Place stored item at end of endStack (endStack.push)
  Check legality
    If stored >= last item, reject move
    If endStack is the same as startStack, reject move
Check for win
  If stacks.c.length is equal to 4, game is won
*/

let hand;
let victory = false;

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {

}

function isLegal() {

}

function checkForWin() {
  if (stacks.b.length > 3 || stacks.c.length > 3) {
    console.log("");
    console.log("You win");
    console.log("");
    victory = true;
  }
}

function towersOfHanoi(startStack, endStack) {
  if (startStack != endStack && stacks[startStack].length > 0) {
    hand = stacks[startStack].pop();
    if (stacks[endStack].length === 0 || stacks[endStack][stacks[endStack].length - 1] > hand) {
      stacks[endStack].push(hand);
      checkForWin();
    } else {
      stacks[startStack].push(hand);
      checkForWin();
    }
  }
}

function getPrompt() {
  if (!victory) {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
