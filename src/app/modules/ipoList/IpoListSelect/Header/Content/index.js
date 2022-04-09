import React, { useState } from "react";
import { Fade, makeStyles, Modal, Tooltip } from "@material-ui/core";
import { sepratePriceFromComma } from "../../../../../common/method/seprateNumberFromComma";
import { Refresh, ArrowBack, Add } from "@material-ui/icons";

import Excel from "../../../../../common/components/Excel";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import { useSelector } from "react-redux";
import RegisterNationId from "./registerNationId";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisbale: {
    color: "grey !important",
    border: "1px solid grey",
    backgroundColor: "white",
    borderRadius: "7px",
    marginLeft: "8px",
    padding: "4px 20px",
    cursor: "default",
    "& a": {
      color: "grey",
    },
  },
  content: {
    width: "96%",
    minHeight: "50px",
    margin: "1px auto",
    display: "flex",
    marginTop: 5,
    // backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ul: {
    padding: "10px 30px",
    width: "60%",
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-center",
    margin: 0,
  },
  fieldset: {
    border: "0 !important",
    width: "100%",
    height: "45px",
    borderRadius: "5px",
    "& legend": {
      color: "grey",
      fontSize: "12px",
    },
  },

  li: {
    margin: "0 15px",
  },
  text: {
    whiteSpace: "nowrap",
    paddingTop: "3px",
  },
  allRec: {
    border: "0 !important",
    width: "120px",
    height: "45px",
    borderRadius: "5px",
    marginRight: "15px",
    "& legend": {
      color: "grey",
      fontSize: "10px",
    },
  },
  h4: {
    textAlign: "center",
    marginLeft: "12px",
    fontSize: "15px",
  },
  allRecParent: {
    padding: "10px 30px",
  },
}));

const Content = ({
  valContent,
  data,
  clickReturnHeader,
  hanldeRefresh,
  stateFilter,
}) => {
  const styles = useStyles();
  const stateReducerExcel = useSelector((state) => state.excel_select_reducer);
  const [flagModal, setflagModal] = useState(false);
  const classes = useStyles();
  const [nationId, setnationId] = useState("");

  const handleChange = (event) => {
    setnationId(event.target.value);
    // console.log("eeeee",event.target.value)
  };

  const dataFild = [
    {
      name: "نام عرضه",
      value: `${valContent.body.stock_name}`,
    },
    {
      name: "حداکثر تعداد",
      value: `${valContent.body.max_quantity}`,
    },
    {
      name: "کل درخواست ها",
      value: `${valContent.body.total_value}`,
    },
    {
      name: "دامنه قیمت",
      value: `${sepratePriceFromComma(
        valContent.body.min_price
      )} تا ${sepratePriceFromComma(valContent.body.max_price)}`,
    },
  ];

  //----------------------------excelDate-------------------------------

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام سهم", key: "nameIpo" },
    { label: "نام", key: "name" },
    { label: "نام خانوادگی", key: "lastName" },
    { label: "کدملی	", key: "nationId" },
    { label: "کد معاملاتی", key: "code" },
    { label: "تاریخ و ساعت درخواست", key: "dateStart" },
    { label: "تاریخ و ساعت انصراف	", key: "dateEnd" },
    { label: "قیمت درخواست شده", key: "price" },
    { label: "حجم درخواست شده", key: "volume" },
    { label: "وضعیت پیش نیازها", key: "status" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        nameIpo: info.body.ipo_stock_name,
        name: info.body.member_first_name,
        lastName: info.body.member_last_name,
        nationId: info.body.member_national_id,
        code: info.body.member_bourse_account,
        dateStart: `${dateMiladiToShamsi(
          info.body.registration_date.split(" ")[0]
        )} ${info.body.registration_date.split(" ")[1].split(".")[0]}`,
        dateEnd: `${dateMiladiToShamsi(info.body.ipo_end_date.split(" ")[0])} ${
          info.body.ipo_end_date.split(" ")[1].split(".")[0]
        }`,
        price: info.body.requested_price,
        volume: info.body.requested_quantity,
        status:
          info.body.state === "NOT_PROCESSED"
            ? "دردست بررسی"
            : info.body.state === "FINALIZED"
            ? "تایید شده"
            : "رد شده",
      };
    });
    return dataExcel;
  };

  const handleClick = () => {
    setflagModal(true);
  };
  const handleExit = () => {
    handleClickButton();
  };

  const handleClickButton = () => {
    setflagModal(false);
    setnationId("");
  };

  return (
    <>
      <div className={styles.content}>
        <ul className={styles.ul}>
          {dataFild.map((textFild, index) => (
            <li className={styles.li} key={index}>
              <fieldset className={styles.fieldset}>
                <legend>{textFild.name}:</legend>
                <div className={styles.h4}>{textFild.value}</div>
              </fieldset>
            </li>
          ))}
          {/* <li>
            <button className="btnsBlue mt-5 ml-5" onClick={handleClick}>
              ثبت درخواست برای کاربر
            </button>
          </li> */}
        </ul>
        <div className="mt-5">
          <Tooltip title="ثبت درخواست برای کابر" placement="right-start">
            <Add
              // onClick={clickReturnHeader}
              // className="btnsGray"
              // fontSize={"large"}
              // className="btnIcon"
              style={{ fontSize: 30, marginLeft: 60, cursor: "pointer" }}
              onClick={handleClick}
            />
          </Tooltip>

          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            methodType={"select_registered_ipos"}
            tableApi={"ipo"}
            filename={"registered_ipos_report"}
          />
          <Refresh
            onClick={hanldeRefresh}
            className="btnIcon"
            // fontSize={"normal"}
          />
          <ArrowBack
            onClick={clickReturnHeader}
            // className="btnsGray"
            // fontSize={"large"}
            className="btnIcon"
          />
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={flagModal}
          onClose={() => handleClickButton()}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={flagModal}>
            <div>
              <RegisterNationId
                setnationId={setnationId}
                handleChange={handleChange}
                nationId={nationId}
                handleExit={handleExit}
                valContent={valContent}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Content;

// "نام عرضه", "حداکثر تعداد", "دامنه قیمت",
