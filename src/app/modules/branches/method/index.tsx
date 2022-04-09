
export const handelIsActive = (key: string,) => {

  switch (key) {
    case 'TRUE':
      return 'فعال';
    case 'FALSE':
      return 'غیر فعال'
    default:
      return '-';
  }
}


export const handelIsBranch = (key: string,) => {

  switch (key) {
    case 'TRUE':
      return 'شعبه';
    case 'FALSE':
      return 'نمایندگی'
    default:
      return '-';
  }
}


export const handelIsMainBranch = (key: string,) => {

  switch (key) {
    case 'TRUE':
      return 'شعبه مرکزی';
    default:
      return '-';
  }
}

