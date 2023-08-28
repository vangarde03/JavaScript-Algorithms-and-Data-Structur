function checkCashRegister(price, cash, cid) {
  let returnObj = {
    status: 'OPEN',
    change: []
  };
  let change = cash - price;
  let total = calcRegisterTotal(cid);
  let billsRegister = billsCalculator(cid);
  if (total < change) {
    returnObj.status = "INSUFFICIENT_FUNDS";
  }
  else if (total === change) {
    returnObj.status = "CLOSED";
    returnObj.change = cid;
  }
  else if (total > change) {
    returnObj.status = "OPEN";
    let changeNum = convertToBills(change, billsRegister);
    if (changeNum.length === 0) {
      returnObj.status = "INSUFFICIENT_FUNDS";
    } else {
      returnObj.change = changeNum;
    }

  }
  return returnObj;
}


function calcRegisterTotal(cid) {
  let total = 0;
  total = cid.reduce((acc, arrElem) => {
    let amount = arrElem[1];
    return acc += amount;
  }, 0);
  total = Math.round(100 * total) / 100;
  return total;
}



function convertToBills(change, billsInRegister) {
  let billRegister = billsInRegister;
  const amountsArr = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const unitsArr = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];
  let changeAmount = {
    'PENNY': 0,
    'NICKEL': 0,
    'DIME': 0,
    'QUARTER': 0,
    'ONE': 0,
    'FIVE': 0,
    'TEN': 0,
    'TWENTY': 0,
    'ONE HUNDRED': 0,
  };
  let newChange = change;
  let brokenDown = [];
  let notEnough = false;
  for (let i = 0; i < amountsArr.length; i++) {
    newChange = Math.round(100 * newChange) / 100;

    let element = amountsArr[i];
    let element2 = unitsArr[i];
    if (newChange - element >= 0) {

      billsInRegister[element2] -= 1;
      notEnough = checker(billsInRegister, element2);

      if (!notEnough) {
        brokenDown.push(element);

        newChange -= element;
        i = -1;
      } else {
        billsInRegister[element2] += 1;
        continue;
      }
    } else {
      continue;
    }
  }



  let notEnoughBills = false;

  brokenDown.map(elem => {
    switch (elem) {
      case 0.01:
        changeAmount['PENNY'] += elem;
        billRegister['PENNY'] -= 1;
        notEnoughBills = checker(billRegister, 'PENNY');
        break;
      case 0.05:
        changeAmount['NICKEL'] += elem;
        billRegister['NICKEL'] -= 1;
        notEnoughBills = checker(billRegister, 'NICKEL');
        break;
      case 0.10:
        changeAmount['DIME'] += elem;
        billRegister['DIME'] -= 1;
        notEnoughBills = checker(billRegister, 'DIME');
        break;
      case 0.25:
        changeAmount['QUARTER'] += elem;
        billRegister['QUARTER'] -= 1;
        notEnoughBills = checker(billRegister, 'QUARTER');
        break;
      case 1:
        changeAmount['ONE'] += elem;
        billRegister['ONE'] -= 1;
        notEnoughBills = checker(billRegister, 'ONE');
        break;
      case 5:
        changeAmount['FIVE'] += elem;
        billRegister['FIVE'] -= 1;
        notEnoughBills = checker(billRegister, 'FIVE');
        break;
      case 10:
        changeAmount['TEN'] += elem;
        billRegister['TEN'] -= 1;
        notEnoughBills = checker(billRegister, 'TEN');
        break;
      case 20:
        changeAmount['TWENTY'] += elem;
        billRegister['TWENTY'] -= 1;
        notEnoughBills = checker(billRegister, 'TWENTY');
        break;
      case 100:
        changeAmount['ONE HUNDRED'] += elem;
        billRegister['ONE HUNDRED'] -= 1;
        notEnoughBills = checker(billRegister, 'ONE HUNDRED');
    }

  });
  let changeAmtArr = Object.keys(changeAmount).map(function (k) { return [k, changeAmount[k]] });
  changeAmtArr = changeAmtArr.filter(elem => {
    if (elem[1] !== 0) return elem;
  });
  changeAmtArr.reverse();
  if (notEnoughBills) {
    return [];
  } else {
    return changeAmtArr;
  }

}

function checker(billRegister, billUnit) {
  let billObj = billRegister;
  if (billObj[billUnit] < 0) {
    return true;
  } else {
    return false;
  }
}



function billsCalculator(cid) {
  let billNums = {
    'PENNY': 0,
    'NICKEL': 0,
    'DIME': 0,
    'QUARTER': 0,
    'ONE': 0,
    'FIVE': 0,
    'TEN': 0,
    'TWENTY': 0,
    'ONE HUNDRED': 0,
  };
  cid.forEach(arrElem => {
    let [currencyUnit, amount] = [...arrElem];
    let tempNum = 0;
    switch (currencyUnit) {
      case 'PENNY':
        tempNum = Math.round(amount / 0.01);
        billNums[currencyUnit] += tempNum;
        break;
      case 'NICKEL':
        tempNum = Math.round(amount / 0.05);
        billNums[currencyUnit] += tempNum;
        break;
      case 'DIME':
        tempNum = Math.round(amount / 0.1);
        billNums[currencyUnit] += tempNum;
        break;
      case 'QUARTER':
        tempNum = Math.round(amount / 0.25);
        billNums[currencyUnit] += tempNum;
        break;
      case 'ONE':
        tempNum = Math.round(amount / 1);
        billNums[currencyUnit] += tempNum;
        break;
      case 'FIVE':
        tempNum = Math.round(amount / 5);
        billNums[currencyUnit] += tempNum;
        break;
      case 'TEN':
        tempNum = Math.round(amount / 10);
        billNums[currencyUnit] += tempNum;
        break;
      case 'TWENTY':
        tempNum = Math.round(amount / 20);
        billNums[currencyUnit] += tempNum;
        break;
      case 'ONE HUNDRED':
        tempNum = Math.round(amount / 100);
        billNums[currencyUnit] += tempNum;
    }
  });
  return billNums;
}


console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
alert("Check the console and the script to see the project in action!");