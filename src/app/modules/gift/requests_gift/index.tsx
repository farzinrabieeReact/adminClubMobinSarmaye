import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from "./../../../../redux/gift/requestGift_select";
import { actionTypes as actionTypesActiveName } from "./../../../../redux/gift/gift_select_active_name";
import ComponentCustomTable from "../../../common/components/componentCustomTable";
import TableRow from "./TableRow";
import { handleNull, handleNumber, handleStatus } from "./../../../common/method/displayData";
import { dateMiladiToShamsi } from "./../../../common/method/date";
import { typeGift } from '../../../../redux/gift/type_gift';
import { handeFilterForDate } from '../../../common/method/handeFilterForDate';
import Header from "./header"
import { Box } from '@material-ui/core';
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";



interface Pagination {
  number: number;
  count: number;
}

const paramGiftname = "name"

export function RequestsGiftModule() {
  const dispatch = useDispatch();
  const stateReducer = useSelector((state: any) => state.requests_gift_select_Reducer);
  const stateReducerActiveName = useSelector((state: any) => state.gift_select_active_name_Reducer);
  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [selectMultiRow, setSelectMultiRow] = useState({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2,
  });
  const location = useLocation<any>()


  let headForFilter = [
    {
      id: 13,
      label: "تاریخ ثبت از",
      title: "registration_date_from",
      active: false,
      type: "date",
    },
    {
      id: 14,
      label: "تاریخ ثبت تا",
      title: "registration_date_to",
      active: false,
      type: "date",
    },
    {
      id: 15,
      label: "تاریخ بسته شدن از",
      title: "closing_date_from",
      active: false,
      type: "date",
    },
    {
      id: 16,
      label: "تاریخ بسته شدن تا",
      title: "closing_date_to",
      active: false,
      type: "date",
    },
    {
      id: 11,
      label: "نوع جایزه",
      title: "gift_type",
      active: false,
      type: "option",
      option: typeGift
        .map((item: any) => (
          { title: item.name, value: item.value }
        ))
    },
    {
      id: 12,
      label: "شناسه جایزه",
      title: "gift_id",
      active: false,
      type: "text",
    },
  ]

  let Head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: true,
      type: ""
    },
    {
      id: 2,
      label: "نام جایزه",
      title: "gift_name",
      active: false,
      type: "autocomplete",
      autocomplete: {
        list: stateReducerActiveName.data,
        optionLabel: paramGiftname
      },
      format: handleNull
    },
    {
      id: 3,
      label: "کد ملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: handleNull
    },
    {
      id: 4,
      label: "نام",
      title: "member_first_name",
      active: false,
      type: "text",
      format: handleNull
    },
    {
      id: 5,
      label: "نام خانوادگی",
      title: "member_last_name",
      active: false,
      type: "text",
      format: handleNull
    },
    {
      id: 8,
      label: "مانده امتیاز کاربر",
      title: "member_available_bonus",
      active: false,
      type: "text",
      format: handleNumber
    },
    
    {
      id: 6,
      label: "تاریخ درخواست",
      title: "registration_date",
      active: true,
      type: "date",
      format: dateMiladiToShamsi
    },
    {
      id: 7,
      label: "تاریخ بسته شدن",
      title: "closing_date",
      active: true,
      type: "date",
      format: dateMiladiToShamsi
    },
    {
      id: 8,
      label: "امتیاز جایزه",
      title: "gift_required_bonus",
      active: false,
      type: "text",
      format: handleNull
    },
    {
      id: 90,
      label: "کد کالا",
      title: "gift_code",
      active: false,
      type: "text",
      format: handleNull,
    },
    {
      id: 9,
      label: "کد رهگیری پستی",
      title: "postal_tracking_code",
      active: false,
      type: "text",
      format: handleNull,
    },
    {
      id: 10,
      label: "وضعیت",
      title: "status",
      active: false,
      type: "option",
      option: [
        { title: "در انتظار", value: "SUBMITTED" },
        { title: "نهایی شده", value: "FINALIZED" },
        { title: "لغو شده", value: "REJECTED" },
      ],
      format: handleStatus
    }
  ];

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setSelectMultiRow({})
    setflagApi((prev: any) => !prev)
  }

  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (element === "gift_name" && stateTable[element]) {
        obj[element] = stateTable[element][paramGiftname];
        return
      }
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });


    let _data = {
      data: handeFilterForDate(obj, ['registration_date_from', 'registration_date_to', 'closing_date_from', 'closing_date_to'], ["closing_date_to", "registration_date_to"]),
      from: pagnation.number,
      size: size,
      sort_by: sortRes,
    };

    dispatch({
      type: actionTypes.requestGiftSelectAsync,
      payload: _data,
    });
  }

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  useEffect(() => {
    dispatch({
      type: actionTypesActiveName.GiftSelectActiveNameAsync
    });
  }, [])

  useEffect(() => {
    apiSubmit();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location?.state?.gift_id) {
      setStateTable({ gift_id: location?.state?.gift_id })
      setflagApi(prev => !prev)
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size),
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


  if (!stateReducerActiveName.data.length) {
    return null
  }


  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          selectMultiRow={selectMultiRow}
          setSelectMultiRow={setSelectMultiRow}
          stateTable={stateTable}
          setStateTable={setStateTable}
          Head={Head}
          headForFilter={headForFilter}
          submitTable={submitTable}
          handelRefresh={handelRefresh}
          setflagApi={setflagApi}
          sort={sort}
        />
      </Box>

      {
        stateReducer.loading && (
          <Box position="fixed" top="50%" left="50%" zIndex="100">
            <CircularProgress />
          </Box>
        )
      }

      < ComponentCustomTable
        height={"tab"}
        head={Head}
        filterTable={stateTable}
        setFilterTable={setStateTable}
        sort={sort}
        setSort={setSort}
        pagnation={pagnation}
        setPagnation={setPagnation}
        submitTable={submitTable}
        setflagApi={setflagApi}
        selectMultiRow={selectMultiRow}
        setSelectMultiRow={setSelectMultiRow}
        stateReducer={stateReducer}
      >
        {
          stateReducer.data?.map((item: any, index: number) => (
            <TableRow
              setflagApi={setflagApi}
              pagnation={pagnation}
              stateReducer={stateReducer}
              head={Head}
              item={item}
              index={index}
              selectMultiRow={selectMultiRow}
              setSelectMultiRow={setSelectMultiRow}
            />
          ))
        }
      </ComponentCustomTable>
    </div >
  )
}