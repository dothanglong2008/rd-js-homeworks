function reverseNumber(num) {
  const string = num.toString();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  let reversedNum = parseInt(newString, 10) * Math.sign(num);
  return reversedNum;
}

function forEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}

function map(arr, func) {
  let temp = [];
  forEach(arr, function (el) {
    temp.push(func(el));
  });
  return temp;
}

function filter(arr, func) {
  let temp = [];
  forEach(arr, function (el) {
    if (func(el)) {
      temp.push(el);
    }
  });
  return temp;
}

function getAdultAppleLovers(data) {
  const legalAge = 18;
  const filteredData = filter(data, function (el) {
    return el['age'] > legalAge && el['favoriteFruit'] === 'apple';
  });
  return map(filteredData, function (el) {
    return el['name'];
  });
}

function getKeys(obj) {
  let array = [];
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      array.push(property);
    }
  }
  return array;
}

function getValues(obj) {
  let array = [];
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      array.push(obj[property]);
    }
  }
  return array;
}

function showFormattedDate(dateObj) {
  return (
    'It is ' +
    dateObj.getDate() +
    ' of ' +
    dateObj.toLocaleString('default', {
      month: 'short'
    }) +
    ', ' +
    dateObj.getFullYear()
  );
}