import React, { useState, useEffect } from "react";
import Table from "../../../../../../common/components/componentCustomTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../../../redux/Compatition/compatition_select_in_range";
import { seprateNumberFromComma } from "../../../../../../common/method/seprateNumberFromComma";
import { dateMiladiToShamsi } from "../../../../../../common/method/date";

interface Pagination {
  number: number;
  count: number;
}

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
}:any) {
  const dispatch = useDispatch();
  const stateReducer = useSelector(
    (state: any) => state.compatition_select_in_range_reducer
  );

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نام مسابقه",
      title: "competition_title",
      active: false,
      type: "text",
    },
    {
      id: 3,
      label: "تاریخ شروع مسابقه",
      title: "start_date",
      active: true,
      type: "date",
    },
    {
      id: 4,
      label: "تاریخ پایان مسابقه",
      title: "participation_deadline",
      active: true,
      type: "date",
    },
    // {
      {
        id: 5,
        label: "وضعیت",
        title: "is_active",
        active: false,
        type: "option",
        option: [
                  { title: 'فعال', value: 'TRUE' },
                  { title: 'غیر فعال', value: 'FALSE' },
              ]
        
      },
      {
        id: 6,
        label: "امتیاز شرکت در مسابقه",
        title: "required_bonus",
        active: false,
        type: "text",
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
      label: "جایزه شرکت در مسابقه",
      title: "reward_bonus",
      active: false,
      type: "text",
    },
    // { id: 9, label: "", title: "source_description", active: false, type: 'text' },
  ];

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);
  const [flagApi, setflagApi] = useState<boolean>(false);

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
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



  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({
      type: actionTypes.compatitionSelectActiveInRangeAsync,
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
    if (flag) {
      apiSubmit();
    } else {
      setflag(true);
    }
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  const findStatus = (key: string) => {
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
            <TableRow key={index}>
              <TableCell align="center">
                {pagnation.number !== 1
                  ? pagnation.number * stateReducer.size -
                    stateReducer.size +
                    (index + 1)
                  : index + 1}
              </TableCell>
              <TableCell align="center">{item.body.competition_title} </TableCell>
              <TableCell align="center">
              {dateMiladiToShamsi(item.body.start_date.split(' ')[0])}
              </TableCell>
              <TableCell align="center">
              {dateMiladiToShamsi(item.body.participation_deadline.split(' ')[0])}
              </TableCell>
              <TableCell align="center">
              {item.body.is_active === 'TRUE' ? 'فعال' : 'غیر فعال'}
              </TableCell>
              <TableCell align="center">
                {seprateNumberFromComma(item.body.required_bonus)}
              </TableCell>
              <TableCell align="center">{seprateNumberFromComma(item.body.reward_bonus)} </TableCell>
              <TableCell align="center"></TableCell>
              {/* <TableCell align="center">{seprateNumberFromComma(item.body.reward_bonus)} </TableCell> */}
              {/* <TableCell align="center">
                {item.body.source_description}{" "}
              </TableCell>
              <TableCell align='center' >-</TableCell> */}
            </TableRow>
          );
        })}
      </Table>
    </>
  );
}
