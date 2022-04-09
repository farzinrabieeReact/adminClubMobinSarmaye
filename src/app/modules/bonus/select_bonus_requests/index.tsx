import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/bonus/select_bonus_requests";
import { dateMiladiToShamsi } from "../../../common/method/date";
import TableRow from "./tableRow/index";
import { handleNumber } from "../../../common/method/displayData";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";

interface Pagination {
  number: number;
  count: number;
}

export default function DashboardPage({
  findType,
  findStatus,
  setFilterExcel
}: any) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector(
    (state: any) => state.select_bonus_requests_reducer
  );

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نام",
      title: "member_first_name",
      active: true,
      type: "text"
    },
    {
      id: 3,
      label: "خانوادگی",
      title: "member_last_name",
      active: true,
      type: "text"
    },
    {
      id: 4,
      label: "کد ملی",
      title: "member_national_id",
      active: true,
      type: "text"
    },
    {
      id: 5,
      label: "مقدار",
      title: "value",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "تاریخ ایجاد",
      title: "create_date",
      active: true,
      type: "date",
      format: (data: any) => dateMiladiToShamsi(data)
    },

    {
      id: 7,
      label: "وضعیت",
      title: "status",
      active: false,
      type: "option",
      format: (data: any) => findStatus(data),
      option: [
        { title: "نهایی شده", value: "FINALIZED" },
        { title: "لغو شده", value: "REJECTED" },
        { title: "رزرو شده", value: "RESERVED" }
      ]
    },
    {
      id: 8,
      label: "نوع",
      title: "bonus_type",
      active: false,
      type: "text",
      format: (data: any) => findType(data)
    },

    {
      id: 9,
      label: "توضیحات مبدا",
      title: "source_description",
      active: false,
      type: "text"
    }
  ];
  let headers = [
    {
      id: 14,
      label: "حداقل مقدار",
      title: "min_value",
      active: true,
      type: "text"
    },
    {
      id: 15,
      label: "حداکثر مقدار",
      title: "max_value",
      active: true,
      type: "text"
    },
    {
      id: 16,
      label: "از تاریخ ایجاد",
      title: "create_date_from",
      active: true,
      type: "date"
    },
    {
      id: 17,
      label: "تا تاریخ ایجاد",
      title: "create_date_to",
      active: true,
      type: "date"
    }
    // {
    //   id: 18,
    //   label: "از تاریخ اعمال",
    //   title: "closing_date_from",
    //   active: true,
    //   type: "date"
    // },
    // {
    //   id: 19,
    //   label: "تا تاریخ اعمال",
    //   title: "closing_date_to",
    //   active: true,
    //   type: "date"
    // }
  ];

  const [sort, setSort] = useState({});
  const [flagApi, setflagApi] = useState(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [state, setstate] = useState<any>([]);
  const [headTable, setHeadTable] = useState<any>([]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////hook
  const dispatch = useDispatch();
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headers];
    });
  }, []);
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////apiCall

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
        "create_date_from",
        "create_date_to",
        "closing_date_from",
        "closing_date_to"
      ],
      ["closing_date_to", "create_date_to"]
    );
    setFilterExcel(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectBonusRequestsAsync, payload: _data });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////function

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit[0]);
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div
        className="w-100 d-flex justify-content-end align-items-center"
        style={{ position: "absolute", top: "126px", left: "92px" }}
      >
        <Drawer
          children={null}
          tableHead={headTable.filter(
            (itm: any, ind: any) => ind !== 4 && ind !== 5
          )}
          stateFilter={{
            create_date_from: null,
            create_date_to: null,
            closing_date_from: null,
            closing_date_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
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
            // <TableRow key={index.js}>
            //   <TableCell align="center">
            //     {pagnation.number !== 1
            //       ? pagnation.number * stateReducer.size -
            //         stateReducer.size +
            //         (index.js + 1)
            //       : index.js + 1}
            //   </TableCell>
            //   <TableCell align="center">{item.body.member_id} </TableCell>
            //   <TableCell align="center">
            //     {seprateNumberFromComma(item.body.value)}{" "}
            //   </TableCell>
            //   <TableCell align="center">
            //     {dateMiladiToShamsi(item.body.create_date)}{" "}
            //   </TableCell>
            //   <TableCell align="center">
            //     {item.body.closing_date
            //       ? dateMiladiToShamsi(item.body.closing_date)
            //       : "-"}
            //   </TableCell>
            //   <TableCell align="center">
            //     {findStatus(item.body.status)}{" "}
            //   </TableCell>
            //   <TableCell align="center">{item.body.bonus_type} </TableCell>
            //   <TableCell align="center">{item.body.source} </TableCell>
            //   <TableCell align="center">
            //     {item.body.source_description}{" "}
            //   </TableCell>
            //   <TableCell align="center">-</TableCell>
            // </TableRow>
          );
        })}
      </Table>
    </>
  );
}
