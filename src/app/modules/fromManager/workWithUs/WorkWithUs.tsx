import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import { handleNull } from "../../../common/method/displayData";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { actionTypes as actionWotkWithUs } from "../../../../redux/formManager/workWithUs/workWithUs_select";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { dateMiladiToShamsi } from "../../../common/method/date";
import TableRow from "./tableRow/index";
import Excel from "./excel/index";
import RefreshIcon from "@material-ui/icons/Refresh";

import Drawer from "../../../common/components/drawer";

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
const WorkWithUs = () => {
  const stateReducer = useSelector(
    (state: any) => state.workWithUs_select_reducer
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
      label: "نام و خانوادگی",
      title: "sender_full_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "تلفن همراه",
      title: "sender_phone",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "پست الکترونیک",
      title: "sender_email",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "موقیعت شغلی",
      title: "job_position",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "زمان آخرین تغییر",
      title: "last_modified_date_time",
      active: false,
      type: "text",
      format: (data: any) => dateMiladiToShamsi(data)
    },
    {
      id: 7,
      label: "وضعیت",
      title: "status",
      active: false,
      type: "option",
      format: (data: any) => findStatus(data),
      option: [
        { title: "بررسی نشده", value: "SUBMITTED" },
        { title: "بررسی شده", value: "FINALIZED" },
        { title: "رد شده", value: "REJECTED" }
      ]
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ",
      title: "last_modified_date_time_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ",
      title: "last_modified_date_time_to",
      active: true,
      type: "date"
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
      ["last_modified_date_time_from", "last_modified_date_time_to"],
      ["last_modified_date_time_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({
      type: actionWotkWithUs.selectWotkWithUsAsync,
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
        return "بررسی نشده";
      case "FINALIZED":
        return "بررسی شده";
      case "REJECTED":
        return "رد شده";
    }
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={headTable.filter((itm: any, ind: any) => ind !== 5)}
          stateFilter={{
            last_modified_date_time_from: null,
            last_modified_date_time_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />

        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>

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

export default WorkWithUs;
