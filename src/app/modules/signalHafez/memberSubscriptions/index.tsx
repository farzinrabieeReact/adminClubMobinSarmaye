import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/signalHafez/memberSubscriptions/select_memberSubscriptions";
import TableRow from "./tableRow/index";
import { handleNull } from "../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../common/method/date";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";
import { handelIs_active, handelType } from "./method/index";
import { makeStyles } from "@material-ui/styles";
import Excel from './excel';


interface Pagination {
  number: number;
  count: number;
}

let useStyles = makeStyles({
  gridTable: {
    '&  div': {
      direction: 'rtl !important'
    }
  }
})

const handleStatus = (data: any) => {
  if (data === "REJECTED") {
    return <span style={{color:'red'}}>غیرفعال</span>
  }
  else if (data === "FINALIZED") {
    return "فعال"
  }
  return "نامشخص"
}

export default function Index() {

  let classes: any = useStyles()

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 3,
      label: "عنوان",
      title: "subscription_title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "توضیحات",
      title: null,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "کدملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
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
      id: 6,
      label: "تاریخ شروع",
      title: "start_date",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 6,
      label: "تاریخ پایان",
      title: "end_date",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 7,
      label: "وضعیت",
      title: "status",
      active: false,
      type: "option",
      option: [
        { title: 'فعال', value: "FINALIZED" },
        { title: 'غیرفعال', value: "REJECTED" },
      ],
      format: (data: any) => handleStatus(data)
    },
    {
      id: 3,
      label: "ابزار",
      title: null,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
  ];

  let header = [
    ...head.filter((item: any) =>
      item.title &&
      item.label !== 'تاریخ شروع' &&
      item.label !== 'تاریخ پایان'
    ),
    {
      id: 11,
      label: "از تاریخ شروع",
      title: "start_date_from",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 10,
      label: "تا تاریخ شروع",
      title: "start_date_to",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 10,
      label: "از تاریخ پایان",
      title: "end_date_from",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 10,
      label: "تا تاریخ پایان",
      title: "end_date_to",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },

  ]

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const stateReducer = useSelector((state: any) => state.select_memberSubscriptions_reducer);



  let date = {
    start_date: null,
    end_date: null,
    start_date_from: null,
    start_date_to: null,
    end_date_from: null,
    end_date_to: null,
  }

  const [stateTable, setStateTable] = useState<any>({
    ...date
  });

  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });


  const apiSubmit = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    obj = handeFilterForDate(
      obj,
      [
        "start_date",
        "end_date",
        "start_date_from",
        "start_date_to",
        "end_date_from",
        "end_date_to",
      ],
      [
        "start_date_to",
        "end_date_to",
      ]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectMemberSubscriptionsAsync, payload: _data });
  };

  useEffect(() => {
    apiSubmit();
  }, [flagApi]);


  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps


  const handelRefresh = () => {
    setSort({});
    setStateTable({
      ...date,
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const handleDate = (date: any) => {
    if (!date) return '-'
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit[0]);
  };



  return (
    <>
      <div
        className="w-100 d-flex justify-content-end align-items-center">
        <Excel
          stateFilter={stateTable}
          Head={
            head.filter((item: any) => item.label !== 'فایل' && item.label !== "ابزار")
          }
        />
        <Drawer
          children={null}
          tableHead={header}
          stateFilter={{
            ...date,
            ...stateTable,
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      <div
        style={{ paddingTop: !stateReducer.loading ? '4px' : '0px' }}>
        {
          stateReducer.loading && (
            <LinearProgress />
          )
        }
      </div>
      <div className={classes.gridTable}>
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
          loading={stateReducer.loading}
        >
          {state.map((item: any, index: any) => {
            return (
              <TableRow
                key={index}
                item={item}
                head={head}
                index={index}
                pagnation={pagnation}
                stateReducer={stateReducer}
                setflagApi={setflagApi}
              />
            );
          })}
        </Table>
      </div>
    </>
  );
}
