import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../common/components/componentCustomTable/index";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { sepratePriceFromComma } from "../../../../common/method/seprateNumberFromComma";
import { actionType as ipoListSelectregistered } from "../../../../../redux/ipoList/ipoList_select registered";
import Drawer from '../../../../common/components/drawer'

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: 650,
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 700,
    overflowY: "auto",
    width: "96.2%",
    margin: "auto",
    position: "relative",
  },
  table: {
    minWidth: 650,
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    padding: " 16px 5px",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
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
      width: 250,
    },
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%",
  },
  loadBtn: {
    textAlign: "center",
    // paddingBottom:'100px'
    padding: "10px",
  },
  pagination: {
    textAlign: "center",
    fontWeight: "bold",
    position: "sticky",
    bottom: 0,
    width: "100%",
    margin: "auto",
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
}));
const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

interface Pagination {
  number: number;
  count: number;
}

let b = false;

export default function SimpleTable({
  valueIpo,
  flagRefresh,
  flagApical,
  setStateFilter,
}: any) {
  const classes = useStyles();
  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    ipo_end_date:null,
    registration_date:null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);

  const dispatch = useDispatch();

  const stateReducer = useSelector(
    (state: any) => state.ipoList_select_Registered_reducer
  );

  const hanldepro = (val: any) => {
    if (val === "NOT_PROCESSED") {
      return "در دست بررسی";
    }
    if (val === "FINALIZED") {
      return "تایید شده";
    }
    if (val === "REJECTED") {
      return "رد شده";
    }
  };

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نام سهم",
      statusSort: true,
      title: "ipo_stock_name",
      active: true,
      type: "text",
    },
    {
      id: 3,
      label: "نام",
      statusSort: true,
      title: "member_first_name",
      active: false,
      type: "text",
    },
    {
      id: 4,
      label: "نام خانوادگی",
      statusSort: true,
      title: "member_last_name",
      active: false,
      type: "text",
    },
    // {
    {
      id: 5,
      label: "کد ملی",
      statusSort: true,
      title: "member_national_id",
      active: false,
      type: "text",
    },
    {
      id: 6,
      label: "کد معاملاتی",
      statusSort: true,
      title: "member_bourse_account",
      active: false,
      type: "text",
    },
    {
      id: 7,
      label: "تاریخ و ساعت درخواست",
      statusSort: true,
      title: "registration_date",
      active: true,
      type: "text",
    },
    {
      id: 8,
      label: "تاریخ و ساعت انصراف",
      statusSort: true,
      title: "ipo_end_date",
      active: true,
      type: "text",
    },
    {
      id: 9,
      label: "قیمت درخواست شده",

      title: "requested_price",
      active: false,
      type: "text",
    },
    {
      id: 10,
      label: "حجم درخواست شده",
      title: "requested_quantity",
      active: false,
      type: "text",
    },
    {
      id: 11,
      label: "وضعیت پیش نیازها",
      statusSort: true,
      title: "state",
      active: false,
      type: "option",
      option: [
        { title: "در دست بررسی", value: "NOT_PROCESSED" },
        { title: "تایید شده", value: "FINALIZED" },
        { title: "رد شده", value: "REJECTED" },
      ],
    },
  ];

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;
    let idIpo = valueIpo.id;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    obj = { ...obj, ipo_id: idIpo };
    setStateFilter(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({
      type: ipoListSelectregistered.ipoListSelectRegisteredAsync,
      payload: _data,
    });
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefresh]);

  useEffect(() => {
    apiSubmit();
  }, [flagApi]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      registration_date: null,
      ipo_end_date: null,
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div style={{position:'absolute',top:159,left:210}}>
        <Drawer
          children={null}
          tableHead={head.filter((info,index)=> info.active === false)}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
          // handleValueISin={handleValueISin}
        />
      </div>
      <Table
        head={head}
        height={"header"}
        filterTable={stateTable}
        setFilterTable={setStateTable}
        sort={sort}
        setSort={setSort}
        pagnation={pagnation}
        setPagnation={setPagnation}
        submitTable={submitTable}
        setflagApi={setflagApi}
      >
        {state?.map((row: any, ind: any) => (
          <TableRow key={ind}>
            <TableCell className="colorInherit" align="center">
              {pagnation.number !== 1
                ? pagnation.number * stateReducer.size -
                  stateReducer.size +
                  (ind + 1)
                : ind + 1}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row?.body.ipo_stock_name}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {" "}
              {row?.body.member_first_name}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row?.body.member_last_name}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row?.body.member_national_id}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row?.body.member_bourse_account}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {dateMiladiToShamsi(row?.body.registration_date.split(" ")[0])}{" "}
              {row?.body.registration_date.split(" ")[1].split(".")[0]}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {dateMiladiToShamsi(row?.body.ipo_end_date.split(" ")[0])}{" "}
              {row?.body.ipo_end_date.split(" ")[1].split(".")[0]}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {sepratePriceFromComma(row?.body.requested_price)}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row?.body.requested_quantity}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {hanldepro(row?.body.state)}
            </TableCell>
            <TableCell className="colorInherit" align="center"></TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
}
