import React, { useEffect, useState } from "react";
import { Backdrop, Fade, LinearProgress, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import CardFile from "../../../../common/components/base64Images";

const useStles = makeStyles(() => ({
  card: {
    width: "25%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5
  },
  file: {
    backgroundColor: "white"
  },
  btns: {
    textAlign: "right",
    display: "flex",
    justifyContent: "end"
  }
}));

export default function ModalInsert({
  setNewButton,
  setflagApi,
  handelFile,
  apiInsertDiscount,
  value,
  setValues
}) {
  const classes = useStles();
  const dispatch = useDispatch();
  const [flagModal, setFlagModal] = useState(false);
  const [state, setstate] = useState(initState);
  const [loading, setloading] = useState(false);
  //

  const handleChange = (value, type) => {
    setstate(prev => ({
      ...prev,
      body: {
        ...prev.body,
        [type]: value
      }
    }));
  };
  useEffect(() => {
    return () => {
      setValues({ file_name: "", file: "" });
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes["card"]}>
      <div className={classes["file"]}>
        <CardFile value={value} setValues={data => handelFile(data)} />
      </div>
      <br />
      <div className={classes["btns"]}>
        <a
          download
          className={"btnsYellow"}
          href={"/media/excelExample/exampleStockCash.xlsx"}
        >
          نمونه از فایل اکسل
        </a>
        <button
          className={"btnsRed"}
          onClick={() => setNewButton(prev => !prev)}
        >
          لغو
        </button>
        <button className={"btnsGreen"} onClick={() => apiInsertDiscount()}>
          تایید
        </button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagModal}
        onClose={() => setFlagModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagModal}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "50px" }}
          >
            <img
              src="/asset/image/nemooneExcelStockCash.png"
              alt=""
              style={{ width: "98%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

let initState = {
  id: "",
  body: {
    member_first_name: "",
    member_last_name: "",
    member_national_id: "",
    company_name: "",
    stock_symbol: "",
    agm_date: null,
    stocks: "",
    dividend_value: "",
    distributed_gross_margin: "",
    distributed_netincome: "",
    publish_date: null,
    pay_date: null,
    pre_price_stock_agm: "",
    post_price_stock_agm: "",
    pre_value_stock: "",
    post_value_stock: "",
    company_asset: "",
    valid_netincome: ""
  }
};
