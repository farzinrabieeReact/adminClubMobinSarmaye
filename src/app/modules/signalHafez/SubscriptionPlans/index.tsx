import React, { useState, useEffect } from "react";
import Table from "../../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/signalHafez/subscriptionPlans/select_subscriptionPlans";
import TableRow from "./tableRow/index";
import { handleNull } from "../../../common/method/displayData";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";
import { handelIs_active , handelDurationType } from "./method/index";
import { makeStyles } from "@material-ui/styles";
import Excel from './excel';
import ModalCustom from "../../../common/components/modal";
import ModalInsertSignal from "./modal/ModalInsertSignal";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../common/method/handleNotificationAlert';
import { insert_subscriptionPlans_dispatch } from '../../../../redux/signalHafez/subscriptionPlans/insert_subscriptionPlans';



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
      id: 2,
      label: "عنوان",
      title: "title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "امتیاز لازم",
      title: "required_bonus",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "توضیحات",
      title: "description",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "نوع بسته",
      title: "duration_type",
      active: false,
      type: "option",
      option: [
        { title: 'سال', value: 'year' },
        { title: 'ماه', value: 'month' },
        { title: 'روز', value: 'day' },
      ],
      format: (data: any) => handelDurationType(data)
    },
    {
      id: 6,
      label: "مدت زمان بسته",
      title: "duration_value",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "مدت زمان اشتراک(روز)",
      title: "duration_day",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
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
  ]

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [loading, setloading] = useState<any>(false)
  const [modalInsert, setmodalInsert] = useState<boolean>(false)
  const stateReducer = useSelector((state: any) => state.select_SubscriptionPlans_reducer);


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
      [],
      []
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectSubscriptionPlansAsync, payload: _data });
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
      ...date,
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  // const handleDate = (date: any) => {
  //   if (!date) return '-'
  //   let dateSplit = date.split(" ");
  //   return dateMiladiToShamsi(dateSplit[0]);
  // };


  const apiInsert = (data: any) => {

    try {

      let _data = { ...data }

      setloading(true)

      insert_subscriptionPlans_dispatch(_data)
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
      // dispatch(signal_v1_insert_actions(res))
    } catch {
      alert("در بارگیری فایل مشکلی به وجود آمده")
    }
  }


  return (
    <>
      <div
        className="w-100 d-flex justify-content-between align-items-center">
        <div>
          <button className="btnsBlue" onClick={() => setmodalInsert(true)}>
            پلن جدید
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
