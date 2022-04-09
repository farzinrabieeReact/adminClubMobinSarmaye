import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Excel from "./excel/index";
import TableRow from "./tableRow/index";
import Drawer from "../../../../../common/components/drawer";
import Table from "../../../../../common/components/componentCustomTable/index";
import { actionTypes } from "../../../../../../redux/Orders/orders_v1_select_Aggregated";
import { actionTypes as selectPofilePicture } from "../../../../../../redux/person/person_v1_select_Integrate_profiles";

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
    (state: any) => state.select_OerdersAggregated_reducer
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
      label: "کد ملی",
      title: "member_national_id",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "تاریخ ثبت",
      title: "date_time",
      active: true,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 4,
      label: "نماد",
      title: "instrument_type",
      active: true,
      type: "text"
      // format: (data: any) => checkIsin(data)
    },
    {
      id: 5,
      label: "قیمت",
      title: "average_price",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "تعداد سهم",
      title: "quantity",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 7,
      label: "نوع درخواست",
      title: "trade_type",
      active: false,
      type: "option",
      option: [
        { title: "خرید", value: "1" },
        { title: "فروش", value: "2" }
      ],
      format: (data: any) => CheckTrade_type(data)
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
    }
  ];

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [headTable, setHeadTable] = useState<any>([]);
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
      ["date_time_from", "date_time_to"],
      ["date_time_to"]
    );
    if (memberId) {
      obj = { ...obj, member_id: memberId };
    }

    let _data = {
      // data: handelData({ ...obj, member_id: memberId }, ["date_time"]),
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selecOerdersAggregatedAsync, payload: _data });
  };

  const CheckTrade_type = (key: any) => {
    switch (key) {
      case "1":
        return "خرید";

      default:
        return "فروش";
    }
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
    setStateTable({ date_time: null });
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
            />

            <Drawer
              children={null}
              tableHead={headTable.filter((item: any, ind: any) => ind !== 2)}
              stateFilter={{
                date_time_from: null,
                date_time_to: null,
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
              />
            );
          })}
        </Table>
      </div>
    </>
  );
}
