import React, { useEffect, useState } from "react";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import CardFile from "../../../../common/components/base64Images";
import ModalEdit from "../tableRow/buttonEdit/ModalEdit";

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
    textAlign: "right"
  }
}));

export default function Index({
  value,
  setValues,
  handelFile,
  apiInsertDiscount,
  setNewButton,
  stateReducerExcel,
  showInsertExcel,
  setShowInsertExcel
}) {
  const [flagModal, setFlagModal] = useState(false);

  const classes = useStles();

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
          href={"/media/excelExample/example.xlsx"}
          className={"btnsYellow"}
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
              src="/asset/image/nemooneExcel.png"
              alt=""
              style={{ width: "800px", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </Fade>
      </Modal>
      <div></div>
    </div>
  );
}
