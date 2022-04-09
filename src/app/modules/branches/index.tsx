import React, { useState, useEffect } from "react";
import Table from "../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../redux/connect/branches_select/index";
import TableRow from "./tableRow/index";
import { handleNull } from "../../common/method/displayData";
import Drawer from "../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";
import {  handelIsBranch , handelIsActive , handelIsMainBranch} from "./method/index";
import { makeStyles } from "@material-ui/styles";
import Excel from './excel';
import ModalCustom from "../../common/components/modal";
import ModalInsertBranches from "./modal/ModalInsertBranches";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../common/method/handleNotificationAlert';
import { branches_insert } from "../../../redux/connect/branches_insert";


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
      label: "شعبه",
      title: "Name",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 3,
      label: "استان",
      title: "ProvinceName",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 4,
      label: "شهر",
      title: "CityName",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "مسئول",
      title: "DirectorName",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "آدرس",
      title: "Address",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "کد معرف شعبه",
      title: "recommender_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "تلفن",
      title: "PhoneNumber",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "کد",
      title: "CityCodePhoneNumber",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "فعال/غیرفعال",
      statusSort: true,
      title: "IsActive",
      active: false,
      type: "option",
      option: [
        { title: 'فعال', value: 'TRUE' },
        { title: 'غیر فعال', value: 'FALSE' },
      ],
      format: (data: any) => handelIsActive(data)
    },
    {
      id: 10,
      label: "شعبه/نمایندگی",
      statusSort: true,
      title: 'IsBranch',
      active: false,
      type: "option",
      option: [
        { title: 'شعبه', value: 'TRUE' },
        { title: 'نمایندگی', value: 'FALSE' },
      ],
      format: (data: any) => handelIsBranch(data)
    },
    {
      id: 11,
      label: "شعبه مرکزی",
      statusSort: true,
      title: 'IsMainBranch',
      active: false,
      type: "option",
      option: [
        { title: 'شعبه مرکزی', value: 'TRUE' },
      ],
      format: (data: any) => handelIsMainBranch(data)
    },
    {
      id: 12,
      label: "کد پستی",
      title: "PostalCode",
      active: false,
      type: "text",
      statusSort: true,
      format: (data: any) => handleNull(data)
    },
    {
      id: 13,
      label: "نقشه",
      title: 'GoogleMapUrl',
      active: true,
      type: "text",
      statusSort: true,
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
  const stateReducer = useSelector((state: any) => state.branches_select_reducer);



  let date = {

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
      [ ],
      [ ]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.branchesSelectAsync, payload: _data });
  };

  const apiInsert = (data: any) => {

    try {

      let _data = { ...data }


      setloading(true)

      branches_insert(
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




  return (
    <>
      <div
        className="w-100 d-flex justify-content-between align-items-center">

        <div>
          <button
            className={`btnsBlue`}
            onClick={() => setmodalInsert(true)}
          >
            افزودن شعبه 
          </button>
          {
            modalInsert && (
              <ModalCustom
                open={modalInsert}
                setOpen={setmodalInsert}
                className={classes.modal}
              >
                <ModalInsertBranches
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
