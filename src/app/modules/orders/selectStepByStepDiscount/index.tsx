import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableRow from "./tableRow/index";
import Drawer from "../../../common/components/drawer";
import Table from "../../../common/components/componentCustomTable/index";
import { actionTypes } from "./../../../../redux/Orders/oerders_v1_select_stepByStepDiscount";

import { makeStyles } from "@material-ui/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LinearProgress } from "@material-ui/core";
import { handleNumber } from "../../../common/method/displayData";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import Excel from "./excel/index";

interface Pagination {
  number: number;
  count: number;
}

let useStles = makeStyles({
  head_step: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5px 0"
  },
  iconRefresh: {
    cursor: "pointer",
    margin: "0px 10px"
  }
});

export default function Index() {
  let classes = useStles();

  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.select_StepByStepDiscount_reducer
  );

  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },
    {
      id: 2,
      label: "نام",
      title: "member_first_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "نام خانوادگی",
      title: "member_last_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "کدملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "مقدار تخفیف",
      title: "bonus_value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "تاریخ",
      title: "date_time",
      active: false,
      type: "date",
      format: (data: any) => checkDate(data)
    },
    {
      id: 5,
      label: "نوع سهام",
      title: "instrument_type",
      active: false,
      type: "option",
      option: [
        { title: "تسهیلات مسکن", value: "MORTGAGE" },
        { title: "صندوق سرمایه‌گذاری قابل معامله", value: "ETF" },
        { title: "اوراق قرضه", value: "BOND" },
        { title: "اختیار", value: "OPTION" },
        { title: "فرابورس", value: "IFB" },
        { title: "بورس", value: "TSE" },
        { title: "آتی", value: "FUTURE" },
        { title: "انرژی", value: "ENERGY" },
        { title: "کالا", value: "IME" },
        { title: "اوراق بهادار", value: "STOCK" }
      ],
      format: (data: any) => checkInstrumentType(data)
    },
    {
      id: 5,
      label: "آنلاین",
      title: "is_online",
      active: false,
      type: "option",
      option: [
        { title: "باشد", value: "True" },
        { title: "نباشد", value: "False" }
      ],
      format: (data: any) => checkOnline(data)
    },
    {
      id: 8,
      label: "کد حساب",
      title: "member_account_code",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "وضعیت",
      title: "state",
      active: false,
      type: "option",
      option: [
        { title: "در انتظار", value: "NOT_PROCESSED" },
        { title: "ثبت شده", value: "SUBMITTED" },
        { title: "رد شده", value: "REJECTED" }
      ],
      format: (data: any) => checkState(data)
    },
    {
      id: 9,
      label: "مجموع کمیسیون کارگزاری",
      title: "total_broker_commission",
      active: false,
      type: "number",
      format: (data: any) => checkPrice(data)
    },
    {
      id: 9,
      label: "مجموع مقدار",
      title: "total_value",
      active: false,
      type: "number",
      format: (data: any) => checkPrice(data)
    }
  ];
  let headersTable = [
    {
      id: 10,
      label: "از تاریخ",
      title: "date_time_from",
      active: true,
      type: "date"
    },
    {
      id: 11,
      label: "تا تاریخ ",
      title: "date_time_to",
      active: true,
      type: "date"
    }
  ];
  const [headTable, setHeadTable] = useState<any>([]);
  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headersTable];
    });
  }, []);
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    obj = handeFilterForDate(
      obj,
      ["date_time_from", "date_time_to"],
      ["date_time_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: actionTypes.selecStepByStepDiscountAsync,
      payload: _data
    });
  };

  const checkInstrumentType = (value: any) => {
    switch (value) {
      case "MORTGAGE":
        return "تسهیلات مسکن";
      case "ETF":
        return "صندوق سرمایه‌گذاری قابل معامله";
      case "BOND":
        return "اوراق قرضه";

      case "OPTION":
        return "اختیار";

      case "IFB":
        return "فرابورس";

      case "TSE":
        return "بورس";

      case "FUTURE":
        return "آتی";

      case "ENERGY":
        return "انرژی";

      case "IME":
        return "کالا";

      case "STOCK":
        return "اوراق بهادار";

      default:
        return "-";
    }
  };

  const checkOnline = (value: any) => {
    if (!value || value === "null") {
      return "-";
    }
    let lowerValue = value.toLowerCase();
    switch (lowerValue) {
      case "true":
        return "می باشد";
      case "false":
        return <span style={{ color: "red" }}>نمی باشد</span>;
      default:
        return "-";
    }
  };

  const checkOnlineExel = (value: any) => {
    if (!value || value === "null") {
      return "-";
    }
    let lowerValue = value.toLowerCase();
    switch (lowerValue) {
      case "true":
        return "می باشد";
      case "false":
        return "نمی باشد";
      default:
        return "-";
    }
  };

  const checkState = (value: any) => {
    switch (value) {
      case "NOT_PROCESSED":
        return "در انتظار";
      case "SUBMITTED":
        return "ثبت شده";
      case "REJECTED":
        return "رد شده";
      default:
        return "-";
    }
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const checkPrice = (value: any) => {
    if (!value || value === "null") {
      return "-";
    }
    // return value
    return parseFloat(value.toFixed(2)).toLocaleString("en-US");
  };

  const checkDate = (value: any) => {
    return value ? dateMiladiToShamsi(value.split(" ")[0]) : "-";
  };

  const handelRefresh = () => {
    setSort({});
    setStateTable({ date_time: null });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  // const handelData = (state: any, array: any) => {
  //   let obj: any = {};
  //   let res: any = {};
  //
  //   Object.keys(state).forEach(item => {
  //     array.forEach((name: string) => {
  //       if (item === name) {
  //         if (name.includes("to_")) {
  //           obj[name] = `${convertDigitToEnglish(
  //             state[name].format("YYYY/MM/DD")
  //           )} 23:59:59.000000`;
  //         } else {
  //           obj[name] = `${convertDigitToEnglish(
  //             state[name].format("YYYY/MM/DD")
  //           )} 00:00:00.000000`;
  //         }
  //       } else {
  //         if (!obj[item]) obj[item] = state[item];
  //       }
  //     });
  //   });
  //
  //   Object.keys(obj).forEach(element => {
  //     if (obj[element]) {
  //       res[element] = obj[element];
  //     }
  //   });
  //
  //   return res;
  // };

  return (
    <>
      <div className={classes["head_step"]}>
        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={headTable.filter((itm: any, ind: any) => ind !== 5)}
          stateFilter={{
            date_time_from: null,
            date_time_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      {stateReducer.loading && <LinearProgress />}
      <div style={{ paddingTop: !stateReducer.loading ? "4px" : "0px" }}>
        <Table
          height={"tab"}
          head={head}
          filterTable={stateTable}
          setFilterTable={setStateTable}
          sort={sort}
          setSort={setSort}
          pagnation={pagnation}
          setPagnation={setPagnation}
          submitTable={submitTable}
          setflagApi={setflagApi}
        >
          {state.map((item: any, index: any) => {
            return (
              <TableRow
                item={item}
                head={head}
                index={index}
                pagnation={pagnation}
                stateReducer={stateReducer}
              />
            );
          })}
        </Table>
      </div>
    </>
  );
}
