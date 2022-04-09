import React, { useState, useEffect } from "react";
import Table from "../../../../common/components/componentCustomTable";
import TableRow from "./TableRow/index";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/Compatition/compatition_select_participations";
import { seprateNumberFromComma } from "../../../../common/method/seprateNumberFromComma";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import { Tab } from "react-bootstrap";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import Drawer from "../../../../common/components/drawer";
import { ContactSupportOutlined } from "@material-ui/icons";

interface Pagination {
  number: number;
  count: number;
}

let b = false;

export default function DashboardPage({
  flagFilter,
  idCompetitions,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipationsEmpty,
  setStateFilterStatistic,
  flagRefrsh
}: any) {
  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.compatition_select_participation_reducer
  );

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
      label: "نام مسابقه",
      title: "competition_title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "گزینه انتخابی",
      title: "choice_number",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    // {
    //     id: 6, label: "وضعیت", title: "status", active: false, type: 'option',
    //     option: [
    //         { title: 'نهایی شده', value: 'FINALIZED' },
    //         { title: 'لغو شده', value: 'REJECTED' },
    //         { title: 'رزرو شده', value: 'RESERVED' },
    //     ]
    // },
    {
      id: 7,
      label: "تاریخ ثبت",
      title: "participation_date",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 8,
      label: "جواب صحیح",
      title: "is_correct",
      active: false,
      type: "option",
      option: [
        { title: "درست", value: "TRUE" },
        { title: "غلط", value: "FALSE" }
      ],
      format: (data: any) => findRoll(data).value
    },
    {
      id: 9,
      label: "جایزه",
      title: "participation_bonus_id",
      active: false,
      type: "option",
      option: [
        { title: "رایگان", value: "FREE" },
        { title: "در انتظار", value: "null" },
        { title: "نهایی شده", value: "" }
      ],
      format: (data: any) => findRollId(data).value
    }
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

  const submitTable = () => {
    apiSubmit();
  };

  const apiSubmit = () => {
    let obj: any = { competition_id: idCompetitions };
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

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
      type: actionTypes.compatitionSelectparticipationsAsync,
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
  }, [flagApi]);

  useEffect(() => {
    if (b) handelRefresh();
    b = true;
  }, [flagRefrsh]); //eslint-disable-line react-hooks/exhaustive-deps

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

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      participation_date: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const handelDate = (date: any) => {
    let chngeDate = "";
    chngeDate = dateMiladiToShamsi(date.split(" ")[0]);
    return chngeDate;
  };

  return (
    <>
      <div style={{ position: "absolute", left: 130, top: 145 }}>
        <Drawer
          children={null}
          tableHead={head}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
      </div>
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
