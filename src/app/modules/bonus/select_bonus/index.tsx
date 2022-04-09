import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/bonus/select_bonus";
import TableRow from "./tableRow/index";
import { handleNumber } from "../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../common/method/date";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";

interface Pagination {
  number: number;
  count: number;
}

export default function Index({ findType, findStatus, setFilterExcel }: any) {
  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 2,
      label: "نام",
      title: "member_first_name",
      active: false,
      type: "text"
    },
    {
      id: 3,
      label: "نام خانوادگی",
      title: "member_last_name",
      active: false,
      type: "text"
    },

    {
      id: 4,
      label: "کد ملی",
      title: "member_national_id",
      active: false,
      type: "text"
    },
    {
      id: 5,
      label: "تاریخ ایجاد",
      title: "create_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 6,
      label: "تاریخ اعمال",
      title: "closing_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 7,
      label: "مقدار",
      title: "value",
      active: true,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 8,
      label: "امتیاز رزرو شده",
      title: "member_reserved_bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 9,
      label: "مانده امتیاز",
      title: "member_available_bonus",
      active: true,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 10,
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
      id: 11,
      label: "نوع",
      title: "bonus_type",
      active: false,
      type: "option",
      format: (data: any) => findType(data),
      option: [
        { title: "اضافه شده", value: "ADD" },
        { title: "خرج شده", value: "REMOVE" }
      ]
    },
    {
      id: 12,
      label: "کد تفصیلی",
      title: "member_account_code",
      active: false,
      type: "text"
    },

    {
      id: 14,
      label: "توضیحات ",
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
    },
    {
      id: 18,
      label: "از تاریخ اعمال",
      title: "closing_date_from",
      active: true,
      type: "date"
    },
    {
      id: 19,
      label: "تا تاریخ اعمال",
      title: "closing_date_to",
      active: true,
      type: "date"
    }
  ];
  ////////////////////////////////////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector((state: any) => state.select_bonus_reducer);
  const [sort, setSort] = useState({});

  const [headTable, setHeadTable] = useState<any>([]);
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({
    closing_date: null,
    create_date_from: null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////apiCall
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
      ["create_date_from", "create_date_to"],
      ["create_date_to"]
    );
    setFilterExcel(obj);

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectBonusAsync, payload: _data });
  };
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////function
  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit[0]);
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
            (itm: any, ind: any) => ind !== 4 && ind !== 5 && ind !== 6
          )}
          stateFilter={{
            create_date_from: null,
            create_date_to: null,

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
          );
        })}
      </Table>
    </>
  );
}
