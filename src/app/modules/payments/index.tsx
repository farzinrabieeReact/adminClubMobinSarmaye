import React, { useState, useEffect } from "react";
import Table from "../../common/components/componentCustomTable/index";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../redux/payments/select_payments";
import TableRow from "./tableRow/index";
import { handleNumber, handleNull } from "../../common/method/displayData";
import { dateMiladiToShamsi } from "../../common/method/date";
import Drawer from "../../common/components/drawer";
import RefreshIcon from "@material-ui/icons/Refresh";
import { handeFilterForDate } from "../../common/method/handeFilterForDate";
import { LinearProgress } from "@material-ui/core";
import { handelReturned_from_bank, handelIs_verified, handelTerminal_id } from "./method/index";
import { makeStyles } from "@material-ui/styles";
import Excel from './excel';

interface Pagination {
  number: number;
  count: number;
}

let useStyles = makeStyles({
  gridTable: {
    '&  div': {
      direction: 'rtl !important'
    }
  }
})

export default function Index() {

  let classes: any = useStyles()

  const head = [
    { id: 1, label: "ردیف", title: null, active: false, type: "" },
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
      label: "شماره پایانه",
      title: "terminal_id",
      active: false,
      type: "option",
      option: [
        { title: 'به پرداخت بانک ملت', value: "1" },
        { title: 'ایران کیش', value: "2" },
        { title: 'بانک سامان', value: "3" },
      ],
      format: (data: any) => handelTerminal_id(data)
    },
    {
      id: 6,
      label: "کد تفضیلی",
      title: "member_account_code",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 7,
      label: "شناسه اتوماسیون",
      title: "member_automation_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 8,
      label: "شناسه تراکنش",
      title: "payment_id",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 9,
      label: "بازگشت از بانک",
      title: "returned_from_bank",
      active: false,
      type: "option",
      option: [
        { title: 'دارد', value: 'TRUE' },
        { title: 'ندارد', value: 'FALSE' },
      ],
      format: (data: any, flag?: any) => handelReturned_from_bank(data, flag)
    },
    {
      id: 10,
      label: "نتیجه بازگشتی",
      title: "returned_result",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 11,
      label: "توضیحات",
      title: "returned_description",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },
    {
      id: 12,
      label: "مبلغ",
      title: "amount",
      active: false,
      type: "text",
      format: (data: any) => handleNumber(data)
    },
    {
      id: 13,
      label: "تاریخ تایید تراکنش",
      title: "verification_date",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 14,
      label: "تاریخ درخواست",
      title: "request_date",
      active: true,
      type: "date",
      format: (data: any) => (data && data !== 'null') ? handleDate(data) : '-'
    },
    {
      id: 15,
      label: "تایید تراکنش",
      title: "is_verified",
      active: false,
      type: "option",
      option: [
        { title: 'تایید شده', value: 'TRUE' },
        { title: 'تایید نشده', value: 'FALSE' },
      ],
      format: (data: any, flag?: any) => handelIs_verified(data, flag)
    },
    {
      id: 16,
      label: "وضعیت",
      title: "club_state",
      active: false,
      type: "text",
      format: (data: any) => handleNull(data)
    },

  ];

  let header = [
    ...head,
    {
      id: 17,
      label: "از تاریخ تایید تراکنش",
      title: "from_verification_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 18,
      label: "تا تاریخ تایید تراکنش",
      title: "to_verification_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 19,
      label: "از تاریخ درخواست",
      title: "from_request_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
    {
      id: 20,
      label: "تا تاریخ درخواست",
      title: "to_request_date",
      active: false,
      type: "date",
      format: (data: any) => handleDate(data)
    },
  ]

  const dispatch = useDispatch();

  const [sort, setSort] = useState({});
  const [state, setstate] = useState<any>([]);
  const [flagApi, setflagApi] = useState<boolean>(false);
  const stateReducer = useSelector((state: any) => state.select_payments_reducer);

  let date = {
    from_verification_date: null,
    to_verification_date: null,
    from_request_date: null,
    to_request_date: null,
    verification_date:null,
    request_date:null,
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
        "verification_date",
        "request_date",
        "from_verification_date",
        "to_verification_date",
        "from_request_date",
        "to_request_date",
      ],
      [
        "to_verification_date",
        "to_request_date",
      ]
    );

    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
      sort_by: sortRes
    };

    dispatch({ type: actionTypes.selectPaymentsAsync, payload: _data });
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

  const handleDate = (date: any) => {
    if (!date) return '-'
    let dateSplit = date.split(" ");
    return dateMiladiToShamsi(dateSplit[0]);
  };

  return (
    <>
      <div
        className="w-100 d-flex justify-content-end align-items-center">
        <Excel stateFilter={stateTable} Head={head} />
        <Drawer
          children={null}
          tableHead={header.filter((item:any)=> item.title !== "request_date" && item.title !== 'verification_date')}
          stateFilter={{
            ...date,
            ...stateTable,
          }}
          setStateFilter={setStateTable}
          apiSubmit={() => submitTable()}
        />
        <RefreshIcon className={"btnIcon"} onClick={() => handelRefresh()} />
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
