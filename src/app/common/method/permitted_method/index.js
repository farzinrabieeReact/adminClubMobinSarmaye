



export const permitted_methods = (value) => {
  // let member_permitted_methods = "CLUB FEEDBACK\\..* CLUBMEMBER\\.select BONUS\\.select"
  // let member_permitted_methods = "CLUB .*"
  if (!value) {
    return "CLUB null"
  }

  // let member_permitted_methods = "CLUB .\.select."
  let member_permitted_methods_split = value.split(" ")

  let regexRes = ""
  member_permitted_methods_split
    .filter((item, ind) => ind !== 0)
    .forEach((item, ind) => {

      if (ind === 0) {
        regexRes += `(${item.split('\\.')[0]})`

        if (item === "CLUBMEMBER\\.permisson_manager") {
          if (!regexRes.includes("permisson_manager"))
            regexRes += `|(permisson_manager)`
        }

        return
      }
      regexRes += `|(${item.split('\\.')[0]})`

      if ( item === "CLUBMEMBER\\.permisson_manager") {
        if (!regexRes.includes("permisson_manager")){
          regexRes += `|(permisson_manager)`

        }
      }

    })

  return regexRes
}
