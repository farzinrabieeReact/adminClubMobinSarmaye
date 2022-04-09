import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
import Table from "../../../../../common/components/customTable";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import CardNoData from "./../../../../../common/method/";
import { Pagination } from "@material-ui/lab";
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
// import { dateMiladiToShamsi } from "../../../../../Common/method/date";
// import { sepratePriceFromComma } from "../../../../../Common/method/seprateNumberFromComma";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import { sepratePriceFromComma } from "../../../../../common/method/seprateNumberFromComma";
import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
} from "@material-ui/icons/ArrowDownward";
import { actionTypes as ordersSelect } from "../../../../../../redux/Orders/orders_v1_select";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    // marginTop:10,
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
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
    direction: "ltr",
  },
});
const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "کد معاملاتی", title: "account", active: false },
  { id: 3, label: "تاریخ ثبت", title: "date_time", active: false },
  { id: 4, label: "نماد", title: "instrument_id", active: false },
  { id: 5, label: "وضعیت درخواست", title: "is_canceled", active: false },
  { id: 6, label: "منبع درخواست", title: "is_online", active: false },
  { id: 7, label: "قیمت", title: "price", active: false },
  { id: 8, label: "تعداد سهم", title: "quantity", active: false },
  { id: 9, label: "نوع درخواست", title: "trade_type", active: false },
  { id: 10, label: "مقدار", title: "total_value", active: false },
];

let flag1 = false;

