import React, { useEffect, useState } from "react";
import Header from "./header/Hedear";
import Info from "./info/Info";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../common/components/componentCustomTable";
import { actionTypes as actionTypesBonusComputing } from "../../../../redux/bonus/bonusComputing/bonusComputing_select/index";
import { handleNull } from "../../../common/method/displayData";
import TableRow from "../bonusComputing/tableRow/index";
import { makeStyles } from "@material-ui/styles";
let flag = false;
interface Pagination {
  number: number;
  count: number;
}
let useStles = makeStyles({
  table: {
    height: "30vh"
  }
});
const BonusComputing = () => {
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
      label: "امتیاز",
      title: "bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "کمپین روزانه",
      title: "total_commission",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 4,
      label: "تاریخ",
      title: "_day",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "تاریخ اعتبار",
      title: "Credit_date",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "اعتبار",
      title: "Credit",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];
  const head2 = [
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
      format: (data: any) => handleNumber(data)
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
      label: "تاریخ شروع مغایرت",
      title: "conflict_from_date",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "تاریخ پایان مغایرت",
      title: "conflict_to_date",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "اختلاف امتیاز تخفیف پله ای روزانه",
      title: "diff_daily_turnover_score",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "اختلاف امتیاز معرف",
      title: "diff_introducer_turnover_score",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "اختلاف امتیاز معاملات آتی",
      title: "diff_monthly_future_turnover_score",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    }
  ];
  const classes = useStles();
  const stateReducer = useSelector(
    (state: any) => state.bonusComputing_select_reducer
  );
  const dispatch = useDispatch();
  const [stateReport, setStateRepoer] = useState<any>({
    start_date: null,
    finish_date: null,
    national_id: ""
  });
  
  const [flagApiCalculate, setFlagApiCalculate] = useState(false);
  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [headTable, setHeadTable] = useState<any>([]);
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
    if (flag) {
      apiSubmit();
    }
    flag = true;
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
    Object.keys(stateReport).forEach((element: any) => {
      if (stateReport[element]) {
        obj[element] = stateReport[element];
      }
    });
    if (obj.start_date && obj.finish_date) {
      let _data = {
        data: obj,
        from: pagnation.number,
        size: size,
        sort_by: sortRes
      };
      dispatch({
        type: actionTypesBonusComputing.selectBonusComputingAsync,
        payload: _data
      });
    } else {
      alert("همه فیلد ها را پر کنید");
      return;
    }
  };
  const handleNumber = (data: any) => {
    let number = data.toFixed(2);
    return number;
  };
  return (
    <>
      <Header
        value={stateReport}
        setValue={setStateRepoer}
        setflagApi={setflagApi}
        setFlagApiCalculate={setFlagApiCalculate}
        apiSubmit={apiSubmit}
      />
      <Info />
      <div className="my-5">
        <Table
          height={classes["table"]}
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
      </div>
      <div className="mt-5">
        <h4>تاریخچه محاسبه مجدد</h4>
        <Table
          height={classes["table"]}
          head={head2}
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
                head={head2}
                index={index}
                pagnation={pagnation}
                stateReducer={stateReducer}
                setflagApi={setflagApi}
              />
            );
          })}{" "}
        </Table>
      </div>
    </>
  );
};

export default BonusComputing;
