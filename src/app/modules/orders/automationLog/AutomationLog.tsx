import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "./tableRow/index";
import { useDispatch, useSelector } from "react-redux";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { handleNull, handleNumber } from "../../../common/method/displayData";
import { makeStyles } from "@material-ui/styles";
import { actionTypes as actionTypesAutomationLog } from "../../../../redux/Orders/automationLog";
import Excel from "./excel/index";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer";
import { LinearProgress } from "@material-ui/core";

interface Pagination {
  number: number;
  count: number;
}
let useStles = makeStyles({
  head: {
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
const AutomationLog = () => {
  const stateReducer = useSelector(
    (state: any) => state.automationLog_Select_Reducer
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
      label: "نام ",
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
      label: "کد ملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "امتیاز",
      title: "bonus_value",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "تاریخ",
      title: "date_time",
      active: true,
      type: "date",
      format: (data: any) => dateMiladiToShamsi(data)
    },
    {
      id: 7,
      label: "نوع سهام",
      title: "instrument_type",
      active: false,
      type: "option",
      format: (data: any) => findType(data),
      option: [
        { title: "اوراق بهادار", value: "STOCK" },
        { title: "آتی", value: "FUTURE" },
        { title: "انرژی", value: "ENERGY" },
        { title: "کالا", value: "IME" }
      ]
    },
    {
      id: 8,
      label: "کد تفصیلی",
      title: "member_account_code",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "وضعیت",
      title: "state",
      active: false,
      type: "option",
      format: (data: any) => findStatus(data),
      option: [
        { title: "در انتظار", value: "SUBMITTED" },
        { title: "نهایی شده", value: "FINALIZED" },
        { title: "لفو شده", value: "REJECTED" }
      ]
    },
    {
      id: 10,
      label: "مجموع کارمزد کارگزاری(ریال)",
      title: "total_broker_commission",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 11,
      label: "ارزش(معامله)",
      title: "total_value",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ",
      title: "date_time_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ",
      title: "date_time_to",
      active: true,
      type: "date"
    },
    {
      id: 10,
      label: "از امتیاز",
      title: "bonus_value_from",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 11,
      label: "تا امتیاز",
      title: "bonus_value_to",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 12,
      label: "از مجموع کارمزد کارگزاری",
      title: "total_broker_commission_from",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 13,
      label: "تا مجموع کارمزد کارگزاری",
      title: "total_broker_commission_to",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    }
  ];
  const dispatch = useDispatch();
  let classes = useStles();
  const [sort, setSort] = useState({});
  const [headTable, setHeadTable] = useState<any>([]);
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit);
  };
  useEffect(() => {
    apiSubmit();
  }, [flagApi]);
  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]);
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headersTable];
    });
  }, []);

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
      type: actionTypesAutomationLog.selectAutomationLogAsync,
      payload: _data
    });
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const findStatus = (status: any) => {
    switch (status) {
      case "SUBMITTED":
        return "در انتظار";
      case "FINALIZED":
        return "نهایی شده";
      case "REJECTED":
        return "لغو شده";
    }
  };
  const findType = (status: any) => {
    switch (status) {
      case "STOCK":
        return "اوراق بهادار";
      case "FUTURE":
        return "آتی";
      case "ENERGY":
        return "انرژی";
      case "IME":
        return "کالا";
      default:
        return status;
    }
  };
  return (
    <>
      <div className={classes["head"]}>
        <Excel stateFilter={stateTable} Head={head} />
        <Drawer
          children={null}
          tableHead={headTable.filter(
            (itm: any, ind: any) => ind !== 5 && ind !== 4 && ind !== 7
          )}
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
      {stateReducer.loading ? <LinearProgress /> : null}
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
        loading={stateReducer.loading}
      >
        {state.map((item: any, index: any) => {
          return (
            <TableRow
              key={index}
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
              setflagApi={setflagApi}
              apiSubmit={apiSubmit}
            />
          );
        })}{" "}
      </Table>
    </>
  );
};

export default AutomationLog;
