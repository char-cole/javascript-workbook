'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
Check to make sure the hands are each 'rock' or 'paper' or 'scissors'
(if they're not typed exactly, normalize case and spaces)
(if they're not, the game fails)
If they're both valid answers, check to see if they're the same.
(if they're the same, it's a draw)
If it's not a draw, check to see if hand1 beats hand2
(if hand1 is rock and hand2 is scissors, hand1 wins)
(if hand1 is paper and hand2 is rock, hand1 wins)
(if hand1 is scissors and hand2 is paper, hand1 wins)
If hand1 didn't win, hand2 wins
*/

function rockPaperScissors(hand1, hand2) {
  const p1 = hand1.replace(/\s/g, '');
  const p2 = hand2.replace(/\s/g, '');
  if ((p1.toUpperCase() === 'ROCK'||p1.toUpperCase()==='PAPER'||p1.toUpperCase()==='SCISSORS')&&(p2.toUpperCase() === 'ROCK'||p2.toUpperCase()==='PAPER'||p2.toUpperCase()==='SCISSORS')) {
    if (p1.toUpperCase() === p2.toUpperCase()) {
      return "It's a tie!"
    } else if (p1.toUpperCase() === 'ROCK' && p2.toUpperCase() === 'SCISSORS') {
      return 'Hand one wins!'
    } else if (p1.toUpperCase() === 'PAPER' && p2.toUpperCase() === 'ROCK') {
      return 'Hand one wins!'
    } else if (p1.toUpperCase() === 'SCISSORS' && p2.toUpperCase() === 'PAPER') {
      return 'Hand one wins!'
    } else return 'Hand two wins!'
  } else return "No contest"


function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
