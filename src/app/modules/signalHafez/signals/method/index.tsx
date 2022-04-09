import React from 'react';

export const handelIs_active = (key: string, flag?: boolean) => {
  switch (key) {
    case 'TRUE':
      return 'فعال';
    case 'FALSE':
      if (flag) {
        return 'غیرفعال'
      }
      return <span style={{ color: 'red' }}>غیرفعال</span>;
    default:
      return '-';
  }
}

export const handelType = (key: string, flag?: boolean) => {

  switch (key) {
    case 'Technical':
      return 'تکنیکال';
    case 'Fundamental':
      return 'بنیادی'
    case 'Technical-Fundamental':
      return 'تکنیکال-بنیادی'
    default:
      return key;
  }
}

