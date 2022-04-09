import React, { useState, useEffect } from "react";
import Table from "../../../../../../common/components/componentCustomTable/index";
// import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../../../../redux/Compatition/compatition_select";
import { seprateNumberFromComma } from "../../../../../../common/method/seprateNumberFromComma";
import { dateMiladiToShamsi } from "../../../../../../common/method/date";
import Buttons from "../Buttons";
import LongMenu from "../LongMenu";
import TableRow from "./tableRow/index";
import Drawer from "../../../../../../common/components/drawer";
import { convertDigitToEnglish } from "../../../../../../common/method/convertDigitToEnglish";
import { LinearProgress } from "@material-ui/core";

interface Pagination {
  number: number;
  count: number;
}
let b = false;
export default function DashboardPage({
  idCompetitions,
  flagFilter,
  setflagTypePage,
  flagTypePage,
  data,
  setIdCompetitions,
  apiselectProfile,
  reducerProfile,
  apiselectProfileEmpty,
  apiParticipateInsert,
  apiParticipationsEmpty,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipateUpdate,
  apiCompetitionDeactivate,
  apiCompetitionActivate,
  flagRefrsh,
  setStateFilterCompatitions
}: any) {
  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.compatition_select_reducer
  );

  const { loading } = stateReducer;

  const head = [
    { id: 1, label: "نمایش", title: null, active: false, type: "" },
    { id: 2, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 3,
      label: "نام مسابقه",
      title: "competition_title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "تاریخ شروع مسابقه",
      title: "start_date",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    {
      id: 5,
      label: "تاریخ پایان مسابقه",
      title: "participation_deadline",
      active: false,
      type: "date",
      format: (data: any) => handelDate(data)
    },
    // {
    {
      id: 6,
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
      id: 7,
      label: "امتیاز شرکت در مسابقه",
      title: "required_bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "جایزه شرکت در مسابقه",
      title: "reward_bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({
    start_date: null,
    participation_deadline: null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);
  const [flagApi, setflagApi] = useState<boolean>(false);

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

    // obj.participation_deadline
    if (obj.participation_deadline) {
      let date = convertDigitToEnglish(
        obj.participation_deadline.format("YYYY/MM/DD")
      );
      date = `${date} 00:00:00.000000`;
      obj.participation_deadline = date;
    }
    if (obj.start_date) {
      let date = convertDigitToEnglish(obj.start_date.format("YYYY/MM/DD"));
      date = `${date} 00:00:00.000000`;
      obj.start_date = date;
    }
    setStateFilterCompatitions(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({
      type: actionTypes.compatitionSelectActiveAsync,
      payload: _data
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
  }, [flagRefrsh]);

  const handelRefresh = () => {
    setSort({});
    setStateTable({
      start_date: null,
      participation_deadline: null
    });
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

  const handelDate = (date: any) => {
    let chngeDate = "";
    chngeDate = dateMiladiToShamsi(date.split(" ")[0]);
    return chngeDate;
  };

  // useEffect(() => {
  //   if (flag) {
  //     apiSubmit();
  //   } else {
  //     setflag(true);
  //   }
  // }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  // const findStatus = (key: string) => {
  //   switch (key) {
  //     case "REJECTED":
  //       return "لغو شده";
  //     case "FINALIZED":
  //       return "نهایی شده";
  //     case "RESERVED":
  //       return "رزرو شده";
  //     default:
  //       return "نامشخص";
  //   }
  // };

  return (
    <>
      <div style={{ position: "absolute", left: 130, top: 149 }}>
        <Drawer
          children={null}
          tableHead={head}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
      </div>
      {loading && <LinearProgress />}
      <Table
        loading={loading}
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
              setflagApi={setflagApi}
              flagTypePage={flagTypePage}
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
              key={2}
              flagFilter={flagFilter}
              idCompetitions={idCompetitions}
              setflagTypePage={setflagTypePage}
              data={data}
              setIdCompetitions={setIdCompetitions}
              reducerParticipations={reducerParticipations}
              reducerProfile={reducerProfile}
              apiselectProfile={apiselectProfile}
              apiselectProfileEmpty={apiselectProfileEmpty}
              apiParticipateInsert={apiParticipateInsert}
              apiParticipationsEmpty={apiParticipationsEmpty}
              apiParticipationsSelect={apiParticipationsSelect}
              apiParticipateUpdate={apiParticipateUpdate}
              apiCompetitionDeactivate={apiCompetitionDeactivate}
              apiCompetitionActivate={apiCompetitionActivate}
            />
          );
          // <TableRow key={index.js}>
          //   <TableCell align="center">
          //     <LongMenu
          //       setflagTypePage={setflagTypePage}
          //       setIdCompetitions={setIdCompetitions}
          //       data={item}
          //       apiselectProfile={apiselectProfile}
          //       reducerProfile={reducerProfile}
          //       apiselectProfileEmpty={apiselectProfileEmpty}
          //       apiParticipateInsert={apiParticipateInsert}
          //       idCompetitions={idCompetitions}
          //       apiParticipationsEmpty={apiParticipationsEmpty}
          //       apiParticipationsSelect={apiParticipationsSelect}
          //       reducerParticipations={reducerParticipations}
          //       apiParticipateUpdate={apiParticipateUpdate}
          //       apiCompetitionDeactivate={apiCompetitionDeactivate}
          //       apiCompetitionActivate={apiCompetitionActivate}
          //     />
          //   </TableCell>
          //   <TableCell align="center">
          //     {item.body.competition_title}{" "}
          //   </TableCell>
          //   <TableCell align="center">
          //     {dateMiladiToShamsi(item.body.start_date.split(" ")[0])}{" "}
          //   </TableCell>
          //   <TableCell align="center">
          //     {dateMiladiToShamsi(
          //       item.body.participation_deadline.split(" ")[0]
          //     )}{" "}
          //   </TableCell>
          //   <TableCell align="center">
          //     {item.body.is_active === "TRUE" ? "فعال" : "غیر فعال"}
          //   </TableCell>
          //   <TableCell align="center">
          //     {seprateNumberFromComma(item.body.required_bonus)}
          //   </TableCell>
          //   {/* <TableCell align="center">{item.body.bonus_type} </TableCell> */}
          //   <TableCell align="center">
          //     {seprateNumberFromComma(item.body.reward_bonus)}{" "}
          //   </TableCell>
          //   <TableCell align="center">
          //     <Buttons
          //       info={{
          //         title: "ویرایش مسابقه",
          //         className: "btnsBlue",
          //         modal: "EditModal",
          //         flagTypePage: flagTypePage,
          //         data: item,
          //       }}
          //       handleChangeRoute={""}
          //     />
          //     <Buttons
          //       info={{
          //         title: "ویرایش پاسخ",
          //         className: "btnsYellow",
          //         modal: "editResponseModal",
          //         flagTypePage: flagTypePage,
          //         data: item,
          //       }}
          //       handleChangeRoute={""}
          //     />
          //   </TableCell>
          // </TableRow>
        })}
      </Table>
    </>
  );
}
