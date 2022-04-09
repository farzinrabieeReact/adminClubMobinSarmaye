import React from "react";
import Styles from "./index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
// import Excel from "../../../../Common/Components/Excel";
import Excel from '../../../../common/components/Excel'
import { dateMiladiToShamsi } from "../../../../common/method/date";

const HeaderUsers = ({ setFlagFilter, stateFilter, requestStatus, Isin,stateFilterExcel,handleRefresh }) => {

  const stateReducerExcel = useSelector((state) => state.excel_select_reducer);


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "شناسه سهم", key: "isin" },
    { label: "تاریخ ثبت درخواست ", key: "request_date" },
    { label: "وضعیت", key: "state" },
    { label: "توضیحات", key: "description" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        isin: Isin[info.body.isin] ? Isin[info.body.isin] : info.body.isin,
        request_date: dateMiladiToShamsi(info.body.request_date.split(' ')[0]),
        state: requestStatus(info.body.state),
        description: info.body.description,

      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={Styles["header"]}>
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateFilterExcel}
          methodType={"select_change_brokers"}
          tableApi={"changebroker"}
          filename={'change_brokers_report'}
        />


        <div className={Styles["icon"]}>
          {/* <FilterListIcon
            // className={'disabledItems'}
          onClick={() =>setFlagFilter((prev) => !prev) }
         
          /> */}

          <RefreshIcon
            onClick={() => handleRefresh()}

            className="btnIcon"
/>
        </div>
      </div>
    </>
  );
};

export default HeaderUsers;


