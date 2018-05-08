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
  If any array other than .a is longer than 3 items, game is won
*/

let victory = false;
let moveCount = 1;

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  console.log("");
}

function checkForWin() {
  // check if any stack that begins empty now has all items in it
  if (stacks.b.length > 3 || stacks.c.length > 3) {
    printStacks();
    console.log("");
    console.log("You won in "+moveCount+" moves");
    console.log("");
    victory = true; // global var for deciding whether game is playable
  }
}

function towersOfHanoi(startStack, endStack) {
  // legality: make sure two different stacks chosen and not pulling from empty stack
  if (startStack != endStack && stacks[startStack].length > 0) {

    let hand = stacks[startStack].pop();

    // legality: make sure not placing larger peg on top of smaller peg
    if (stacks[endStack].length === 0 || stacks[endStack][stacks[endStack].length - 1] > hand) {

      stacks[endStack].push(hand);
      checkForWin();
      moveCount++;

    } else {
      stacks[startStack].push(hand); // return popped peg to original stack
    }
  }
}

function getPrompt() {
  if (!victory) { // input prompt will be blocked if the game has been won
  printStacks();
  console.log("move "+moveCount);
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
