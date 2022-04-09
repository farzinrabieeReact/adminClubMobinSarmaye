import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "./tableRow/index";
import { useDispatch, useSelector } from "react-redux";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { actionTypes as actionTypesGiftCash } from "../../../../redux/gift/giftCash_select_onlineCharge";
import { handleNull } from "../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { makeStyles } from "@material-ui/styles";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer/index";
import Excel from "./excel/index";
import { Box, LinearProgress } from "@material-ui/core";
interface Pagination {
  number: number;
  count: number;
}
let useStles = makeStyles({
  head: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5px 0"
  },
  iconRefresh: {
    cursor: "pointer",
    margin: "0px 10px"
  }
});
const GiftCash = () => {
  const head = [
    {
      id: 1,
      label: "ردیف",
      title: null,
      active: false,
      type: ""
    },
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
      label: "عنوان جایزه",
      title: "online_charge_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "مبلغ",
      title: "online_charge_amount",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },

    {
      id: 7,
      label: "امتیاز مورد نیاز",
      title: "online_charge_required_bonus",
      active: false,
      type: "text"
    },
    {
      id: 8,
      label: "تاریخ",
      title: "registration_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 7,
      label: "وضعیت",
      title: "status",
      active: false,
      type: "option",
      format: (data: any) => findStatus(data),
      option: [
        { title: "در انتظار", value: "SUBMITTED" },
        { title: "لغو شده", value: "REJECTED" },
        { title: "نهایی شده", value: "FINALIZED" }
      ]
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ",
      title: "registration_date_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ",
      title: "registration_date_to",
      active: true,
      type: "date"
    }
  ];

  const dispatch = useDispatch();
  let classes = useStles();
  ///////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector(
    (state: any) => state.giftCash_select_onlineCharge_reducer
  );
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const [sort, setSort] = useState({});
  const [headTable, setHeadTable] = useState<any>([]);

  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({
    date_time: null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit);
  };
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headersTable];
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
  }, [stateReducer]);

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
      ["registration_date_from", "registration_date_to"],
      ["registration_date_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({
      type: actionTypesGiftCash.giftCashSelectOnlineChargeAsync,
      payload: _data
    });
  };
  const findStatus = (key: any) => {
    switch (key) {
      case "SUBMITTED":
        return "در انتظار";
      case "REJECTED":
        return "لغو شده";
      case "FINALIZED":
        return "نهایی شده";
      default:
        return "نامشخص";
    }
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel stateFilter={stateTable} Head={head} />
        <Drawer
          children={null}
          tableHead={headTable.filter((imt: any, ind: number) => ind !== 7)}
          stateFilter={{
            registration_date_from: null,
            registration_date_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />

        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      {stateReducer.loading ? <LinearProgress /> : null}
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
        })}{" "}
      </Table>
    </>
  );
};

export default GiftCash;
