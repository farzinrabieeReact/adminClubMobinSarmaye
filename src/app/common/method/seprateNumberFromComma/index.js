export function seprateNumberFromComma(num) {
  let number = parseInt(num);
  let str = number.toString();

  if (str.length >= 4) {
    str = str.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  return str;
}

export function sepratePriceFromComma(num) {

  if(!num){
      return " - "
  }
  let str = num.toString().split(".");
  let str2 = null;
  let res = "";


  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1]) {
    if (str[1].length < 2) {
      str2 = str[1];
    } else {
      str2 = str[1].slice(0, 2);
    }
  }
  res = str2 ? `${str[0]}.${str2}` : str[0];
  return res;
}

