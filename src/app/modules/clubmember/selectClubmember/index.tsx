import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Excel from "./excel/index";
import TableRow from "./tableRow/index";
import Drawer from "../../../common/components/drawer";
import Table from "../../../common/components/componentCustomTable/index";
import { actionTypes } from "./../../../../redux/clubmember/clubmember_select";
import { seprateNumberFromComma } from "../../../common/method/seprateNumberFromComma";

import { makeStyles } from "@material-ui/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LinearProgress } from "@material-ui/core";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";

export const branchName = (value: any) : any => {
  if (!value || value === "null") {
    return (
    <svg style={{ width: 20, height: 20, fill: "red" }}>
      <use xlinkHref="/sprit.svg#close_icon"></use>
    </svg>
    //  <svg>
    //      <use xlinkHref="/sprit.svg#logo-pishro"></use>
    //     </svg>
    )
  }
  return (<svg style={{ width: 20, height: 20, fill: "green" }}>
    <use xlinkHref="/sprit.svg#check_icon"></use>
  </svg>)

}

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
    (state: any) => state.select_clubmember_reducer
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
      title: "first_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "نام خانوادگی",
      title: "last_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "کدملی",
      title: "national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "تاریخ تولد",
      title: "birth_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 6,
      label: "نقش",
      title: "category",
      active: false,
      type: "option",
      option: [
        { title: "ادمین", value: "ADMIN" },
        { title: "اپراتور", value: "OPERATOR" },
        { title: "کاربر عادی", value: "MEMBER" }
      ],
      format: (data: any) => findRoll(data).value
    },
    {
      id: 7,
      label: "موبایل",
      title: "phone",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "ایمیل",
      title: "email",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "کد معرفی",
      title: "automation_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 10,
      label: "شعبه",
      title: "branch_name",
      active: false,
      type: "text",
      format: (data: any) => branchName(data)
    },
    {
      id: 11,
      label: "امتیاز",
      title: "available_bonus",
      active: false,
      type: "text",
      format: seprateNumberFromComma
    }
  ];

  const headDrawer = [
    ...head.filter(item => item.title !== "branch_name")
    ,
    {
      id: 10,
      label: "حداقل امتیاز",
      title: "available_bonus_from",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 11,
      label: "حداکثر امتیاز",
      title: "available_bonus_to",
      active: false,
      type: "text",
      format: seprateNumberFromComma
    },
    {
      id: 12,
      label: "از تاریخ تولد",
      title: "birth_date_from",
      active: true,
      type: "date"
    },
    {
      id: 13,
      label: "تا تاریخ تولد",
      title: "birth_date_to",
      active: true,
      type: "date"
    },
    {
      id: 14,
      label: "شهر شعبه",
      title: "branch_city",
      active: true,
      type: "text"
    },
    {
      id: 15,
      label: "استان شعبه",
      title: "branch_province",
      active: true,
      type: "text"
    },
    {
      id: 16,
      label: "کد معرف شعبه",
      title: "branch_id",
      active: true,
      type: "text"
    },
    {
      id: 17,
      label: "نام شعبه",
      title: "branch_name",
      active: false,
      type: "text",
      format: (data: any) => branchName(data)
    },
    {
      id: 18,
      label: "کدملی بازاریاب",
      title: "marketer_member_national_id",
      active: false,
      type: "text",
    },
    {
      id: 19,
      label: "بازاریاب",
      title: "has_marketer",
      active: false,
      type: "option",
      option: [
        { title: "دارد", value: "TRUE" },
        { title: "ندارد", value: "FALSE" },
      ],
    },
  ];

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
      ["birth_date_from", "birth_date_to"],
      ["birth_date_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selecClubmemberAsync, payload: _data });
  };

  const findRoll = (key: any) => {
    switch (key) {
      case "ADMIN":
        return { value: "ادمین", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "اپراتور", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "کاربر عادی", roll: "MEMBER" };
      default:
        return { value: "-", roll: "-" };
    }
  };
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit);
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel
          handleNull={handleNull}
          findRoll={findRoll}
          stateFilter={stateTable}
        />

        <Drawer
          children={null}
          tableHead={headDrawer.filter((itm, ind) => ind !== 4)}
          stateFilter={{
            birth_date_to: null,
            birth_date_from: null,
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
