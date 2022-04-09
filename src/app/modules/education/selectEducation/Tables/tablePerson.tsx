import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../common/components/componentCustomTable";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "../Tables/TableRowPerson";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "../../../../common/components/cardNoData";
import Buttons from "./Buttons";
// import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography
} from "@material-ui/core";
// import ModalPerson from "./modalPerson";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as courseSelectRegistration } from "../../../../../redux/education/education_course_select_registrations";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import Drawer from "../../../../common/components/drawer";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto"
    // marginTop:10,
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 0,
    /* left: 0; */
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr"
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px"
    }
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  modal: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 600,
    margin: "auto",
    padding: theme.spacing(5),
    "& div": {
      width: 250
    }
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%"
  },
  boxEmpty: {
    width: 24,
    height: 24
  },
  btnModal: {
    border: "1px solid #3D9970",
    borderRadius: 4,
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 12,
    color: "#3D9970",
    height: 30,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    boxShadow: "0 0 10px rgb(204, 204, 204)",
    "&:hover": {
      backgroundColor: "#3D9970",
      color: "white"
    }
  }
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc"
};

interface Pagination {
  number: number;
  count: number;
}

let flag = false;
let b = false;
export default function SimpleTable({
  flagFilter,
  data,
  apiCoursesUpdate,
  apiCoursesDeactive,
  apiCoursesActive,
  setStateFilterPerson,
  // sort,
  // setSort,
  setPaginationRegistration,
  apiCoursesSelect,
  paginationRegistration,
  Courses_Reducer,
  open,
  flagRefresh,
  setopen
}: any) {
  const classes = useStyles();
  // const [tableHead, setTableHead] = useState(tableHeadStart);

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    registration_date: null
  });
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [state, setstate] = useState<any>([]);
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  const stateReducer = useSelector(
    (state: any) => state.course_select_registration
  );

  // const handleClickSort = (title:any, id:any) => {
  //   if (!title) {
  //     alert("امکان فیلتر این ستون وجود ندارد.");
  //     return;
  //   }

  //   if (id === sort.id) {
  //     let findState = findStateSort(title);
  //     if (findState === stateSort.DEFAULT) {
  //       setSort({});
  //       return;
  //     }
  //     setSort({ [title]: findState, id: id });
  //   } else {
  //     let res = tableHead.map((item) =>
  //       item.id === id ? { ...item, active: true } : { ...item, active: false }
  //     );
  //     setTableHead(res);
  //     setSort({ [title]: stateSort.ASC, id: id });
  //   }
  // };

  // const findStateSort = (title) => {
  //   switch (sort[title]) {
  //     case stateSort.DEFAULT:
  //       return stateSort.ASC;
  //     case stateSort.ASC:
  //       return stateSort.DESC;
  //     case stateSort.DESC:
  //       return stateSort.DEFAULT;
  //     default:
  //       return stateSort.DEFAULT;
  //   }
  // };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (b) {
  //     handelRefresh();
  //   }
  //   b=true
  // }, [flagRefrsh]);
  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefresh]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      registration_date: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;
    let _data = {};

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    if (obj.registration_date) {
      let date = convertDigitToEnglish(
        obj.registration_date.format("YYYY/MM/DD")
      );
      date = `${date} ${"00:00:00.000000"}`;
      obj = { ...obj, registration_date: date };
    }
    if (open.flag) {
      obj = { course_id: open.id, ...obj };
      _data = {
        data: obj,
        sort_by: sortRes,
        flag: open.flag,
        from: pagnation.number,
        size: size
      };
    } else {
      _data = {
        data: obj,
        from: pagnation.number,
        size: size,
        sort_by: sortRes
      };
    }
    setStateFilterPerson(obj);

    dispatch({
      type: courseSelectRegistration.courseSelectRegistrationAsync,
      payload: _data
    });
  };

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
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
      label: "کد ملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "عنوان آموزش",
      title: "course_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    // {
    {
      id: 6,
      label: "تاریخ ثبت نام",
      title: "registration_date",
      statusSort: true,
      active: true,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 7,
      label: "وضعیت ثبت نام",
      title: "status",
      active: false,
      type: "option",
      option: [
        { title: "در انتظار", value: "SUBMITTED" },
        { title: "لغو شده", value: "CANCELED" },
        { title: "نهایی شده", value: "FINALIZED" }
      ],
      format: (data: any) => findRoll(data).value
    },
    {
      id: 8,
      label: "امتیاز ثبت نام",
      title: "register_bonus_id",
      statusSort: true,
      active: true,
      type: "text",
      format: (data: any) => findRoll(data).value
    },
    {
      id: 9,
      label: "امتیاز لغو",
      title: "unregister_bonus_id",
      active: true,
      statusSort: true,
      type: "text",
      format: (data: any) => findRoll(data).value
    }
    // {
    //   id: 10,
    //   label: "ابزار",
    //   title: null,
    //   active: false,
    //   type: "text",
    // },
  ];

  const findRoll = (key: any) => {
    switch (key) {
      case "SUBMITTED":
        return { value: "در انتظار", roll: "SUBMITTED" };
      case "CANCELED":
        return { value: "لغو شده", roll: "CANCELED" };
      case "null":
        return { value: "-", roll: "-" };
      case "FREE":
        return { value: "رایگان", roll: "FREE" };
      default:
        return { value: "نهایی شده", roll: "-" };
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
    let changeDate = dateMiladiToShamsi(date.split(" ")[0]);
    return changeDate;
  };

  return (
    <>
      {" "}
      <div style={{ position: "absolute", left: 135, top: 155 }}>
        <Drawer
          children={null}
          tableHead={head.filter((info, index) => index !== 5)}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
      </div>
      {stateReducer.loading ? <LinearProgress /> : null}
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
      >
        {stateReducer.data?.map((item: any, ind: any) => (
          <TableRow
            data={data}
            item={item}
            head={head}
            index={ind}
            pagnation={pagnation}
            stateReducer={stateReducer}
            apiCoursesUpdate={apiCoursesUpdate}
            apiCoursesDeactive={apiCoursesDeactive}
            apiCoursesActive={apiCoursesActive}
          />
        ))}
      </Table>
    </>
  );
}
