import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/signalHafez/signals/select_signals";
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
import ModalCustom from "../../../common/components/modal";
import ModalInsertSignal from "./modal/ModalInsertSignal";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../common/method/handleNotificationAlert';
import { insert_signal_document_dispatch } from '../../../../redux/signalHafez/signals/insert_signals';


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
      label: "نام نماد",
      title: "stock_symbol",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "عنوان",
      title: "title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "نوع تحلیل",
      title: "type",
      active: false,
      type: "option",
      option: [
        { title: 'تکنیکال', value: "Technical" },
        { title: 'بنیادی', value: "Fundamental" },
        { title: 'تکنیکال-بنیادی', value: "Technical-Fundamental" },
      ],
      format: (data: any, flag?: any) => handelType(data, flag)
    },
    {
      id: 6,
      label: "زمان ثبت",
      title: "insert_date_time",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 7,
      label: "وضعیت",
      title: "is_active",
      active: false,
      type: "option",
      option: [
        { title: 'فعال', value: "TRUE" },
        { title: 'غیرفعال', value: "FALSE" },
      ],
      format: (data: any, flag?: any) => handelIs_active(data, flag)
    },
    {
      id: 8,
      label: "فایل",
      title: null,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "ابزار",
      title: null,
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },

  ];

  let header = [
    ...head.filter((item: any) => item.title),
    {
      id: 10,
      label: "از تاریخ ثبت",
      title: "insert_date_time_from",
      active: false,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 11,
      label: "تا تاریخ ثبت",
      title: "insert_date_time_to",
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
  const stateReducer = useSelector((state: any) => state.select_signals_reducer);



  let date = {
    insert_date_time: null,
    insert_date_time_from: null,
    insert_date_time_to: null
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
        "insert_date_time",
        "insert_date_time_from",
        "insert_date_time_to",
      ],
      [
        "insert_date_time_to",
      ]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectSignalsAsync, payload: _data });
  };

  const apiInsert = (data: any) => {

    try {
      let document = data.document.substr(data.document.indexOf(',') + 1)
      let _data = { ...data, document }


      setloading(true)

      insert_signal_document_dispatch(
        handeFilterForDate(
          _data,
          ['insert_date_time'],
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
        .catch(err => {
          handleNotificationAlertCatch();
        })
        .finally(() => {
          setloading(false)
        })
      // dispatch(signal_v1_insert_actions(res))
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
          <button
            className={`btnsBlue`}
            onClick={() => setmodalInsert(true)}
          >
            تحلیل جدید
          </button>
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
