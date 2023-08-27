function convertToRoman(num) {
  if (num == 0) return 'nulla';
  const numArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let newNum = num;
  let newStr = [];
  for (let i = 0; i < numArr.length; i++) {
    let element = numArr[i];
    if (newNum - element >= 0) {
      newStr.push(romArr[i]);
      newNum -= element;
      i = -1;

    }
  }
  console.log(newStr.join(''))
  return newStr.join('');

}
let number = prompt('Type in a number and convert to a roman numeral!');
alert(convertToRoman(number));