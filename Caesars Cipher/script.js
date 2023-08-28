function rot13(str) {
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const newStrArr = str.toUpperCase().split('');
  let newArr = [];
  newStrArr.forEach((character, index) => {
    if (/^[a-zA-Z]+$/.test(character)) {
      if (alpha.indexOf(character) + 13 > alpha.length - 1 && character !== "Z") {
        newArr.push(alpha[alpha.indexOf(character) - 13]);
      } else if (character === 'Z') {
        newArr.push(alpha[12]);
      } else if (alpha.indexOf(character) - 13 === -1) {
        newArr.push(alpha[alpha.length - 1]);
      }
      else {
        newArr.push(alpha[alpha.indexOf(character) + 13]);
      }


    } else {
      newArr.push(character);
    }
  });
  return newArr.join('');
}
let phrase = prompt("Type in phrase to decode!");
alert(rot13(phrase));
// console.log(rot13("SERR PBQR PNZC"));
// console.log(rot13("SERR CVMMN!"));