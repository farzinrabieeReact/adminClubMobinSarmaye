import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/lottery/select_lottery/index";
import TableRow from "./tableRow/index";
import { handleNull } from "../../../common/method/displayData";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";
import { handelType, TypeLottery } from "./method/index";
import { makeStyles } from "@material-ui/styles";
import Excel from './excel';
import ModalCustom from "../../../common/components/modal";
import ModalInsertSignal from "./modal/ModalInsertLottery";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../common/method/handleNotificationAlert';
import { insert_lottery_dispatch } from "../../../../redux/lottery/insert_lottery";
import { dateMiladiToShamsi } from "../../../common/method/date";
// import { insert_signal_document_dispatch } from '../../../../redux/signalHafez/signals/insert_signals';


interface Pagination {
  number: number;
  count: number;
}

let useStyles = makeStyles({
  gridTable: {
    '&  div': {
      direction: 'rtl !important'
    }
  },
  modal: {
    width: '50%'
  }
})

export default function Index() {

  let classes: any = useStyles()

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    {
      id: 3,
      label: "نام",
      title: "member_first_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "نام خانوادگی",
      title: "member_last_name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "کد ملی ",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "عنوان قرعه کشی",
      title: "type",
      active: false,
      type: "option",
      option: [
        ...TypeLottery
      ],
      format: (data: any) => handelType(data)
    },
    {
      id: 7,
      label: "تاریخ",
      title: "date",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
  ];

  let header = [
    ...head.filter((item: any) => item.title && item.title !== 'date'),
    {
      id: 8,
      label: " از تاریخ",
      title: "start_date",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 9,
      label: " تا تاریخ",
      title: "end_date",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
  ]

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [loading, setloading] = useState<any>(false)
  const [modalInsert, setmodalInsert] = useState<boolean>(false)
  const stateReducer = useSelector((state: any) => state.select_lottery_reducer);


  let date = {
    'date':null,
    'start_date':null,
    'end_date':null,
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
        'date',
        'start_date',
        'end_date',
      ],
      [
        'end_date'
      ]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectLotteryAsync, payload: _data });
  };


  const apiInsert = (data: any) => {
    try {

      let _data = { ...data }


      setloading(true)

      insert_lottery_dispatch(
        handeFilterForDate(
          _data,
          [],
          []
        )
      )
        .then((result: any) => {
          let isOk = handleNotificationAlertTryUpdate(result);
          if (!isOk) {
            return;
          }
          setflagApi((prev: any) => !prev);
          setmodalInsert(false)
        })
        .catch((err: any) => {
          handleNotificationAlertCatch();
        })
        .finally(() => {
          setloading(false)
        })

    } catch {
      alert("در بارگیری فایل مشکلی به وجود آمده")
    }
  }


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
        className="w-100 d-flex justify-content-between align-items-center">

        <div>
          {/* <button
            className={`btnsBlue `}
            onClick={() => setmodalInsert(true)}
          >
            قرعه کشی جدید 
          </button> */}
          {
            modalInsert && (
              <ModalCustom
                open={modalInsert}
                setOpen={setmodalInsert}
                className={classes.modal}
              >
                <ModalInsertSignal
                  setOpen={setmodalInsert}
                  handleSubmitInsert={apiInsert}
                  loading={loading}
                />
              </ModalCustom>

            )
          }
        </div>
        <div className="w-100 d-flex justify-content-end align-items-center">
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
