import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import ModalAdd from "./ModalAdd";
import { Modal, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Index({
  handelSubmitAdd,
  api_call_select,
  id,
  content,
}) {
  const dataButtons = [
    {
      name: (
        <EditIcon style={{ fontSize: 25, color: "orange", marginRight: 20 ,cursor:'pointer' }} />
      ),
      type: "",
      className: "",
    },
  ];
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            <Tooltip title="ویرایش راهنما" placement="top">
              <div
                key={index}
                className={data.className}
                onClick={() => {
                  setNewButton(!newButton);
                }}
              >
                {data.name}
              </div>
            </Tooltip>
          );
        })}
      </div>
      <div className={Styles["icon"]}>
        <RefreshIcon onClick={() => api_call_select()} className="btnIcon" />
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
          <ModalAdd
            id={id}
            content={content}
            setNewButton={setNewButton}
            handelSubmitAdd={handelSubmitAdd}
            api_call_select={api_call_select}
          />
        </Fade>
      </Modal>
    </div>
  );
}