export default function SimpleTable({
  flagFilter,
  stateReducerOreder,
  stateReducerSummaries,
  apiSubmitAggregates,
  stateReducerProfile,
  apiSubmitDetails,
  handelData,
  pageTab1,
  setPageTab1,
  apiSelectProfile,
  values,
  data,
  setData,
  valueTab,
  // setSort,
  // sort,
  member_id,
}) {
  const classes = useStyles();
  const [state, setstate] = useState([]);
  const dispatch = useDispatch();

  const [flag, setflag] = useState(false);

  const [tableHeadState, setTableHeadState] = useState(tableHead);
  const [pagnation, setPagnation] = useState({
    number: 1,
    count: 2,
  });
  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState({});

  const submitTable = (pageTab1, data) => {
    apiSubmit();
  };

  const stateReducer = useSelector((state) => state.orders_v1_select);

  const apiSubmit = () => {
    let obj = {};
    let { size } = stateReducer;
    let { id, ...sortRes } = sort;

    let obj2 = { ...stateTable, member_id: member_id };

    Object.keys(obj2).forEach((element) => {
      if (obj2[element]) {
        obj[element] = obj2[element];
      }
    });

    let _data = {
      obj: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
      method: "select_details",
    };

    dispatch({
      type: ordersSelect.ordersSelectAsync,
      payload: _data,
    });
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flag1) {
      apiSubmit();
    } else {
      setflag(true);
    }
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  const findStatus = (key) => {
    switch (key) {
      case "REJECTED":
        return "لغو شده";
      case "FINALIZED":
        return "نهایی شده";
      case "RESERVED":
        return "رزرو شده";
      default:
        return "نامشخص";
    }
  };

  useEffect(() => {
    if (stateReducerOreder.data) {
      let data = stateReducerOreder.data ? stateReducerOreder.data : [];
      setstate(data);
    }
  }, [stateReducerOreder.data]); //eslint-disable-line  react-hooks/exhaustive-deps

  // const handelSubmit = () => {
  //   let obj = handelData();
  //   let data = {
  //     ...obj,
  //   };
  //
  //   if (state[0]) {
  //     state[0].body.account
  //       ? apiSubmitDetails(stateReducerOreder.from + 20, data)
  //       : apiSubmitAggregates(stateReducerOreder.from + 20, data);
  //   }
  // };

  // const handleChangePagination = (event, value) => {
  //   setPageTab1(value);
  // };

  // useEffect(() => {
  //   let obj = handelData();
  //   // let member_id = stateReducerProfile?.data[0]?.id;

  //   if (data.report === "تجمیعی") {
  //     // if (pageTab1 !== 1) {
  //     //   setPageTab1(1);
  //     //
  //     //   return;
  //     // }
  //     let data = {
  //       ...obj,
  //     };

  //     if (flag1) {
  //       apiSubmitAggregates(pageTab1, data);
  //     }
  //   }
  //   if (data.report === "عمومی") {
  //     // if (pageTab1 !== 1) {
  //     //   setPageTab1(1);
  //     //   return;
  //     // }
  //     let data = {
  //       ...obj,
  //     };

  //     submitTable(pageTab1, data);
  //   }

  //   flag1 = true;
  // }, [pageTab1]); //eslint-disable-line  react-hooks/exhaustive-deps

  const handleClickSort = (title, id) => {
    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (id === sort.id) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort({});
        return;
      }
      setSort({ [title]: findState, id: id });
    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort({ [title]: stateSort.ASC, id: id });
    }
  };

  const findStateSort = (title) => {
    switch (sort[title]) {
      case stateSort.DEFAULT:
        return stateSort.ASC;
      case stateSort.ASC:
        return stateSort.DESC;
      case stateSort.DESC:
        return stateSort.DEFAULT;
      default:
        return stateSort.DEFAULT;
    }
  };

  const head = [
    { id: 1, label: "ردیف", title: null, active: true, type: "" },
    {
      id: 2,
      label: "کد معاملاتی",
      title: "account",
      active: false,
      type: "text",
    },
    {
      id: 3,
      label: "تاریخ ثبت",
      title: "back_office_insert_date_time",
      active: true,
      type: "date",
    },
    {
      id: 4,
      label: "نماد",
      title: "instrument_id",
      active: true,
      type: "date",
    },
    // {
    {
      id: 5,
      label: "وضعیت درخواست",
      title: "is_canceled",
      active: false,
      type: "text",
    },
    {
      id: 6,
      label: "منبع درخواست",
      title: "is_online",
      active: false,
      type: "option",
      option: [
        { title: "آنلاین", value: "True" },
        { title: "آفلاین", value: "False" },
      ],
    },
    //     id: 6, label: "وضعیت", title: "status", active: false, type: 'option',
    //     option: [
    //         { title: 'نهایی شده', value: 'FINALIZED' },
    //         { title: 'لغو شده', value: 'REJECTED' },
    //         { title: 'رزرو شده', value: 'RESERVED' },
    //     ]
    // },
    {
      id: 7,
      label: "قیمت",
      title: "price",
      active: false,
      type: "text",
    },
    {
      id: 8,
      label: "تعداد سهم",
      title: "quantity",
      active: false,
      type: "text",
    },
    {
      id: 9,
      label: "نوع درخواست",
      title: "trade_type",
      active: false,
      type: "option",
      option: [
        { title: "فروش", value: "2" },
        { title: "خرید", value: "1" },
      ],
    },
    {
      id: 10,
      label: "مقدار",
      title: "value",
      active: true,
      type: "text",
    },
    // { id: 9, label: "", title: "source_description", active: false, type: 'text' },
  ];

  return (
    // <TableContainer
    //   className={classes.tableContainer}
    //   component={Paper}
    //   style={{ marginTop: 30, height: flagFilter ? "55vh" : "78vh" }}
    // >
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
    >
      {state &&
        state?.map((row, ind) => (
          <TableRow
            key={ind}
            // className={classes.tableRow}
            // onClick={handleClickRow}
          >
            <TableCell className="colorInherit" align="center">
              {pageTab1 !== 1
                ? pageTab1 * stateReducerOreder.size -
                  stateReducerOreder.size +
                  (ind + 1)
                : ind + 1}
            </TableCell>

            <TableCell className="colorInherit" align="center">
              {row.body.account ? row.body.account : "-"}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.back_office_insert_date_time
                ? dateMiladiToShamsi(
                    row.body.back_office_insert_date_time.split(" ")[0]
                  )
                : dateMiladiToShamsi(row.body.date_time.split(" ")[0])}
            </TableCell>

            <TableCell className="colorInherit" align="center">
              {stateReducerSummaries.isinJson[row.body.instrument_id]
                ? stateReducerSummaries.isinJson[row.body.instrument_id]
                : row.body.instrument_id
                ? row.body.instrument_id
                : row.body.instrument_type}
            </TableCell>

            <TableCell
              className="colorInherit"
              align="center"
              style={{
                color: row.body.is_canceled === "True" ? "red" : "",
              }}
            >
              {row.body.is_canceled === "true"
                ? "لغو شده"
                : row.body.is_canceled === "False"
                ? "لغو نشده"
                : "-"}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.is_online === "True"
                ? "آنلاین"
                : row.body.is_online === "False"
                ? "آفلاین"
                : "_"}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.price
                ? sepratePriceFromComma(row.body.price)
                : sepratePriceFromComma(row.body.average_price)}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.quantity}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.trade_type === "1" ? "خرید" : "فروش"}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.value
                ? row.body.value === "null"
                  ? "-"
                  : sepratePriceFromComma(row.body.value)
                : sepratePriceFromComma(row.body.total_value)}
            </TableCell>
            <TableCell className="colorInherit" align="center"></TableCell>
          </TableRow>
        ))}
    </Table>
  );
}

{
  /* 
      {!state.length ? (
        // <CardNoData />
        <></>
      ) : (
        <div className={classes.stickyPagination}>
          <Pagination
            shape="rounded"
            variant="outlined"
            count={Math.ceil(
              stateReducerOreder.total / stateReducerOreder.size
            )}
            page={pageTab1}
            onChange={handleChangePagination}
          />
        </div>
      )}
    </TableContainer> */
}
