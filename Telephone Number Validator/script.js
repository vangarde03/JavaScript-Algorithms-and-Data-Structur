function telephoneCheck(str) {
  const strArr = str.split('').filter(element => /[0-9]/.test(element));
  let openCount = 0;
  let closeCount = 0;
  for (let letters of str) {
    if (letters === '(') openCount += 1;
    if (letters === ')') closeCount += 1;
  }
  let booleanVal = (openCount === 1 && closeCount === 1) || (closeCount === 0 && openCount === 0)
  if (strArr.length === 10) {
    if ((/^\([0-9]{3}\)/.test(str) || /^[0-9]{3}/.test(str)) && openCount === closeCount && booleanVal) {
      return true;
    } else {
      return false;
    }

  } else if (strArr.length === 11 && str[0] === '1') {
    if ((/\([0-9]{3}\)/.test(str) || /[0-9]{3}/.test(str)) && openCount === closeCount && booleanVal) {
      return true;
    } else {
      return false;
    }
  }

  else {
    return false;
  }


}
let number = prompt("Type US phone number!");
alert(telephoneCheck(number));


// console.log(telephoneCheck("555-555-5555"));
// telephoneCheck("1 555-555-5555")
