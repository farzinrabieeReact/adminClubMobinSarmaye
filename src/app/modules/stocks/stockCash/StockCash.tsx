import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { handleNull, handleNumber } from "../../../common/method/displayData";
import TableRow from "./tableRow/index";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { actionTypes as actionTypesCodal } from "../../../../redux/stock/stockCash/stockCash_select_codal_participation";
import { dateMiladiToShamsi } from "../../../common/method/date";
import RefreshIcon from "@material-ui/icons/Refresh";
import Excel from "./excel/index";
import Drawer from "../../../common/components/drawer/index";
import { LinearProgress } from "@material-ui/core";
import AddStockCash from "./addStockCash/AddStockCash";

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
const StockCash = () => {
  const stateReducer = useSelector(
    (state: any) => state.stockCash_Select_codal_reducer
  );
  const stateReducerInsert = useSelector(
    (state: any) => state.stockCash_insert_Reducer
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
      label: "نماد",
      title: "stock_symbol",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "شرکت",
      title: "company_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "تاریخ مجمع",
      title: "agm_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 8,
      label: "تعداد سهام",
      title: "stocks",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },

    {
      id: 10,
      label: "ارزش سود",
      title: "dividend_value",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 11,
      label: "سود ناخالص نقدی توزیع شده",
      title: "distributed_gross_margin",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 12,
      label: "سود خالص نقدی توزیع شده",
      title: "distributed_netincome",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 13,
      label: "تاریخ اعلام",
      title: "publish_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 14,
      label: "تاریخ پرداخت",
      title: "pay_date",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 15,
      label: "قیمت سهم پیش از مجمع",
      title: "pre_price_stock_agm",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },

    {
      id: 16,
      label: "قیمت سهام پس از مجمع",
      title: "post_price_stock_agm",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },

    {
      id: 17,
      label: "ارزش سهام پس از مجمع",
      title: "pre_value_stock",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 18,
      label: "ارزش سهام پیش از مجمع",
      title: "post_value_stock",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 19,
      label: "سرمایه شرکت",
      title: "company_asset",
      active: false,
      type: "number",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 20,
      label: "سود خالص تحقق یافته",
      title: "valid_netincome",
      active: false,
      type: "numbeer",
      format: (data: any) => handleNumber(data)
    }
  ];
  let headersTable = [
    {
      id: 21,
      label: "از تاریخ مجمع",
      title: "agm_date_from",
      active: true,
      type: "date"
    },
    {
      id: 22,
      label: "تا تاریخ مجمع",
      title: "agm_date_to",
      active: true,
      type: "date"
    },
    {
      id: 23,
      label: "از تاریخ اعلام",
      title: "publish_date_from",
      active: true,
      type: "date"
    },
    {
      id: 24,
      label: "تا تاریخ اعلام",
      title: "publish_date_to",
      active: true,
      type: "date"
    },
    {
      id: 25,
      label: "از تاریخ پرداخت",
      title: "pay_date_from",
      active: true,
      type: "date"
    },
    {
      id: 26,
      label: "تا تاریخ پرداخت",
      title: "pay_date_to",
      active: true,
      type: "date"
    }
  ];

  const dispatch = useDispatch();
  let classes = useStles();
  const [newButton, setNewButton] = useState(false);
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
    obj = handeFilterForDate(
      obj,
      [
        "agm_date_from",
        "agm_date_to",
        "publish_date_from",
        "publish_date_to",
        "pay_date_from",
        "pay_date_to"
      ],
      ["agm_date_to", "publish_date_to", "pay_date_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({ type: actionTypesCodal.selectCodalAsync, payload: _data });
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
        <AddStockCash
          setNewButton={setNewButton}
          newButton={newButton}
          setflagApi={setflagApi}
          stateReducerInsert={stateReducerInsert}
        />

        <Excel stateFilter={stateTable} Head={head} />

        <Drawer
          children={null}
          tableHead={headTable.filter(
            (itm: any, ind: any) => ind !== 6 && ind !== 11 && ind !== 12
          )}
          stateFilter={{
            agm_date_from: null,
            agm_date_to: null,
            publish_date_from: null,
            publish_date_to: null,
            pay_date_from: null,
            pay_date_to: null,
            ...stateTable
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />

        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
      </div>
      {stateReducer.loading ? <LinearProgress /> : null}
      {stateReducerInsert.loading ? <LinearProgress /> : null}
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

export default StockCash;
