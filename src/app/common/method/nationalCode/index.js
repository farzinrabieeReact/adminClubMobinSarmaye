export function checkNationalCode(meli_code) {
    if (meli_code.length === 10) {
        if (meli_code === '1111111111' || meli_code === '2222222222' || meli_code === '3333333333' || meli_code === '4444444444' || meli_code === '5555555555' || meli_code === '6666666666' || meli_code === '7777777777' || meli_code === '8888888888' || meli_code === '9999999999') {
        } else {
            let c = parseInt(meli_code.charAt(9));
            let n = parseInt(meli_code.charAt(0)) * 10 + parseInt(meli_code.charAt(1)) * 9 + parseInt(meli_code.charAt(2)) * 8 + parseInt(meli_code.charAt(3)) * 7 + parseInt(meli_code.charAt(4)) * 6 + parseInt(meli_code.charAt(5)) * 5 + parseInt(meli_code.charAt(6)) * 4 + parseInt(meli_code.charAt(7)) * 3 + parseInt(meli_code.charAt(8)) * 2;
            let r = n - parseInt(n / 11) * 11;
            if ((r === 0 && r === c) || (r === 1 && c === 1) || (r > 1 && c === 11 - r)) {
                return true
            }
            else {
                return false
            }
        }
    }
}

export function checkNationalCodeLegal(nationalCode) {

    if (nationalCode == null)
        return false;
    if (!nationalCode)
        return false;
    if (nationalCode.length > 10)
        return false;
    if (nationalCode.length < 0)
        return false;
    if (!nationalCode.match(/[0-9]+/g))
        return false;

    let nationalCodeWithoutControlDigit = nationalCode.substring(0, nationalCode.length - 1);
    let controlDigit = nationalCode.substring(nationalCode.length - 1, nationalCode.length);
    let deci = nationalCode.substring(nationalCode.length - 2, nationalCode.length - 1);
    let decimal = +deci + 2;
    let multiplier = [29, 27, 23, 19, 17, 29, 27, 23, 19, 17];
    let sum = 0;



    let array = nationalCodeWithoutControlDigit.split('')

    for (let i = 0; i < array.length; i++) {
        let temp = (+("" + array[i]) + decimal) * multiplier[i];
        sum += temp;
    }


    let modBy11 = sum % 11;
    if (modBy11 === 10) {
        modBy11 = 0;
    }

    if (modBy11 === +controlDigit)
        return true;

    return false;
}