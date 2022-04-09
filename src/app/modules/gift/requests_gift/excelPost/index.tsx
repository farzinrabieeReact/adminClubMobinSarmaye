import React, { useState } from "react";
import { export_excel_anbar_actions } from "../../../../../redux/gift/requestGift_select/exportExcelAnbar";
import { handeFilterForDate } from "../../../../common/method/handeFilterForDate";
import { handleNotificationAlertTrySelect } from "../../../../common/method/handleNotificationAlert";
import * as XLSX from "xlsx";
import { handleNull } from "../../../../common/method/displayData";
import { Button, CircularProgress } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';


interface elem {
  stateFilter: any;
  sort: any
}

let headerExcel: any = [
  { label: "شماره سفارش", id: "basket_code", display: handleNull },
  { label: "نام گیرنده", id: "member_first_name", display: handleNull },
  { label: "کد کالا", id: "gift_code", display: handleNull },
  { label: "گروه", id: "gift_sub_category", display: handleNull },
  { label: "برند", id: "brand", display: handleNull },
  { label: "عنوان جایزه", id: "gift_name", display: handleNull },
];

export default function Index({ stateFilter, sort }: elem) {
  const [loading, setloading] = useState(false)

  const checkDisable = () => {
    if (!stateFilter.closing_date_from || !stateFilter.closing_date_to) {
      return true
    }
    if (stateFilter.status !== "FINALIZED") {
      return true
    }
    if (stateFilter.gift_type !== "PHYSICAL") {
      return true
    }
    if (!sort.hasOwnProperty("member_national_id")) {
      return true
    }

    return false
  }

  const clickExport = () => {
    setloading(true)
    let res = handeFilterForDate(stateFilter, [
      "registration_date_from",
      "registration_date_to",
      "closing_date_from",
      "closing_date_to"
    ],
      ["closing_date_to", "registration_date_to"]
    );

    let { id, ...sortRes }: any = sort;

    export_excel_anbar_actions({ data: res, sort_by: sortRes })
      .then((res) => {
        if (handleNotificationAlertTrySelect(res)) {
          exportIvoice(res.data.response.data.results);
        }
      })
      .finally(() => {
        setloading(false)
      });
  };

  const exportIvoice = (rows: any) => {
    const emptyErrorForHead = (value: any) => {
      if (value) return value;
      return {};
    };


    let dateForExport = [];
    let value = ""
    let checkFirstname = ""
    let flag = true;
    // let giftCodeInOneBasket: any = []
    for (let i = 0; i < rows.length; i++) {
      let objDate = {};
      for (let j = 0; j < headerExcel.length; j++) {

        if (headerExcel[j]["id"] === "member_first_name") {
          value = rows[i]["body"][headerExcel[j]["id"]] + " " + rows[i]["body"]["member_last_name"];
          if (value && checkFirstname === rows[i]["body"][headerExcel[j]["id"]] + " " + rows[i]["body"]["member_last_name"]) {
            flag = true
          } else {
            flag = false
          }
          checkFirstname = rows[i]["body"][headerExcel[j]["id"]] + " " + rows[i]["body"]["member_last_name"];
        }
        // else if (headerExcel[j]["id"] === "gift_code") {
        //   console.log("giftCodeInOneBasket", giftCodeInOneBasket)
        //   value = giftCodeInOneBasket.includes(rows[i]["body"][headerExcel[j]["id"]]) ? "*" : rows[i]["body"][headerExcel[j]["id"]];
        //   if (flag) {
        //     let valGiftCode = rows[i]["body"][headerExcel[j]["id"]]
        //     let valGidtCodeFinal = !valGiftCode || valGiftCode === "null" ? "" : rows[i]["body"][headerExcel[j]["id"]]
        //     valGidtCodeFinal && giftCodeInOneBasket.push(valGidtCodeFinal)
        //   } else {
        //     giftCodeInOneBasket = []
        //   }
        // }
        else {
          value = rows[i]["body"][headerExcel[j]["id"]];
        }

        objDate = {
          ...objDate,
          [headerExcel[j]["label"]]: headerExcel[j]?.display ? headerExcel[j].display(value) : value,
        };
      }
      if (flag) {
        dateForExport.push(objDate);
      } else {
        if (i !== 0) {
          dateForExport.push({});
        }
        dateForExport.push(objDate);
      }
    }


    const wb = XLSX.utils.book_new(); // book
    const ws1 = XLSX.utils.json_to_sheet(dateForExport, {
      header: Object.keys(emptyErrorForHead(dateForExport[0])),

    }); // sheet
    XLSX.utils.book_append_sheet(wb, ws1, "پست"); //  sheet name
    XLSX.writeFile(wb, "پست.xlsx");
  };
  // فیلتر تاریخ های بسته شدن اجباری است، نوع جایزه باید تحویل فیزیکی باشد و وضعیت باید نهایی باشد.
  return (
    <>
      <Tooltip arrow title={
        <div>
          <p className="font-weight-bolder">شرایط فعال شدن دکمه</p>
          <p>تاریخ های بسته شدن فیلتر شود</p>
          <p>نوع جایزه تحویل فیزیکی باشد</p>
          <p>جایزه نهایی شده باشد</p>
          <p>کد ملی sort شود</p>
        </div>
      } placement="bottom-start">
        <span>
          <Button
            className={`btnsGreen ml-2 ${checkDisable() || loading ? "disabledItems" : ""}`}
            disabled={checkDisable() || loading}
            onClick={clickExport}
          >
            <span>پست</span>
            {loading && <CircularProgress className="ml-1" size={15} />}
          </Button>
        </span>
      </Tooltip>
    </>
  );
}




const sumCount = (arr: any) => {
  return arr.reduce(function (acc: any, obj: any): any { return acc + obj.count; }, 0)
}