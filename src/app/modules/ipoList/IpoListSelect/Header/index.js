import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// import { ipoList_select_excel_action } from "../../../../../boot/api/Definitions/ipoLIst/Excel_ipo/action";
import { useDispatch, useSelector } from "react-redux";
// import { SELECT_IPO_LIST_EMPTY } from "../../../../../boot/api/typeActions";
// import Excel from "../../../../Common/Components/Excel";

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ResgistrationIpo from './Modal/resgistrationIpo';
import { dateMiladiToShamsi } from "../../../../common/method/date";

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
}));

export default function Index({
  hanldeRefresh,
  clickReturn,
  handelShowFilterItems,
  stateFilter,
  ipo_id
}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [newButton, setNewButton] = useState(false);
  const [modal, setModal] = useState('')


  useEffect(() => {
    if (modal) {
      setNewButton(prev => !prev)
    }
  }, [modal])
  let newFilter = { ...stateFilter, ipo_id: ipo_id.id }


  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const dataButtons = [
    // { name: 'خروجی اکسل', type: '', className: 'btnsBlue' },
    { name: "ثبت درخواست برای کاربر", type: "", className: "btnsBlue" },
    // {name : 'تایید' , type:'' , className:'btnsGreen'},
    // {name : 'عدم تایید' , type:'' , className:'btnsRed'},
    // {name : 'ویرایش' , type:'' , className:'btnsYellow'},
    // {name : 'حذف' , type:'' , className:'btnsBlack'},
  ];

  const Components = {
    resgistrationIpo: <ResgistrationIpo setModal={setModal} setNewButton={setNewButton} ipo_id={ipo_id} />
  }

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };

  const handleFlag = () => {
    // dispatch({ type: SELECT_IPO_LIST_EMPTY });
    clickReturn();
  };



  // ________________________ExcelData___________________________
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
        dateStart: `${dateMiladiToShamsi(info.body.registration_date.split(" ")[0])} ${info.body.registration_date.split(" ")[1].split(".")[0]}`,
        dateEnd: `${dateMiladiToShamsi(info.body.ipo_end_date.split(" ")[0])} ${info.body.ipo_end_date.split(" ")[1].split(".")[0]}`,
        price: info.body.requested_price,
        volume: info.body.requested_quantity,
        status: info.body.state === "NOT_PROCESSED" ? "دردست بررسی" : info.body.state === "FINALIZED" ? "نهایی شده" : "رد شده"
      };
    });
    return dataExcel;
  };

  const handelClick = (key) => {
    switch (key) {
      case "ثبت درخواست برای کاربر":
        setModal('resgistrationIpo')
        break;

      default:
        break;
    }
  }


  // ______________________________________________________________
  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            <button
              key={index}
              className={data.className}
              onClick={() => handelClick(data.name)}
            >
              {data.name}
            </button>
          );
        })}
{/* 
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={newFilter}
          stateReducerExcel={stateReducerExcel}
          methodType={"select_registered_ipos"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"ipo"}
          valueTab={0}
          filename={'registered_ipos_report'}
        /> */}
      </div>
      <div className={Styles["icon"]} style={{ marginLeft: '20px' }}>
        <Button onClick={handleFlag} variant="outlined" color="secondary">
          بازگشت
        </Button>
        <FilterListIcon
          onClick={() => {
            handelShowFilterItems();
          }}
          className="disabledItems"
        />
        <RefreshIcon onClick={hanldeRefresh} />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <div style={{width:'100%'}}>
            {Components[modal]}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
