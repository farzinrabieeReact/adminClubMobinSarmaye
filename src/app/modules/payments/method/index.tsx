import React from 'react';

export const handelReturned_from_bank = (key:string , flag?:boolean)=>{
    switch (key) {
      case 'TRUE':
        return 'دارد';
      case 'FALSE':
        if(flag){
          return 'ندارد'
        }
        return <p style={{color:'red'}}>ندارد</p>;
      default:
        return '-';
    }
  }

  export const handelIs_verified = (key:string , flag?:boolean)=>{
    switch (key) {
      case 'TRUE':
        return 'تایید شده';
      case 'FALSE':
        if(flag){
          return 'تایید نشده'
        }
        return <p style={{color:'red'}}>تایید نشده</p>;
      default:
        return '-';
    }
  }

  export const handelTerminal_id = (key:number)=>{
    switch (key) {
      case 1:
        return 'به پرداخت بانک ملت ';
      case 2:
        return 'ایران کیش';
      case 3:
        return 'بانک سامان';
      default:
        return '-';
    }
  }