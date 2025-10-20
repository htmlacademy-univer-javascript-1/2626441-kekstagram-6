let checkLengthString = function (stringToCheck, requiredLength) {
  return !(stringToCheck.length > requiredLength);
};

console.log(checkLengthString('hjvs', 3));

let isPalindrome = function (stringToCheck) {
  stringToCheck = stringToCheck.replaceAll(' ', '');
  stringToCheck = stringToCheck.toLowerCase();
  let palindrome = '';
  for (let i = (stringToCheck.length - 1); i >= 0; i -= 1) {
      palindrome += stringToCheck[i];
  }

  return stringToCheck === palindrome;
};

console.log(isPalindrome('Лёша на полке клопа нашёл '));

let toIntegerNumber = function (toNumber) {
  let stringToNumber = '';
  for (let i = 0; i < toNumber.length; i+=1) {
    if (toNumber[i] >= '0' && toNumber[i] <= '9') {
      stringToNumber += toNumber[i];
    }
  }
  return parseInt(stringToNumber);
};

console.log(toIntegerNumber('-1.5'));
