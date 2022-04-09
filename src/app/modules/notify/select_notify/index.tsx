import React, { useState, useEffect } from "react";
import Table from "../../../common/components/customTable/index";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/notify/select_nofify";
import { dateMiladiToShamsi } from "../../../common/method/date";
import Buttons from "./Buttons";
import Drawer from "../../../common/components/drawer";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import Excel from "../../../common/components/Excel";
import { LinearProgress } from "@material-ui/core";

interface Pagination {
  number: number;
  count: number;
}

export default function Index() {
  const dispatch = useDispatch();
  const stateReducer = useSelector((state: any) => state.select_notify_reducer);

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
    { id: 2, label: "عنوان", title: "name", active: false, type: "text" },
    {
      id: 3,
      label: "فرستنده",
      title: "sender_last_name",
      active: false,
      type: "text"
    },
    {
      id: 4,
      label: "منبع",
      title: "source",
      active: false,
      type: "option",
      option: [
        { title: "سرویس داخلی", value: "INTERNAL" },
        { title: "ادمین", value: "ADMIN" }
      ]
    },
    {
      id: 5,
      label: "گیرنده",
      title: "receiver_id",
      active: false,
      type: "text"
    },
    {
      id: 6,
      label: "وضعیت",
      title: "state",
      active: false,
      type: "option",
      option: [
        { title: "در صف ارسال", value: "IN_QUEUE" },
        { title: "ارسال شده", value: "SENT" },
        { title: "لغو شده", value: "NOT_SENT_Exception" },
        { title: "در حال ارسال ", value: "Pending In Queue" },
        { title: "رسیده به مخابرات", value: "Pending" },
        { title: "رسیده به گوشی", value: "Send Successfully" },
        { title: "نرسیده به گوشی", value: "Failed" },
        { title: "لیست سیاه", value: "Error In Send" },
        { title: "نرسیده به مخابرات", value: "Rejected" }
      ]
    },
    {
      id: 7,
      label: "نوع",
      title: "type",
      active: false,
      type: "option",
      option: [
        { title: "پیامک", value: "SMS" },
        { title: "ایمیل", value: "EMAIL" },
        { title: "وب", value: "WEB" }
      ]
    },
    {
      id: 8,
      label: "تاریخ شروع",
      title: "start_time",
      active: false,
      type: "date"
    },
    {
      id: 9,
      label: "تاریخ پایان",
      title: "end_time",
      active: true,
      type: "date"
    }
  ];

  const [sort, setSort] = useState({});
  const [stateTable, setStateTable] = useState<any>({});
  const [pagnation, setPagnation] = useState<Pagination>({
    number: 1,
    count: 2
  });
  const [state, setstate] = useState<any>([]);
  const [flag, setflag] = useState<boolean>(false);

  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );

  const submitTable = () => {
    apiSubmit();
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

    if (obj.start_time) {
      let date = convertDigitToEnglish(obj.start_time.format("YYYY/MM/DD"));
      obj.start_time = `${date} 00:00:00.000000`;
    }

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectNotifyAsync, payload: _data });
  };

  useEffect(() => {
    setstate(stateReducer.data);
    setPagnation((prev: any) => ({
      ...prev,
      count: Math.ceil(stateReducer.total / stateReducer.size)
    }));
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flag) {
      apiSubmit();
    } else {
      setflag(true);
    }
  }, [sort]); //eslint-disable-line react-hooks/exhaustive-deps

  const findSource = (key: string) => {
    switch (key) {
      case "INTERNAL":
        return "سرویس داخلی";
      case "ADMIN":
        return "ادمین";
      default:
        return "-";
    }
  };

  const findState = (key: string) => {
    switch (key) {
      case "IN_QUEUE":
        return "در صف ارسال";
      case "SENT":
        return "ارسال شده";
      case "NOT_SENT_Exception":
        return "لغو شده";
      case "Pending In Queue":
        return "در حال ارسال ";
      case "Pending":
        return "رسیده به مخابرات";
      case "Send Successfully":
        return "رسیده به گوشی";
      case "Failed":
        return "نرسیده به گوشی";
      case "Error In Send":
        return "لیست سیاه";
      case "Rejected":
        return "نرسیده به مخابرات";
      default:
        return "نامشخص";
    }
  };

  const findType = (key: string) => {
    switch (key) {
      case "SMS":
        return "پیامک";
      case "EMAIL":
        return "ایمیل";
      case "WEB":
        return "وب";
      default:
        return "-";
    }
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "عنوان ", key: "title" },
    { label: "فرستنده", key: "sender" },
    { label: "منبع", key: "source" },
    { label: "گیرنده", key: "get" },
    { label: "وضعیت", key: "status" },
    { label: "نوع", key: "roll" },
    { label: "تاریخ شروع", key: "dateStart" },
    { label: "تاریخ پایان", key: "dateEnd" },
    { label: "جزییات", key: "details" }
  ];

  const handleExcelDataRegister = () => {
    let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        title: info.body.name,
        sender: info.body.sender_last_name,
        source: info.body.source === "INTERNAL" ? "سرویس داخلی" : "ادمین",
        get: info.body.receiver_id === "null" ? "همه" : "شخص",
        status:
          info.body.state === "SENT"
            ? "ارسال شده"
            : info.body.state === "NOT_SENT_Exception"
            ? "لغو شده"
            : info.body.state === "IN_QUEUE"
            ? "در صف ارسال"
            : "نامشخص",
        roll: info.body.type,
        dateStart: dateMiladiToShamsi(info.body.start_time?.split(" ")[0]),
        dateEnd: dateMiladiToShamsi(info.body.end_time?.split(" ")[0]),
        // details: <div dangerouslySetInnerHTML={{ __html:info.body.content}}></div>
        details: removeTags(info.body.content)
      };
    });

    return dataExcel;
  };

  const removeTags = (str: any) => {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    //  debugger;
    let str1 = str.replace(/(<([^>]+)>)/gi, "");
    let str2 = str1.replace(/\r?\n|\r/g, "").trim();

    // let str2 = str1.text();
    return str2;
  };

  return (
    <>
      <div className="d-flex justify-content-end pr-5">
        <Drawer
          children={null}
          tableHead={head.filter((info, index) => index !== 7)}
          stateFilter={stateTable}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
          // handleValueISin={handleValueISin}
        />
        <span className="mx-2"></span>

        <Excel
          headers={headers}
          handleExcelData={handleExcelDataRegister}
          stateFilter={stateTable}
          methodType={"select_notifications"}
          methodType2={null}
          valueTab={0}
          tableApi={"notification"}
          filename={"notifications_report"}
        />
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
      >
        {state.map((item: any, index: any) => {
          return (
            <TableRow key={index}>
              <TableCell align="center">
                {pagnation.number !== 1
                  ? pagnation.number * stateReducer.size -
                    stateReducer.size +
                    (index + 1)
                  : index + 1}
              </TableCell>
              <TableCell align="center">
                {item.body.name === "null" ? "-" : item.body.name}{" "}
              </TableCell>
              <TableCell align="center">
                {item.body.sender_last_name === "null"
                  ? "-"
                  : item.body.sender_last_name}
              </TableCell>

              <TableCell align="center">
                {findSource(item.body.source)}
              </TableCell>
              <TableCell align="center">
                {item.body.receiver_id === "null" ? "همه" : "شخص"}
              </TableCell>
              <TableCell align="center">{findState(item.body.state)}</TableCell>
              <TableCell align="center">{findType(item.body.type)} </TableCell>
              <TableCell align="center">
                {dateMiladiToShamsi(item.body.start_time)}
              </TableCell>
              <TableCell align="center">
                {item.body.end_time
                  ? dateMiladiToShamsi(item.body.end_time)
                  : "-"}
              </TableCell>
              <TableCell
                className="colorInherit"
                align="center"
                style={{ width: 260 }}
              >
                <Buttons
                  info={{
                    title: "جزئیات",
                    color: "primary",
                    modal: "ModalDetails"
                  }}
                  data={item}
                  apiSubmit={apiSubmit}
                />
                <Buttons
                  info={{
                    title: "ویرایش",
                    color: "inherit",
                    modal: "ModalEdit"
                  }}
                  data={item}
                  apiSubmit={apiSubmit}
                />
                <Buttons
                  info={{
                    title: "حذف",
                    color: "secondary",
                    modal: "modalDelete"
                  }}
                  data={item}
                  apiSubmit={apiSubmit}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </>
  );
}
