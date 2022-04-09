import React, { useEffect, useState } from "react";
import { handleNumber } from "../../../../common/method/displayData";
import { dateMiladiToShamsi } from "../../../../common/method/date";
import Excel from "../../../../common/components/Excel";
import { useSelector } from "react-redux";
import Table from "../../../../common/components/componentCustomTable";
import { LinearProgress } from "@material-ui/core";

const HeadBonus = ({ findType, findStatus, filterExcel, valueTab }: any) => {
  const [total, setTotal] = useState({
    totalPos: 0,
    totalNeg: 0,
    total: 0
  });
  const stateReducer = useSelector((state: any) => state.select_bonus_reducer);
  const stateReducerReq = useSelector(
    (state: any) => state.select_bonus_requests_reducer
  );
  const stateReducerExcel = useSelector(
    (state: any) => state.excel_select_reducer
  );
  useEffect(() => {
    resultAllData();
  }, [stateReducer.data]);
  useEffect(() => {
    resultAllDataReq();
  }, [stateReducerReq.data]);

  const resultAllData = () => {
    let array = [...stateReducer.data];
    let pos = 0;
    let neg = 0;
    array.forEach((itm, ind) => {
      let flag = itm.body.bonus_type.includes("REMOVE_");
      if (flag) {
        neg += itm.body.value;
      }
      if (!flag) {
        pos += itm.body.value;
      }
    });
    setTotal({
      totalPos: pos,
      totalNeg: neg,
      total: pos - neg
    });
  };

  const resultAllDataReq = () => {
    let array = [...stateReducerReq.data];
    let pos = 0;
    let neg = 0;
    array.forEach((itm, ind) => {
      let flag = itm.body.bonus_type.includes("REMOVE_");
      if (flag) {
        neg += itm.body.value;
      }
      if (!flag) {
        pos += itm.body.value;
      }
    });
    setTotal({
      totalPos: pos,
      totalNeg: neg,
      total: pos - neg
    });
  };

  const handleDate = (date: any) => {
    let dateSplit = date.split(" ");

    return dateMiladiToShamsi(dateSplit[0]);
  };

  const headersExcel = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "کدملی", key: "member_national_id" },
    { label: "امتیاز رزرو شده", key: "member_reserved_bonus" },
    { label: "امتیاز در دسترس", key: "member_available_bonus" },
    { label: "کد تفصیلی", key: "member_account_code" },
    { label: "مقدار", key: "value" },
    { label: "تاریخ ایجاد", key: "create_date" },
    { label: "تازیخ اعمال", key: "closing_date" },
    { label: "وضعیت", key: "status" },
    { label: "نوع", key: "bonus_type" },
    { label: "توضیحات مبدا", key: "source_description" }
  ];
  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        member_first_name: info.body.member_first_name,
        member_last_name: info.body.member_last_name,
        member_national_id: info.body.member_national_id,
        member_reserved_bonus: handleNumber(info.body.member_reserved_bonus),
        member_available_bonus: handleNumber(info.body.member_available_bonus),
        member_account_code: info.body.member_account_code,
        value: info.body.value,
        create_date: handleDate(info.body.create_date),
        closing_date: handleDate(info.body.closing_date),
        status: findStatus(info.body.status),
        bonus_type: findType(info.body.bonus_type),
        source_description: info.body.source_description
      };
    });
    return dataExcel;
  };
  const headersExcel1 = [
    { label: "ردیف", key: "row" },
    { label: "شناسه کاربر", key: "member_id" },
    { label: "مقدار", key: "value" },
    { label: "تاریخ ایجاد", key: "create_date" },
    { label: "وضعیت", key: "status" },
    { label: "نوع", key: "bonus_type" },
    { label: "توضیحات مبدا", key: "source_description" }
  ];
  const handleExcelData1 = () => {
    let dataExcel1 = stateReducerExcel.data?.map((info: any, index: any) => {
      return {
        row: index + 1,
        member_id: info.body.member_id,
        value: handleNumber(info.body.value),
        create_date: handleDate(info.body.create_date),
        status: findStatus(info.body.status),
        bonus_type: findType(info.body.bonus_type),
        source_description: info.body.source_description
      };
    });
    return dataExcel1;
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        {valueTab === 0 && (
          <div>
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ position: "sticky", bottom: "0", fontSize: "19px" }}
            >
              <div className="d-flex mr-5">
                <p>مجموع:</p>
                <p>{handleNumber(total.total)}</p>
              </div>
              <div className="d-flex mr-5">
                <p>اضافه شده:</p>
                <p>{handleNumber(total.totalPos)}</p>
              </div>
              <div className="d-flex mr-5">
                <p>کسر شده:</p>
                <p>{handleNumber(total.totalNeg)}</p>
              </div>
            </div>
          </div>
        )}
        {valueTab === 1 && (
          <div>
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ position: "sticky", bottom: "0", fontSize: "19px" }}
            >
              <div className="d-flex mr-5">
                <p>مجموع:</p>
                <p>{handleNumber(total.total)}</p>
              </div>
              <div className="d-flex mr-5">
                <p>اضافه شده:</p>
                <p>{handleNumber(total.totalPos)}</p>
              </div>
              <div className="d-flex mr-5">
                <p>کسر شده:</p>
                <p>{handleNumber(total.totalNeg)}</p>
              </div>
            </div>
          </div>
        )}
        <div>
          {valueTab === 0 && (
            <Excel
              headers={headersExcel}
              handleExcelData={handleExcelData}
              stateFilter={filterExcel}
              methodType={"select"}
              tableApi={"bonus"}
              filename={"bonus"}
              valueTab={0}
              methodType2={null}
            />
          )}
          {valueTab === 1 && (
            <Excel
              headers={headersExcel1}
              handleExcelData={handleExcelData1}
              stateFilter={filterExcel}
              methodType={"select_bonus_requests"}
              tableApi={"bonus"}
              filename={"bonus_requests"}
              valueTab={0}
              methodType2={null}
            />
          )}
        </div>
      </div>
      {valueTab === 0 && stateReducer.loading ? <LinearProgress /> : null}
      {valueTab === 1 && stateReducerReq.loading ? <LinearProgress /> : null}
    </>
  );
};

export default HeadBonus;
