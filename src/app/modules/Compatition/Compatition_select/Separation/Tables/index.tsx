import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../../../common/components/componentCustomTable";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "./TableRow/index";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import { actionTypes as compatition } from "../../../../../../redux/Compatition/compatition_select_participations";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";

const useStyles = makeStyles({
  tableContainer: {
    direction: "rtl",
    borderRadius: 10,
    width: "100%",
    margin: "auto",
    marginTop: 5,
    height: 800,
    maxHeight: 800
  },

  table: {
    minWidth: 650,
    overflowY: "auto",
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold"
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  }
});

interface Pagination {
  number: number;
  count: number;
}
let b = false;

export default function SimpleTable({
  flagFilter,
  reducerParticipations,
  apiParticipationsEmpty,
  infoCompatition,
  flagRefrsh,
  setStateFilterStatistic
}: any) {
  const dispatch = useDispatch();
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
      label: "تاریخ ثبت",
      title: "participation_date",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 6,
      label: "جایزه",
      title: "participation_bonus_id",
      active: false,
      type: "text",
      format: (data: any) => findRollId(data).value
    }
    // {
    //     id: 6, label: "وضعیت", title: "status", active: false, type: 'option',
    //     option: [
    //         { title: 'نهایی شده', value: 'FINALIZED' },
    //         { title: 'لغو شده', value: 'REJECTED' },
    //         { title: 'رزرو شده', value: 'RESERVED' },
    //     ]
  ];

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    participation_date: null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);
  const [flagApi, setflagApi] = useState<boolean>(false);

  const classes = useStyles();

  const stateReducer = useSelector(
    (state: any) => state.compatition_select_participation_reducer
  );

  const submitTable = () => {
    apiSubmit();
  };

  const apiSubmit = () => {
    // let obj: any = { competition_id: idCompetitions };
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;
    // console.log("infoCompatition",infoCompatition)

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    if (infoCompatition.data) {
      obj = { ...infoCompatition.data, ...obj };
    }
    if (obj.participation_date) {
      let date = convertDigitToEnglish(
        obj.participation_date.format("YYYY/MM/DD")
      );
      date = `${date} 00:00:00.000000`;
      obj.participation_date = date;
    }

    setStateFilterStatistic(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: compatition.compatitionSelectparticipationsAsync,
      payload: _data
    });
  };

  // console.log("state",state)

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
  }, [flagRefrsh]); //eslint-disable-line react-hooks/exhaustive-deps

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      participation_date: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  useEffect(() => {
    setPagnation({
      number: 1,
      count: 2
    });
    setflagApi(!flagApi);
  }, [infoCompatition.data]);

  const findRoll = (key: any) => {
    switch (key) {
      case "TRUE":
        return { value: "درست", roll: "TRUE" };
      case "FALSE":
        return { value: "غلط", roll: "FALSE" };
      default:
        return { value: "در انتظار", roll: null };
    }
  };
  const findRollId = (key: any) => {
    switch (key) {
      case "FREE":
        return { value: "رایگان", roll: "FREE" };
      case "null":
        return { value: "در انتظار", roll: "null" };
      default:
        return { value: "نهایی شده", roll: null };
    }
  };

  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };

  //   const handelRefresh = () => {
  //     setSort({});
  //     setStateTable({});
  //     setPagnation({ number: 1, count: 0 });
  //     setflagApi((prev: any) => !prev);
  //   };

  const handelDate = (date: any) => {
    let chngeDate = "";
    chngeDate = dateMiladiToShamsi(date.split(" ")[0]);
    return chngeDate;
  };

  const getStripedStyle = (index: any) => {
    return { background: index % 2 ? "#fafafa" : "white" };
  };

  //   useEffect(() => {

  //       return () => {
  //         apiParticipationsEmpty()
  //       }
  //   }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
        {state.map((item: any, index: any) => {
          return (
            <TableRow
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
            />
            // <TableRow key={index.js}>
            //   <TableCell className="colorInherit" align="center">
            //     {index.js + 1}
            //   </TableCell>
            //   <TableCell align="center">
            //     {item.body.member_first_name}
            //   </TableCell>
            //   <TableCell align="center">{item.body.member_last_name}</TableCell>
            //   <TableCell align="center">
            //     {item.body.member_national_id}
            //   </TableCell>
            //   <TableCell align="center">
            //     {item.body.competition_title}
            //   </TableCell>
            //   <TableCell align="center">{item.body.choice_number}</TableCell>
            //   <TableCell align="center">
            //     {item.body.participation_date.split(" ")[0]}
            //   </TableCell>
            //   {/* <TableCell align="center">{item.body.bonus_type} </TableCell> */}
            //   <TableCell align="center">
            //     {item.body.is_correct === "null"
            //       ? "در انتظار"
            //       : item.body.is_correct}
            //   </TableCell>
            //   <TableCell className="colorInherit" align="center">
            //     {item.body.participation_bonus_id === "null"
            //       ? "در انتظار"
            //       : item.body.participation_bonus_id === "FREE"
            //       ? "رایگان"
            //       : "نهایی شد"}
            //   </TableCell>
            //   <TableCell align="center"></TableCell>
            // </TableRow>
          );
        })}
      </Table>
    </>
  );
}
