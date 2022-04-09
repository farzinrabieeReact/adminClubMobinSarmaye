import { convertDigitToEnglish } from "../convertDigitToEnglish"

export const handeFilterForDate = (state: any, array: any, arrayParamTo: any = []) => {

  let obj: any = {}
  let res: any = {}

  if (!array.length) {
    return state
  }

  Object.keys(state).forEach((item) => {
    array.forEach((name: string) => {
      if (item === name) {
        if (arrayParamTo.includes(name)) {
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
