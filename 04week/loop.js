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
