import React, { useState } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Fade, Modal } from "@material-ui/core";
import Styles from "./index.module.scss";
import ModalInsert from "./modalInsert/ModalInsert";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router-dom";
export default function Header({
  handleRefreshButton,
  stateReducer,
  category,
  setFlagApi
}) {
  const [newButton, setNewButton] = useState(false);
  const { push } = useHistory();

  const dataButtons = [
    { name: "افزودن گروه", type: "", className: "btnsBlue" }
    // { name: "پست جدید", type: "", className: "btnsGreen" }
  ];
  const handleClick = ind => {
    if (ind === 0) {
      setNewButton(true);
    } else if (ind === 1) {
      push({
        pathname: "/content/newPost",
        state: stateReducer
      });
    }
  };

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            <button
              key={index}
              className={data.className}
              onClick={() => handleClick(index)}
            >
              {data.name}
            </button>
          );
        })}
      </div>

      {/*<div className={Styles["icon"]}>*/}
      {/*  <RefreshIcon*/}
      {/*    onClick={handleRefreshButton}*/}
      {/*    style={{ cursor: "pointer" }}*/}
      {/*  />*/}
      {/*</div>*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={newButton}
        onClose={() => setNewButton(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newButton}>
          <ModalInsert setNewButton={setNewButton} setFlagApi={setFlagApi} />
        </Fade>
      </Modal>
    </div>
  );
}
