import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import TableRow from "../requestCustomer/tableRow/index";
import { actionTypes as actionTypesBrokerCustomer } from "../../../../redux/clubmember/clubmember_select_broker_cutomer/index";
import { dateMiladiToShamsi } from "../../../common/method/date";
import Excel from "../../../common/components/Excel";
import RefreshIcon from "@material-ui/icons/Refresh";
import Drawer from "../../../common/components/drawer";
import { LinearProgress } from "@material-ui/core";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
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
const RequestCustomer = () => {
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
      label: "کدملی",
      title: "member_national_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 5,
      label: "تاریخ ثبت درخواست",
      title: "date_time",
      active: true,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 6,
      label: "شناسه ثبت نام",
      title: "registration_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },

    {
      id: 7,
      label: "وضیعت",
      title: "status",
      active: false,
      type: "option",
      option: [
        { title: "ردشده", value: "REJECTED" },
        { title: "ثبت در اتوماسیون", value: "REGISTERED" },
        { title: "اتمام ثبت ‌نام", value: "FINALIZED" },
        { title: "در انتظار", value: "NOT_PROCESSED" },
        { title: "نامشخص", value: "" }
      ],
      format: (data: any) => findStatus(data)
    }
  ];

  const dispatch = useDispatch();
  let classes = useStles();
  ///////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector(
    (state: any) => state.select_clubmember_brokerCustomer_reducer
  );
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const [stateTable, setStateTable] = useState<any>({
    date_time: null
  });
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  ///////////////////////////////////////////////////////////////////////////hook

  useEffect(() => {
    apiCallBrokerCustomer();
  }, [flagApi]);

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
    // dispatch({
    //   type: actionTypesBrokerCustomer.selecClubmemberBrokerCustomerLoad,
    //   payload: false
    // });
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  ////////////////////////////////////////////////////////////////////////////////////functionapi
  const apiCallBrokerCustomer = () => {
    let obj: any = {};
    let { size } = stateReducer;
    let { id, ...sortRes }: any = sort;

    Object.keys(stateTable).forEach((element: any) => {
      if (stateTable[element]) {
        obj[element] = stateTable[element];
      }
    });
    if (obj.date_time) {
      let date = obj.date_time.format("YYYY/MM/DD");
      date = convertDigitToEnglish(date);
      date = `${date} 00:00:00.000000`;
      obj.date_time = date;
    }

    // handleData()

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };
    // dispatch({
    //   type: actionTypesBrokerCustomer.selecClubmemberBrokerCustomerLoad,
    //   payload: true
    // });
    dispatch({
      type: actionTypesBrokerCustomer.selecClubmemberBrokerCustomerAsync,
      payload: _data
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////function
  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit);
  };
  const findStatus = (status: any) => {
    switch (status) {
      case "REJECTED":
        return "رد شده";
      case "REGISTERED":
        return "ثبت در اتوماسیون";
      case "FINALIZED":
        return "اتمام ثبت ‌نام";
      case "NOT_PROCESSED":
        return "در انتظار";
      default:
        return "نامشخص";
    }
  };
  const handleNull = (key: any) => {
    if (key === null || key === "" || key === "null") {
      return "_";
    } else {
      return key;
    }
  };
  const submitTable = () => {
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };
  const handelRefresh = () => {
    setSort({});
    setStateTable({
      date_time: null
    });
    setPagnation({ number: 1, count: 0 });
    setflagApi((prev: any) => !prev);
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "کدملی", key: "member_national_id" },
    { label: "تاریخ ثبت درخواست", key: "date_time" },
    { label: "شناسه ثبت نام", key: "registration_id" },
    { label: "وضیعت", key: "status" }
  ];
  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        member_first_name: info.body.member_first_name,
        member_last_name: info.body.member_last_name,
        member_national_id: info.body.member_national_id,
        date_time: handleDate(info.body.date_time),
        registration_id: handleNull(info.body.registration_id),
        status: findStatus(info.body.status)
      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={classes["head"]}>
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateTable}
          methodType={"select_broker_customers"}
          tableApi={"brokercustomer"}
          filename={"requestCustomer"}
          valueTab={0}
          methodType2={null}
        />

        <Drawer
          children={null}
          tableHead={head.filter((imt, ind) => imt.active === false)}
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
              item={item}
              head={head}
              index={index}
              pagnation={pagnation}
              stateReducer={stateReducer}
            />
          );
        })}{" "}
      </Table>
    </>
  );
};

export default RequestCustomer;
