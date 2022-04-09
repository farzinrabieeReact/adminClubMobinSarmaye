
export const handelType = (key: string, flag?: boolean) => {

  switch (key) {
    case 'seven_day_login':
      return 'هفت روز لاگین متوالی';
    default:
      return key;
  }
}


export const TypeLottery =[
  {title:'هفت روز لاگین متوالی' , value:'seven_day_login'}
]