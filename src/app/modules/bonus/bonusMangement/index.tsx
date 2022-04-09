import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/bonus/select_bonus_management";
import TableRow from "./tableRow/index";
import { handleNumber , handleNumberTofixed4 } from "../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../common/method/date";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";

interface Pagination {
  number: number;
  count: number;
}

export default function Index() {
  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "تاریخ",
      title: "date_time",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 3,
      label: "تاریخ مرجع",
      title: "related_date_time",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 4,
      label: "کارمزد(ریالی)",
      title: "total_commission",
      active: true,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 5,
      label: "کارمزد(ریالی) مرجع",
      title: "related_total_commission",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "جمع امتیازات",
      title: "bonus_value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 7,
      label: "جمع امتیازات مرجع",
      title: "related_bonus_value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 8,
      label: "معادل ریالی امتیازات",
      title: "rial_equivalent",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data),

    },
    {
      id: 9,
      label: "معادل ریالی امتیازات مرجع",
      title: "related_rial_equivalent",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 10,
      label: "نسبت",
      title: "ratio",
      active: false,
      type: "text",
      format: (data: any) => handleNumberTofixed4(data)
    },
    {
      id: 11,
      label: "نسبت مرجع",
      title: "related_ratio",
      active: false,
      type: "text",
      format: (data: any) => handleNumberTofixed4(data)
    },

  ];

  let header = [
    ...head,
    {
      id: 12,
      label: " از تاریخ",
      title: "from_date_time",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 13,
      label: " تا تاریخ",
      title: "to_date_time",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 14,
      label: " از جمع امتیازات",
      title: "from_bonus_value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 15,
      label: " تا جمع امتیازات",
      title: "to_bonus_value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 16,
      label: " از کارمزد(ریالی)",
      title: "from_total_commission",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 17,
      label: " تا کارمزد(ریالی)",
      title: "to_total_commission",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },

  ]

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const stateReducer = useSelector((state: any) => state.select_bonus_management_reducer);

  const [stateTable, setStateTable] = useState<any>({
    date_time: null,
    related_date_time: null
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
        "date_time",
        "related_date_time",
        "from_date_time",
        "to_date_time"
      ],
      ['to_date_time']
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectBonusManagementAsync, payload: _data });
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
      date_time: null,
      related_date_time: null
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
        <Drawer
          children={null}
          tableHead={header.filter((item:any)=>item.title !== "total_commission")}
          stateFilter={{
            from_date_time: null,
            to_date_time: null,
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
    </>
  );
}
