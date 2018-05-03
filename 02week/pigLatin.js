'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Take a string as input and check the first letter.
// remove spaces (.replace(/\s/g, "")) and convert to all lowercase (.tolower)
// create new variable, convert string to array (.split())
// create array of vowels to check against
// check the first letter against the vowels array via
// If first letter is a vowel, leave it in place and .push [y, a, y]
// If the first letter is a consonant, run loop to .shift() letters to a new variable until a vowel is reached
// move initial consonant(s) to the end of the string and .push [a, y]

function pigLatin(word) {
  // Convert the string to lowercase and remove all spaces, then convert the new string to an array
  const trimmedWord = word.replace(/\s/g, "").toLowerCase();
  const wordArray = trimmedWord.split("");

  const vowels = ["a","e","i","o","u"] // Create an array of letters that are vowels at the beginning of a word

  if (vowels.includes(wordArray[0])) { //check for an initial vowel
    return wordArray.join("") + "yay"; //special rule for words that have initial vowels
  } else {
    while (!vowels.includes(wordArray[0])) { // simple loop to keep checking the initial letter until a vowel is reached
    const letter1 = wordArray.shift(); // removes the first letter if it's a consonant
    const finalArray = wordArray.push(letter1); // moves the removes letter to the end of the array
    }
    return wordArray.join("") + "ay"; // once loop is done (ie the new first letter is a vowel), converts to piglatin string
  }
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
