import moment from 'moment-jalaali'
import { convertDigitToEnglish } from '../convertDigitToEnglish';


let digit = (data) => {

    let value = data.toString()
    let length = value.length

    if (length === 1) {
        return ('0' + data)
    }
    return data
}


export const data_m = () => {

    var d = new Date(),
        dformat = [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate(),

        ].join('/') + ' ' +
            [
                d.getHours(),
                d.getMinutes(),
                d.getSeconds()
            ].join(':');

    let arr = dformat.split(" ")
    let date = arr[0].split('/')
    let time = arr[1].split(':')



    if (date.length !== 3 || time.length !== 3) {
        return false
    }

    let fulldate = `${date[0]}/${digit(date[1])}/${digit(date[2])} ${digit(time[0]) + ':' + digit(time[1]) + ':' + digit(time[2])}.000000`;

    return fulldate

}


export const dateMiladi = (value) => {

    if (!value) return

    let dformat = moment(value, 'jYYYY/jM/jD HH:mm').format('YYYY/MM/DD')

    return convertDigitToEnglish(dformat)
}


export const timeCurrent = () => {

    let d = new Date()

    return `${digit(d.getHours())}:${digit(d.getMinutes())}:${digit(d.getSeconds()) + '.000000'}`
}

export const dateMiladiToShamsi = (value) => {
    try {
        let equalDate = moment(value, "YYYY/MM/DD").isSame("1970/01/01")
        if (equalDate) {
            return "-"
        }

        if (!value) return

        let dformat = moment(value, 'YYYY/M/D HH:mm').format('jYYYY/jMM/jDD')

        return convertDigitToEnglish(dformat)
    } catch {
        return "-"
    }
}


export const dateConverttShamsiToMiladi = (value) => {

    if (!value) return

    let dformat = moment(value, 'jYYYY/jM/jD HH:mm').format('YYYY/MM/DD')

    return convertDigitToEnglish(dformat)
}


export const convertDateShamsi = (state, array) => {

    let obj = {}
    let res = {}

    Object.keys(state).forEach((item) => {
        array.forEach(name => {
            if (item === name) {
                if (name.includes('to_')) {
                    obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 23:59:59.000000`
                } else {
                    obj[name] = `${convertDigitToEnglish(state[name].format('YYYY/MM/DD'))} 00:00:00.000000`
                }
            } else {
                if (!obj[item])
                    obj[item] = state[item]
            }
        })
    })

    Object.keys(obj).forEach((element) => {
        if (obj[element]) {
            res[element] = obj[element];
        }
    });

    return res
}