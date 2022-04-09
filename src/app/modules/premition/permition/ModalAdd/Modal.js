import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField } from "@material-ui/core";

const ModalAdd = ({
  openModal,
  setOpenModal,
  classes,
  roleInputInsert,
  setRoleInputInsert,
  handleClickInsert
}) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openModal}>
          <div className="bg-white w-500px p-15 rounded-lg">
            <div className="mb-10">
              <TextField
                value={roleInputInsert}
                onChange={event => setRoleInputInsert(event.target.value)}
                // onKeyDown={(event: any) => event.keyCode === 13 ? handelSubmit() : ''}
                variant="outlined"
                size={"medium"}
                type="text"
                label={"نقش"}
                className="w-75 rounded-lg"
              />
            </div>
            <div className="'w-100 d-flex justify-content-end">
              <button className="btnsGreen" onClick={handleClickInsert}>
                ثبت
              </button>
              <button className="btnsGray">انصراف</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalAdd;
