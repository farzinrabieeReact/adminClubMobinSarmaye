import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { handleNull } from "../../../common/method/displayData";
import { makeStyles } from "@material-ui/styles";
import TableRow from "./tableRow/index";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { actionTypes as actionTypesMarketer } from "../../../../redux/formManager/marketer/marketer_select";
import Excel from "../../../common/components/Excel/index";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";

interface Pagination {
  number: number;
  count: number;
}
let useStyles = makeStyles({
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
export const MarketerModule = () => {

  const head = useMemo(() => {
    return (
      [
        {
          id: 1,
          label: "ردیف",
          title: "",
          active: false,
          type: "text",
          format: (data: any) => data
        },
        {
          id: 2,
          label: "نام و خانوادگی",
          title: "sender_full_name",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 3,
          label: "تلفن همراه",
          title: "sender_phone",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 4,
          label: "پست الکترونیک",
          title: "sender_email",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 5,
          label: "متوسط گردش ماهیانه",
          title: "monthly_turnover",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 6,
          label: "مدت زمان فعالیت در بازار سرمایه",
          title: "duration_activity",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 7,
          label: "دلیل درخواست شعبه",
          title: "request_reasons",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        },
        {
          id: 8,
          label: "سوابق مدیریتی",
          title: "management_experiences",
          active: false,
          type: "text",
          format: (data: any) => handleNull(data)
        }
      ]
    )
  }, [])



  const dispatch = useDispatch();
  let classes = useStyles();
  ///////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector(
    (state: any) => state.marketer_select_reducer
  );

  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
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
      ["submit_date_from", "submit_date_to"],
      ["submit_date_to"]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    dispatch({
      type: actionTypesMarketer.selectMarketerAsync,
      payload: _data
    });
  };

  const handelRefresh = () => {
    setSort({});
    setStateTable({});
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  let headerPrimary = head.map((item: any) => {
    if (item.id === 1) {
      return {
        label: item.label,
        key: "row"
      };
    }

    return {
      label: item.label,
      key: item.title
    };
  });

  let headers = headerPrimary;

  const handleExcelData = () => {
    let { data } = stateReducerExcel;
    let arr: any = [];
    for (let i = 0; i < data.length; i++) {
      let obj: any = {};
      obj["row"] = i + 1;
      for (let j = 0; j < head.length; j++) {
        let value = data[i]["body"][head[j]["title"]];
        let valueWithFormat = head[j].format !== undefined ? head[j].format(value) : value;
        if (head[j].title) {
          obj[head[j].title] = valueWithFormat;
        }
      }
      arr.push(obj);
    }

    return arr;
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateTable}
          methodType={"select"}
          tableApi={"marketer"}
          filename={"marketer"}
          valueTab={0}
          methodType2={null}
        />

        <Drawer
          children={null}
          tableHead={head}
          stateFilter={stateTable}
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


