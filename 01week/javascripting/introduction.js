// This will show the current date and time

function dateAndTime () {
  const day = 'It is currently ' + new Date();
  return day;
}
console.log(dateAndTime());

// This will convert a number to a String

function newString (num) {
  const resultString = num.toString();
  return resultString;
}
console.log(newString(40));

//  This will convert a string to a number

function newNum (string) {
  const resultNum = Number(string);
  return resultNum;
}
console.log(newNum("45"));

// This will determine the type of each of various variables

function findType (input) {
  console.log(typeof(input));
  return typeof(input);
}
findType("30");
findType(20);
findType(false);
findType(undefined);
findType(null);

// This will add two numbers

function addThese (num1, num2) {
  return num1 + num2;
}
console.log(addThese(4,900));

// This will succeed only if two things are true

function pickyAdder (aNumber, aString) {
  if (aNumber && aString) {
    return "Success";
  }
}
pickyAdder(12, "rattlesnake");

// This will succeed as long as one of its two conditions is true

function lessPicky (firstNum, secNum) {
  if (firstNum || secNum) {
    return "Success";
  }
}
lessPicky(-2, false);

// This will only succeed if none of its conditions evaluate true

function grouchy (aNewString, aNewNull) {
  if (!aNewString && !aNewNull) {
    return "Success";
  }
}
grouchy("", null);
