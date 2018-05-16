'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
user makes a guess as a string
  must have length === 4
  must not contain duplicates
  each letter of guess must be in letters array - use indexOf
if guess ('bced') === solution ('abcd')
  tell user they won, reset the game
else check which letters of guess ('bced') give hints
  push guess to board, gameover when board has 10 items
    tell user solution, reset
  tell user how many are: right letter, right place |  right letters, wrong place
  make an array of guess and solution
    check index of guess.foreach against solution
    use indexOf to see if the letters are contained in solution
*/

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  const guessArr = guess.split('');
  const solutionArr = solution.split('');

  let rightPlaceRightLetter = 0;
  let wrongPlaceRightLetter = 0;

  guessArr.forEach((letter, index)=>{
    if (solutionArr[index] === letter) {
      rightPlaceRightLetter++;
    } else if (solutionArr.indexOf(letter) != -1) {
      console.log("no way");
    }
  });

  console.log(`${rightPlaceRightLetter} right place right letter ${wrongPlaceRightLetter} wrong place wrong letter`);

}

const isValidGuess = (guess) => {
  const guessArr = guess.split();
  let allLettersValid = true;
  guessArr.forEach((letter, index) => {
    if (letters.indexOf(letter) != -1) {
      allLettersValid = false;
    }
  });
  return guess.length === 4 && allLettersValid
}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution

  if (isValidGuess(guess)) {

    if (solution == guess) {
      console.log("");
      console.log("You win");
      console.log("");
      board = [];

    } else {
      generateHint(guess);
      board.push(guess);
      console.log(board);
      if (board.length > 9) {
        board = [];
        console.log("You lose");
      } else {
      console.log("");
      console.log("Guess again");
      console.log("");
    }
    }

  } else console.log("invalid guess")
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
