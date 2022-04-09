import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { handleNull, handleNumber } from "../../../common/method/displayData";
import { makeStyles } from "@material-ui/styles";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { actionTypes } from "../../../../redux/stock/stockDataManagement/stockDataManagement_select";
import Table from "../../../common/components/componentCustomTable";
import TableRow from "./tableRow/index";
import Excel from "./excel/index";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LinearProgress } from "@material-ui/core";
import AddStockManagement from "./addStockDataManagement/AddStockDataManagement";

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
const StockDataManagement = () => {
  const stateReducer = useSelector(
    (state: any) => state.stockDataManagement_select_reducer
  );

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
      label: "نام مخفف نماد",
      title: "18_char_persian_symbol",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "نام کامل شرکت",
      title: "30_char_persian_symbol",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "حداکثر قیمت مجاز",
      title: "max_permitted_price",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 5,
      label: "حدااقل قیمت مجاز",
      title: "min_permitted_price",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 6,
      label: "حجم مبنا",
      title: "base_volume",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 7,
      label: "بازار",
      title: "flow",
      active: true,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "ارزش کل",
      title: "total_value",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },

    {
      id: 10,
      label: "آخرین قیمت",
      title: "last_price",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 11,
      label: " قیمت بسته شدن",
      title: "close_price",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 12,
      label: "قدرت خرید حقیقی",
      title: "individual_buy_power",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 13,
      label: "قدرت خرید حقوقی",
      title: "non_individual_buy_power",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 14,
      label: "بازه قیمت",
      title: "price_range",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    }
  ];
  let headersTable = [
    {
      id: 15,
      label: "از قدرت خرید حقیقی",
      title: "individual_buy_power_from",
      active: true,
      type: "number"
    },
    {
      id: 16,
      label: "تا قدرت خرید حقیقی",
      title: "individual_buy_power_to",
      active: true,
      type: "number"
    },
    {
      id: 17,
      label: "از قدرت خرید حقوقی",
      title: "non_individual_buy_power_from",
      active: true,
      type: "number"
    },
    {
      id: 18,
      label: "تا قدرت خرید حقوقی",
      title: "non_individual_buy_power_to",
      active: true,
      type: "number"
    },
    {
      id: 19,
      label: "از بازه قیمت",
      title: "price_range_from",
      active: true,
      type: "number"
    },
    {
      id: 20,
      label: "تا بازه قیمت",
      title: "price_range_to",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    }
  ];

  const dispatch = useDispatch();
  let classes = useStles();
  const [newButton, setNewButton] = useState(false);
  const [FlagInsert, setFlagInsert] = useState(false);
  const [sort, setSort] = useState({});
  const [headTable, setHeadTable] = useState<any>([]);
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
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
  useEffect(() => {
    setHeadTable((prevState: any) => {
      return [...head, ...headersTable];
    });
  }, []);

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
    // obj = handeFilterForDate(
    //   obj,
    //   [
    //     "agm_date_from",
    //     "agm_date_to",
    //     "publish_date_from",
    //     "publish_date_to",
    //     "pay_date_from",
    //     "pay_date_to"
    //   ],
    //   ["agm_date_to", "publish_date_to", "pay_date_to"]
    // );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({
      type: actionTypes.selectStockDataManagementAsync,
      payload: _data
    });
  };
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit);
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  return (
    <>
      <div className={classes["head"]}>
        <AddStockManagement
          FlagInsert={FlagInsert}
          setFlagInsert={setFlagInsert}
          setflagApi={setflagApi}
        />
        {/*<AddStockCash*/}
        {/*    setNewButton={setNewButton}*/}
        {/*    newButton={newButton}*/}
        {/*    setflagApi={setflagApi}*/}
        {/*    stateReducerInsert={stateReducerInsert}*/}
        {/*/>*/}

        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={headTable.filter(
            (itm: any, ind: any) => ind !== 10 && ind !== 11 && ind !== 12
          )}
          stateFilter={stateTable}
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
              apiSubmit={apiSubmit}
            />
          );
        })}{" "}
      </Table>
    </>
  );
};

export default StockDataManagement;
