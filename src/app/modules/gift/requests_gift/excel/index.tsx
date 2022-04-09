import React, { useEffect, useState } from "react";
import Excel from "../../../../common/components/Excel";
import { useSelector } from "react-redux";
import { handeFilterForDate } from "../../../../common/method/handeFilterForDate";

interface elem {
  stateFilter: any;
  Head: any;
}

function Convertnumber2english(str: any) {
  str = str.replaceAll("۰", "0");
  str = str.replaceAll("۱", "1");
  str = str.replaceAll("۲", "2");
  str = str.replaceAll("۳", "3");
  str = str.replaceAll("۴", "4");
  str = str.replaceAll("۵", "5");
  str = str.replaceAll("۶", "6");
  str = str.replaceAll("۷", "7");
  str = str.replaceAll("۸", "8");
  str = str.replaceAll("۹", "9");

  return str;
}

const handleItem = (customData: any): any => {
  let obj: any = {};
  let data = customData?.map((item: any) => {
    switch (item.name) {
      case "phoneNumber":
        return (obj["phone"] = Convertnumber2english(item.value));
      case "mobile":
        return (obj["phone"] = Convertnumber2english(item.value));
      case "provinceName":
        return (obj["provinceName"] = item.value);
      case "cityName":
        return (obj["cityName"] = item.value);
      case "postalCode":
        return (obj["postCode"] = item.value);
      case "personName":
        return (obj["personName"] = item.value);
      case "address":
        return (obj["address"] = item.value);
      case "instrumentName":
        return (obj["instrumentName"] = item.value);
      default:
        return {};
    }
  });

  return obj;
};

export default function Index({ stateFilter, Head }: elem) {
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const [handlestateFilter, sethandlestateFilter] = useState<any>({});

  useEffect(() => {
    let res = handeFilterForDate(
      stateFilter,
      [
        "registration_date_from",
        "registration_date_to",
        "closing_date_from",
        "closing_date_to"
      ],
      ["closing_date_to", "registration_date_to"]
    );
    sethandlestateFilter(res);
  }, [stateFilter]);

  let headerPrimary = Head.map((item: any) => {
    if (item.id === 1) {
      return {
        label: item.label,
        key: "row"
      };
    }

    return {
      label: item.label,
      key: item.title
    };
  });

  let headCustomData = [
    { label: "نام سهم", key: "instrumentName" },
    { label: "نام گیرنده", key: "personName" },
    { label: "شماره موبایل", key: "phone" },
    { label: "استان", key: "provinceName" },
    { label: "شهر", key: "cityName" },
    { label: "آدرس", key: "address" },
    { label: "کد پستی", key: "postCode" }
  ];

  let headers = [...headerPrimary, ...headCustomData];

  const handleExcelData = () => {
    let { data } = stateReducerExcel;
    let arr: any = [];
    for (let i = 0; i < data.length; i++) {
      let obj: any = {};
      obj["row"] = i + 1;
      for (let j = 0; j < Head.length; j++) {
        let value = data[i]["body"][Head[j]["title"]];
        let valueWithFormat = Head[j].format ? Head[j].format(value) : value;
        if (Head[j].title) {
          obj[Head[j].title] = valueWithFormat;
        }
      }
      try {
        obj = {
          ...obj,
          ...handleItem(JSON.parse(data[i].body?.gift_custom_data))
        };
      } catch {
        obj = {
          ...obj
        };
      }
      arr.push(obj);
    }

    return arr;
  };

  return (
    <Excel
      headers={headers}
      handleExcelData={handleExcelData}
      stateFilter={handlestateFilter}
      methodType={"select_registrations"}
      tableApi={"gift"}
      filename={"select_registrations"}
      methodType2={null}
      valueTab={0}
    />
  );
}
