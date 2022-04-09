import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Excel from "./excel/index";
import TableRow from "./tableRow/index";
import Drawer from "../../../common/components/drawer";
import Table from "../../../common/components/componentCustomTable/index";
import { actionTypes } from "./../../../../redux/bonus/select_bouns_aggregated";

import { makeStyles } from "@material-ui/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { LinearProgress } from "@material-ui/core";
import { handleNumber } from "../../../common/method/displayData";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";

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

export default function Index() {
  let classes = useStles();

  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.select_bouns_aggregated_reducer
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
      label: "عنوان",
      title: "bonus_type_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "مقدار",
      title: "value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 4,
      label: "نوع",
      title: "is_removed",
      active: false,
      type: "option",
      option: [
        { title: "کسر شده", value: "TRUE" },
        { title: "اضافه شده", value: "FALSE" }
      ],
      format: (data: any) => findRoll(data).value
    },

    {
      id: 5,
      label: "تاریخ",
      title: "date_time",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 6,
      label: "توضیحات",
      title: "description",
      active: false,
      type: "date",
      format: (data: any) => handleNull(data)
    }
  ];

  let filterHead = head.filter(item => item.title !== "value");

  const headDrawer = [
    ...filterHead,
    {
      id: 6,
      label: " از تاریخ",
      title: "from_date_time",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 7,
      label: " تا تاریخ",
      title: "to_date_time",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 8,
      label: "مقدار",
      title: "value",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "از مقدار",
      title: "min_value",
      active: false,
      type: "text",
      format: (data: any) => handelDate(data)
    },
    {
      id: 10,
      label: " تا مقدار",
      title: "max_value",
      active: false,
      type: "text",
      format: (data: any) => handelDate(data)
    }
  ];

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [stateTable, setStateTable] = useState<any>({});
  const [flagApi, setflagApi] = useState<boolean>(false);
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

    let _data = {
      data: handeFilterForDate(
        obj,
        ["to_date_time", "from_date_time", "date_time"],
        ["to_date_time"]
      ),
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectBonusAggregatedAsync, payload: _data });
  };

  const findRoll = (key: any) => {
    switch (key) {
      case "TRUE":
        return { value: "کسر شده", roll: "TRUE" };
      case "FALSE":
        return { value: "اضافه شده", roll: "FALSE" };
      default:
        return { value: "-", roll: "-" };
    }
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null" || key === undefined) {
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
    setStateTable({
      from_date_time: null,
      to_date_time: null,
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel
          handleNull={handleNull}
          handelDate={handelDate}
          findRoll={findRoll}
          stateFilter={stateTable}
        />

        <Drawer
          children={null}
          tableHead={headDrawer}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
          stateFilter={{
            from_date_time: null,
            to_date_time: null,
            date_time: null,
            ...stateTable
          }}
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
