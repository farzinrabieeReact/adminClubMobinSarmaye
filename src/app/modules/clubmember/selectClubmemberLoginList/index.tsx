import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import TableRow from "./tableRow/index";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { actionTypes as actionloginlist } from "./../../../../redux/clubmember/clubmember_select_login_list/index";
import Excel from "../../fromManager/workWithUs/excel";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer";
import { makeStyles } from "@material-ui/styles";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import moment from "moment-jalaali";
import { handleNull } from "../../../common/method/displayData";
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

export default function Index() {
  let classes = useStles();
  const dispatch = useDispatch();

  const stateReducer = useSelector(
    (state: any) => state.select_login_list_reducer
  );
  console.log("total", stateReducer.total);

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نام",
      title: "member_first_name",
      active: false,
      type: "text"
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
      label: "نام کاربری",
      title: "member_username",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "کدملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "کد بورسی",
      title: "member_bourse_code",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "موبایل",
      title: "member_phone",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "امتیاز",
      title: "member_available_bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "تاریخ و ساعت",
      title: "date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 10,
      label: "تعداد ورود",
      title: "member_continuous_login_count",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 11,
      label: "شناسه اتوماسیون",
      title: "member_automation_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 12,
      label: "پلتفرم",
      title: "source",
      active: false,
      type: "option",
      format: (data: any) => findSource(data),
      option: [
        { title: "باشگاه", value: "CLUB" },
        { title: "ادمین", value: "ADMIN" }
      ]
    },
    {
      id: 13,
      label: "وضعیت لاگین",
      title: "is_login",
      active: false,
      type: "text",
      format: (data: any) => findLogin(data)
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ",
      title: "date_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ",
      title: "date_to",
      active: true,
      type: "date"
    }
  ];

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
    apiSubmit();
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
    obj = handeFilterForDate(obj, ["date_from", "date_to"], ["date_to"]);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionloginlist.selectLoginListAsync, payload: _data });
  };

  const apiSelectLoginList = (data: any) => {};

  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    let timeSplit = dateSplit[1].split(".");
    let dateShamsi = dateMiladiToShamsi(date);
    let array = `${timeSplit[0]}  ${dateShamsi}`;
    return array;
  };

  useEffect(() => {
    apiSubmit();
  }, [flagApi]);
  useEffect(() => {
    if (stateReducer.data[0]) {
      setstate(stateReducer.data);
    }
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

  const findSource = (key: any) => {
    switch (key) {
      case "CLUB":
        return "باشگاه";
        break;
      case "ADMIN":
        return "ادمین";
      default:
        return "-";
    }
  };
  const findLogin = (key: any) => {
    switch (key) {
      case "TRUE":
        return "ورود";
      case "َّّFALSE":
        return "خروج";
      default:
        return "-";
    }
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={headTable.filter((itm: any, ind: any) => ind !== 8)}
          stateFilter={{
            date_to: null,
            date_from: null,
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
}
