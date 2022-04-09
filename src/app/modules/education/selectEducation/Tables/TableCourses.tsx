import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../common/components/componentCustomTable";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "./TableRowCourse";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "../../../../common/components/cardNoData";
import Buttons from "./Buttons";
// import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";
import {
  dateConverttShamsiToMiladi,
  dateMiladiToShamsi
} from "../../../../common/method/date";
import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography
} from "@material-ui/core";
// import ModalPerson from "./modalPerson";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as courseSelect } from "../../../../../redux/education/education_course_select";
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
  // sort,
  setFilterCoureses,
  // setSort,
  setPaginationRegistration,
  apiCoursesSelect,
  paginationRegistration,
  Courses_Reducer,
  open,
  setopen,
  setValueTab,
  valueTab,
  flagRefresh
}: any) {
  const classes = useStyles();
  // const [tableHead, setTableHead] = useState(tableHeadStart);

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    start_date: null,
    end_date: null
  });
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [state, setstate] = useState<any>([]);
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  const stateReducer = useSelector(
    (state: any) => state.education_course_select_Reducer
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

  const handleOpen = (ind: any, id: string) => {
    setValueTab(1);
    setopen({
      flag: true,
      ind: ind,
      id: id
    });
  };

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
  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefresh]);

  // useEffect(() => {
  //   if (b) {
  //     handelRefresh();
  //   }
  //   b=true
  // }, [flagRefrsh]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      start_date: null,
      end_date: null
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

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    if (obj.start_date) {
      let dateStart = convertDigitToEnglish(
        obj.start_date.format("YYYY/MM/DD")
      );
      dateStart = `${dateStart} ${"00:00:00.000000"}`;
      obj = { ...obj, start_date: dateStart };
    }
    if (obj.end_date) {
      let dateEnd = convertDigitToEnglish(obj.end_date.format("YYYY/MM/DD"));
      dateEnd = `${dateEnd} ${"00:00:00.000000"}`;
      obj = { ...obj, end_date: dateEnd };
    }
    setFilterCoureses(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: courseSelect.educationCourseSelectAsync,
      payload: _data
    });
  };

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    // {
    //   id: 2,
    //   label: "کد دوره",
    //   statusSort: true,
    //   title: "_id",
    //   active: false,
    //   type: "text",
    //   format: (data: any) => handleNull(data),
    // },
    {
      id: 2,
      label: "عنوان آموزش",
      title: "Name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "وضعیت",
      title: "is_active",
      active: false,
      type: "option",
      option: [
        { title: "فعال", value: "TRUE" },
        { title: "غیر فعال", value: "FALSE" }
      ],
      format: (data: any) => findRoll(data).value
    },
    {
      id: 4,
      label: "تاریخ شروع دوره",
      title: "start_date",
      statusSort: true,
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    // {
    {
      id: 5,
      label: "روز های برگزاری",
      title: "holding_days",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "تعداد ساعت",
      title: "hours",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "تاریخ پایان دوره",
      title: "end_date",
      statusSort: true,
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "دسته بندی",
      title: "category",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "ظرفیت مانده",
      title: "remained_capacity",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
    // {
    //   id: 11,
    //   label: "ابزار",
    //   title: null,
    //   active: false,
    //   type: "text",
    // },
  ];

  const findRoll = (key: any) => {
    switch (key) {
      case "TRUE":
        return { value: "فعال", roll: "TRUE" };
      case "FALSE":
        return { value: "غیر فعال", roll: "FALSE" };
      default:
        return { value: "-", roll: "-" };
    }
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };
  const handleDate = (date: any) => {
    console.log("datemiladi", date);
    if (date.includes("00:00:00.000000")) {
      return dateMiladiToShamsi(date);
    }
    if (date === "TRUE" || date === "FALSE") {
      return "-";
    } else {
      let dateMiladi = dateConverttShamsiToMiladi(date);
      return dateMiladiToShamsi(dateMiladi);
    }
  };

  // const handleDate = (date: any) => {
  //   let chngeDate = "";
  //   if (date[0] === "2") {
  //     chngeDate = dateMiladiToShamsi(date.split("T")[0]);
  //     return chngeDate;
  //   } else {
  //     return date;
  //   }
  // };

  return (
    <>
      <div style={{ position: "absolute", left: 135, top: 155 }}>
        <Drawer
          children={null}
          tableHead={head.filter((info, index) => index !== 3 && index !== 6)}
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
            item={item}
            head={head}
            index={ind}
            pagnation={pagnation}
            stateReducer={stateReducer}
            handleOpen={handleOpen}
            apiCoursesUpdate={apiCoursesUpdate}
            apiCoursesDeactive={apiCoursesDeactive}
            apiCoursesActive={apiCoursesActive}
            setflagApi={setflagApi}
          />
          // <TableRow
          //   key={ind}
          //   // className={classes.tableRow}
          //   // onClick={handleClickRow}
          // >
          //   <TableCell className="colorInherit" align="center">
          //     {pagnation.number !== 1
          //       ? pagnation.number * stateReducer.size -
          //         stateReducer.size +
          //         (ind + 1)
          //       : ind + 1}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.id}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.Name}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.is_active === "TRUE" ? "فعال" : "غیر فعال"}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.start_date[0] === "2"
          //       ? dateMiladiToShamsi(row.body.start_date.split("T"[0]))
          //       : row.body.start_date}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.holding_days}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.hours}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.end_date[0] === "2"
          //       ? dateMiladiToShamsi(row.body.end_date.split("T"[0]))
          //       : row.body.end_date}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.category}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center">
          //     {row.body.remained_capacity}
          //   </TableCell>
          //   <TableCell
          //     className="colorInherit"
          //     // align="center"
          //     style={{
          //       minWidth: 200,
          //     }}
          //   >
          //     <button
          //       style={{ marginTop: 10 }}
          //       onClick={() => handleOpen(ind, row.id)}
          //       // className={classes.btnModal}
          //       className={"btnsBlue"}
          //     >
          //       ثبت نام کننده ها
          //     </button>
          //     {/* <Buttons
          //         info={{
          //           title: "ویرایش",
          //           className: "btnsYellow",
          //           modal: "ModalEdit",
          //         }}
          //         data={row}
          //         apiCoursesUpdate={apiCoursesUpdate}
          //       />

          //       <Buttons
          //         info={{
          //           title: row.body.is_active === "TRUE" ? "غیر فعال" : "فعال",
          //           className:
          //             row.body.is_active === "TRUE" ? "btnsRed" : "btnsGreen",
          //           modal: "modalDelete",
          //         }}
          //         data={row}
          //         apiCoursesDeactive={apiCoursesDeactive}
          //         apiCoursesActive={apiCoursesActive}
          //       /> */}
          //   </TableCell>
          //   <TableCell className="colorInherit" align="center"></TableCell>
          // </TableRow>
        ))}
      </Table>
    </>
  );
}
