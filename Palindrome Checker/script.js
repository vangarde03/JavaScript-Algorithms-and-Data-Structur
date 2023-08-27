function palindrome(str) {
  let newArr = [];
  newArr = str.split('').filter(letter => /^[a-zA-Z0-9]+$/.test(letter));
  let newStr = newArr.join('').toLowerCase();
  let booleanVal = true;
  console.log(newStr)
  for (let i = 0; i < newStr.length; i++) {

    if (!(newStr[i] === newStr[newStr.length - 1 - i])) {
      booleanVal = false;
    }
  }
  return booleanVal;
}


let word = prompt("Type in a word to check if it's a palindrome!!");
alert(palindrome(word));

