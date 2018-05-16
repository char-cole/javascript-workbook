use strict;

const carsInReverse = ["Tesla", "Mitsubishi", "Honda", "Ford"]

for (i = 0; i < carsInReverse.length; i++) {
  console.log(carsInReverse[i]);
}

const persons = {
firstName: "Jane",
lastName: "Doe",
birthDate: "Jan 5, 1925",
gender: "female"
}

for (key in persons) {
  console.log(key);
}

for (χ in persons) {
  if (χ == "birthDate") {
    console.log(persons[χ]);
  }
}

let numbr = 0;

while (numbr < 1000) {
  numbr++;
  console.log(numbr);
}

let countr = 0;

do {
  countr++;
  console.log(countr);
} while (countr < 1000);

// When is a for loop better than a while loop? How is the readability of the code affected?
  // A FL might be better if you know you just need to iterate a certain number of times vs an abstract condition
  // A FL can be more concise than a WL and can even be just one line with no braces.

// What is the difference between a for loop and a for...in loop?
  // A FL can do anything, but a F...I is made for looping through an object's keys

// What is the difference between a while loop and a do...while loop?
  // a WL will check its condition before attempting to execute,
  // but a D...W will execute one time before checking its condition
