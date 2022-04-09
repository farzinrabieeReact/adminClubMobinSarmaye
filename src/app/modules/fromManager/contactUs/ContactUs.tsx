import React, { useEffect, useState } from "react";
import Table from "../../../common/components/componentCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { handleNull } from "../../../common/method/displayData";
import { makeStyles } from "@material-ui/styles";
import TableRow from "./tableRow/index";
import { dateMiladiToShamsi } from "../../../common/method/date";
import { actionTypes as actionTypesContactUs } from "../../../../redux/formManager/contactUS/contactUs_select/index";
import Excel from "../../../common/components/Excel/index";
import Drawer from "../../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../../common/method/handeFilterForDate";
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
const ContactUs = () => {
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
      label: "عنوان",
      title: "title",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 6,
      label: "تاریخ ثبت",
      title: "submit_date",
      active: true,
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
        { title: "پاسخ داده نشده", value: "SUBMITTED" },
        { title: "پاسخ داده شده", value: "ANSWERED" }
      ]
    }
  ];
  let headersTable = [
    {
      id: 8,
      label: "از تاریخ ثبت",
      title: "submit_date_from",
      active: true,
      type: "date"
    },
    {
      id: 9,
      label: "تا تاریخ ثبت",
      title: "submit_date_to",
      active: true,
      type: "date"
    }
  ];

  const dispatch = useDispatch();
  let classes = useStles();
  ///////////////////////////////////////////////////////////////////////////state
  const stateReducer = useSelector(
    (state: any) => state.contactUs_select_reducer
  );
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  const [sort, setSort] = useState({});
  const [headTable, setHeadTable] = useState<any>([]);
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
      type: actionTypesContactUs.selectContactUsAsync,
      payload: _data
    });
  };
  const findStatus = (status: any) => {
    switch (status) {
      case "SUBMITTED":
        return "پاسخ داده نشده";
      case "ANSWERED":
        return "پاسخ داده شده";
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

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام و نام خانوادگی", key: "sender_full_name" },
    { label: "تلفن همراه", key: "sender_phone" },
    { label: "پست الکترونیک", key: "sender_email" },
    { label: "عنوان", key: "title" },
    { label: "تاریخ ثبت", key: "submit_date" },
    { label: "وضیعت", key: "status" }
  ];
  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        sender_full_name: info.body.sender_full_name,
        sender_phone: info.body.sender_phone,
        sender_email: info.body.sender_email,
        title: info.body.title,
        submit_date: handleDate(info.body.submit_date),
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
          methodType={"select"}
          tableApi={"contactus"}
          filename={"contactus"}
          valueTab={0}
          methodType2={null}
        />

        <Drawer
          children={null}
          tableHead={headTable.filter((itm: any, ind: any) => ind !== 5)}
          stateFilter={{
            submit_date_from: null,
            submit_date_to: null,
            ...stateTable
          }}
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

export default ContactUs;
