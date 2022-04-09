import React from 'react';

export const handelIs_active = (key:string , flag?:boolean)=>{
    switch (key) {
      case 'TRUE':
        return 'فعال';
      case 'FALSE':
        if(flag){
          return 'غیرفعال'
        }
        return <p style={{color:'red'}}>غیرفعال</p>;
      default:
        return '-';
    }
  }

export const handelType = (key:string , flag?:boolean)=>{

  return key
    switch (key) {
      case 'TRUE':
        return 'تکنیکال';
      case 'FALSE':
        if(flag){
          return 'بنیادی'
        }
        return <p style={{color:'red'}}>بنیادی</p>;
      default:
        return '-';
    }
  }

