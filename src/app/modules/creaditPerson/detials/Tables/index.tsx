import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../common/components/componentCustomTable";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as selectCreadit } from "../../../../../redux/profile/creadit";
import { actionTypes as person } from "../../../../../redux/person/person_v1_select_Integrate_profiles";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
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
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  noCard: {
    margin: 15,
  },
});
interface Pagination {
  number: number;
  count: number;
}

let b = false;

export default function SimpleTable({
  data,
  national_id,
  flagCallApi,
  setflagCallApi,
  flagRefresh,
}: any) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);

  const stateReducer = useSelector(
    (state: any) => state.Creadit_select_reducer
  );

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "تاریخ",
      title: "from_date",
      active: true,
      type: "text",
      statusSort: true,
      format: (data: any) => handleNull(data),
    },
    {
      id: 3,
      label: "کد ملی",
      title: "national_id",
      active: true,
      statusSort: true,
      type: "text",
      format: (data: any) => handleNull(data),
    },

    {
      id: 4,
      label: "مقدار اعتبار ",
      title: "credit",
      active: true,
      statusSort: true,
      type: "text",

      format: (data: any) => handleNull(data),
    },
    {
      id: 5,
      label: "مقدار اعتبار استیشن",
      title: "station_credit",
      active: true,
      type: "text",
      statusSort: true,
      format: (data: any) => handleNull(data),
    },
  ];

  const submitTable = () => {
    setPagnation({ number: 1, count: 2 });
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

    // setNational_id(data.national_id)
    obj = { national_id: national_id, ...obj };

    if (national_id) {
      let _data = {
        data: obj,
        from: pagnation.number,
        size: size,
        sort_by: sortRes,
      };

      dispatch({ type: person.selectPofilePictureAsync, payload: national_id });
      dispatch({ type: selectCreadit.creaditSelectAsync, payload: _data });
      setflagCallApi(false);
    }

    // apiselectCreadit(_data);
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flagCallApi) {
      setflagApi((prev: any) => !prev);
    }
  }, [flagCallApi]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

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

  useEffect(() => {
    if (b) {
      handelRefresh();
    }
    b = true;
  }, [flagRefresh]);

  return (
    
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
        {data.map((row: any, ind: any) => (
          <TableRow
            key={ind}
            // className={classes.tableRow}
            // onClick={handleClickRow}
          >
            {}
            <TableCell className="colorInherit" align="center">
              {ind + 1}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.from_date === "1970/01/01 00:00:00.000000"
                ? ""
                : dateMiladiToShamsi(row.body.from_date)}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.national_id}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.credit}
            </TableCell>
            <TableCell className="colorInherit" align="center">
              {row.body.station_credit}
            </TableCell>
            <TableCell className="colorInherit" align="center"></TableCell>
          </TableRow>
        ))}
      </Table>
    
  );
}
