import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Excel from "./excel/index";
import TableRow from "./tableRow/index";
import Drawer from "../../../../../common/components/drawer";
import Table from "../../../../../common/components/componentCustomTable/index";
import { actionTypes } from "../../../../../../redux/Orders/orders_v1_select_tableDetailes";
import { actionTypes as selectPofilePicture } from "../../../../../../redux/person/person_v1_select_Integrate_profiles";
import { actionTypes as actionTypeSummaris } from "../../../../../../redux/summaries";

import { makeStyles } from "@material-ui/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LinearProgress } from "@material-ui/core";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";
import { handleNumber } from "../../../../../common/method/displayData";
import { handeFilterForDate } from "../../../../../common/method/handeFilterForDate";

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
  },
  icons: {
    position: "absolute",
    top: "-90px",
    left: "0%"
  }
});

export default function Index({ checkIsin, memberId, setMemberId }: any) {
  let classes = useStles();

  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.select_OerdersDetailes_reducer
  );
  const Isin = useSelector((state: any) => state.select_summaries_Reducer)
    .isinJson;

  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },

    {
      id: 3,
      label: "کد معاملاتی",
      title: "account",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "تاریخ ثبت",
      title: "back_office_insert_date_time",
      active: true,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 5,
      label: "نماد",
      title: "instrument_id",
      active: false,
      type: "symbol",
      format: (data: any) => checkIsin(data)
    },
    {
      id: 6,
      label: "وضعیت درخواست",
      title: "is_canceled",
      active: false,
      type: "option",
      option: [
        { title: "لغو شده ", value: "TRUE" },
        { title: "لغو نشده ", value: "FALSE" }
      ],
      format: (data: any) => handelIsCanceled(data)
    },
    {
      id: 7,
      label: "منبع درخواست",
      title: "is_online",
      active: false,
      type: "option",
      option: [
        { title: "آنلاین", value: "True" },
        { title: "آفلاین", value: "False" }
      ],
      format: (data: any) => handelIsOnline(data)
    },
    {
      id: 8,
      label: "قیمت",
      title: "price",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 9,
      label: "تعداد سهم",
      title: "quantity",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 10,
      label: "نوع درخواست",
      title: "trade_type",
      active: false,
      type: "option",
      option: [
        { title: "خرید", value: "1" },
        { title: "فروش", value: "2" }
      ],
      format: (data: any) => CheckTrade_type(data)
    },
    {
      id: 11,
      label: "مقدار",
      title: "value",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ",
      title: "back_office_insert_date_time_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ",
      title: "back_office_insert_date_time_to",
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
  }, [flagApi, memberId]); //eslint-disable-line react-hooks/exhaustive-deps

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
      ["back_office_insert_date_time_from", "back_office_insert_date_time_to"],
      ["back_office_insert_date_time_to"]
    );

    let _data = {
      data: handelData(
        {
          ...obj,
          member_id: memberId,
          instrument_id: obj.instrument_id ? obj.instrument_id.isin : ""
        },
        ["date_time"]
      ),
      // data: obj,

      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selecOerdersDetailesAsync, payload: _data });
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const handelDate = (date: any) => {
    if (date) {
      return dateMiladiToShamsi(date.split(" ")[0]);
    }
    return date;
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({ back_office_insert_date_time: null });
    setPagnation({ number: 1, count: 0 });
    setMemberId("");
    dispatch({ type: selectPofilePicture.selectPofilePictureEmpty });
    setflagApi((prev: any) => !prev);
  };

  const handelData = (state: any, array: any) => {
    let obj: any = {};
    let res: any = {};

    Object.keys(state).forEach(item => {
      array.forEach((name: string) => {
        if (item === name) {
          if (name.includes("to_")) {
            obj[name] = `${convertDigitToEnglish(
              state[name].format("YYYY/MM/DD")
            )} 23:59:59.000000`;
          } else {
            obj[name] = `${convertDigitToEnglish(
              state[name].format("YYYY/MM/DD")
            )} 00:00:00.000000`;
          }
        } else {
          if (!obj[item]) obj[item] = state[item];
        }
      });
    });

    Object.keys(obj).forEach(element => {
      if (obj[element]) {
        res[element] = obj[element];
      }
    });

    return res;
  };

  const handelIsOnline = (data: any, flag?: boolean) => {
    switch (data) {
      case "True":
        return "آنلاین";

      case "False":
        if (flag) {
          return "آفلاین";
        }
        return <p style={{ color: "red" }}>آفلاین</p>;

      default:
        return "-";
    }
  };

  const handelIsCanceled = (data: any, flag?: boolean) => {
    switch (data) {
      case "TRUE":
        return "لغو شده";

      case "FALSE":
        if (flag) {
          return "لغو نشده";
        }
        return <p style={{ color: "blue" }}>لغو نشده</p>;

      case "False":
        if (flag) {
          return "لغو نشده";
        }
        return <p style={{ color: "blue" }}>لغو نشده</p>;

      default:
        return "-";
    }
  };

  const CheckTrade_type = (key: any) => {
    switch (key) {
      case "1":
        return "خرید";

      default:
        return "فروش";
    }
  };

  const FindIsin = (isin: any) => {
    let data = {
      data: {
        isin: isin
      }
    };
    if (Isin[isin] === undefined)
      dispatch({
        type: actionTypeSummaris.selectSummariesAsync,
        payload: data
      });
  };

  const ApiCallForStockName = () => {
    state
      .filter((item: any) => !Isin[item.body.instrument_id])
      .forEach((item: any) => {
        FindIsin(item.body.instrument_id);
      });
  };

  useEffect(() => {
    ApiCallForStockName();
  }, [state]);

  return (
    <>
      <div className={"position-relative"}>
        <div className={classes["icons"]}>
          <div className={"d-flex align-items-center"}>
            <Excel
              handleNull={handleNull}
              CheckTrade_type={CheckTrade_type}
              stateFilter={stateTable}
              handelDate={handelDate}
              checkIsin={checkIsin}
              handelIsOnline={handelIsOnline}
              handelIsCanceled={handelIsCanceled}
            />

            <Drawer
              children={null}
              tableHead={headTable.filter((item: any, ind: any) => ind !== 2)}
              stateFilter={{
                back_office_insert_date_time_from: null,
                back_office_insert_date_time_to: null,
                ...stateTable
              }}
              setStateFilter={setStateTable}
              apiSubmit={() => submitTable()}
            />

            <RefreshIcon
              className={"btnIcon"}
              onClick={() => handelRefresh()}
            />
          </div>
        </div>
      </div>

      {stateReducer.loading && <LinearProgress />}

      <div style={{ paddingTop: !stateReducer.loading ? "4px" : "0px" }}>
        <Table
          height={"header"}
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
                Isin={Isin}
              />
            );
          })}
        </Table>
      </div>
    </>
  );
}
