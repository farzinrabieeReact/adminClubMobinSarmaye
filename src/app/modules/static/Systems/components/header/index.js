import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ModalAdd from "./modalAdd";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addbtn: {
    fontSize: 25,
    color: "Blue",
    marginRight: 20,
    cursor: "pointer",
  },
}));

function Header({ api_call_select, dataPrev }) {
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);
  const dataButtons = [
    { name: "افزودن لینک ", type: "", className: classes.addbtn },
  ];

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            <AddIcon
              key={index}
              className={data.className}
              onClick={() => {
                setNewButton(!newButton);
              }}
            />
          );
        })}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => setNewButton(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalAdd
            setNewButton={setNewButton}
            dataPrev={dataPrev}
            api_call_select={api_call_select}
            
          />
        </Fade>
      </Modal>

      <div className={Styles["icon"]}>
        <RefreshIcon onClick={api_call_select} className="btnIcon" />
      </div>
    </div>
  );
}
export default Header;
