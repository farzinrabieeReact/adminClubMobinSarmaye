import React, { useState } from "react";
import { export_excel_anbar_actions } from "../../../../../redux/gift/requestGift_select/exportExcelAnbar";
import { handeFilterForDate } from "../../../../common/method/handeFilterForDate";
import { handleNotificationAlertTrySelect } from "../../../../common/method/handleNotificationAlert";
import * as XLSX from "xlsx";
import { handleNull, handleStatus } from "../../../../common/method/displayData";
import moment from "moment-jalaali"
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import { Button, CircularProgress } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';


interface elem {
  stateFilter: any;
  sort: any
}

let headerExcel: any = [
  { label: convertDigitToEnglish(moment(new Date()).format("jYYYY.jMM.jDD")), id: "gift_name", display: handleNull },
  { label: "کد کالا", id: "gift_code", display: handleNull },
  { label: "وضعیت", id: "status", display: handleStatus },
  { label: "تعداد", id: "count", display: handleNull },
];

export default function Index({ stateFilter, sort }: elem) {
  const [loading, setloading] = useState(false)

  const checkDisable = () => {
    if (!stateFilter.closing_date_from || !stateFilter.closing_date_to) {
      return true
    }
    if (stateFilter.status !== "SUBMITTED" && stateFilter.status !== "FINALIZED") {
      return true
    }
    if (stateFilter.gift_type !== "PHYSICAL") {
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

  const exportIvoice = (rows = []) => {
    const emptyErrorForHead = (value: any) => {
      if (value) return value;
      return {};
    };

    let sortRow: any = rows.sort((a: any, b: any): any => {
      let x = a.body.gift_name;
      let y = b.body.gift_name;
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })

    let arr: any = []
    let lastName: string = ""
    for (let i: any = 0; i < sortRow.length; i++) {
      if (lastName === sortRow[i].body.gift_name) {
        arr[arr.length - 1]["count"] = arr[arr.length - 1].count + 1

        if (arr[arr.length - 1]["status"] === sortRow[i].body.status) {
          arr[arr.length - 1]["status"] = sortRow[i].body.status
        } else {
          arr[arr.length - 1]["status"] = "-"
        }

        continue;
      }

      arr.push({ count: 1, ...sortRow[i].body })

      lastName = sortRow[i].body.gift_name
    }

    let arrWithTotal = [...arr, { count: sumCount(arr), gift_name: "Grand Total" }]

    let dateForExport = [];
    for (let i = 0; i < arrWithTotal.length; i++) {
      let objDate = {};
      for (let j = 0; j < headerExcel.length; j++) {
        let value = arrWithTotal[i][headerExcel[j]["id"]];

        objDate = {
          ...objDate,
          [headerExcel[j]["label"]]: headerExcel[j]?.display ? headerExcel[j].display(value) : value,
        };
      }
      dateForExport.push(objDate);
    }


    const wb = XLSX.utils.book_new(); // book
    const ws1 = XLSX.utils.json_to_sheet(dateForExport, {
      header: Object.keys(emptyErrorForHead(dateForExport[0])),

    }); // sheet
    XLSX.utils.book_append_sheet(wb, ws1, "انبار"); //  sheet name
    XLSX.writeFile(wb, "انبار.xlsx");
  };

  // "فیلتر وضعیت، تاریخ های بسته شدن اجباری است و نوع جایزه باید تحویل فیزیکی باشد."
  return (
    <>
      <Tooltip arrow title={
        <div>
          <p className="font-weight-bolder">شرایط فعال شدن دکمه</p>
          <p>تاریخ های بسته شدن فیلتر شود</p>
          <p>نوع جایزه تحویل فیزیکی یا در انتظار باشد</p>
          <p>وضعیت جایزه نهایی شده باشد</p>
        </div>
      }
        placement="bottom-start">
        <span>
          <Button
            className={`btnsGreen ml-2 ${checkDisable() || loading ? "disabledItems" : ""}`}
            disabled={checkDisable() || loading}
            onClick={clickExport}
          >
            <span>انبار</span>
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