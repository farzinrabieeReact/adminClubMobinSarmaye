import React, { useEffect, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  Fade,
  Icon,
  Modal,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Styles from "../index.module.css";
import { Close, Telegram } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { actionTypes  } from "../../../../../../../redux/feedback/feedback_select_chat_body";
import { actionTypes as actionTypesFeedback } from "../../../../../../../redux/feedback/feedback_Select";
let useStles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },

  head: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "5px 0"
  },
  iconRefresh: {
    cursor: "pointer",
    margin: "0px 10px"
  },
  closeRed:{
    width:25,
    height:25,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'50%',
    backgroundColor:'rgb(255, 48, 48)',
    position:'absolute',
    top:'-10px',
    left:'-10px',
    cursor:"pointer"
  }
});
const ModalDetails = ({
  newButton,
  setNewButton,
  chatReducer,
  stateIndex,
  setstateChat,
  stateChat,
  apiFeedbackInsert,
  setStateModal,
  stateModal
}) => {
  const disptch = useDispatch();

  useEffect(() => {
    if (chatReducer.data.length !== 0) {
      setStateModal(chatReducer?.data);
    }
  }, [chatReducer]);
  useEffect(() => {
    return () => {
      setStateModal([]);
      disptch({ type: actionTypes.feedbackRemove });
      setTimeout(() => {
        disptch({ type: actionTypesFeedback.feedbackAsync, payload: {} });
      }, 500);
    };
  }, []);
  const handleChangeChat = (value, type) => {
    setstateChat(prev => {
      return { ...prev, [type]: value };
    });
  };
  const handleSubmit = () => {
    apiFeedbackInsert();

    setstateChat(prev => {
      return { ...prev, feedback: "" };
    });
  };
  const handleClose = () => {
    setNewButton(false);
    setstateChat({
      feedback: "",
      ticket_id: ""
    });
  };

  const classes = useStles();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newButton}>
          <div className="w-50 bg-white rounded-lg">
            <div className="d-flex justify-content-between w-100 p-5 position-relative">
            <div className={classes.closeRed}><Close style={{color:'white'}} onClick={handleClose}/></div>
              <div className="d-flex align-items-center">
                {/*<div className={Styles.profileChat}></div>*/}
                <div>
                  <h4>{stateIndex?.body.feedback_title}</h4>
                  {/*<span style={{ fontSize: "12px" }} className="text-dark-50">*/}
                  {/*  تیم پشتیبانی*/}
                  {/*</span>*/}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span>{stateIndex?.body.ticket_id}</span>
              </div>
            </div>

            <hr className="w-100 p-0 m-0" style={{ background: "gray" }} />
            <div
              className="w-100 my-5"
              style={{ height: "500px", overflow: "auto" }}
            >
           

              <div className="row m-0">
                {chatReducer.loading && (
                  <div>
                    <CircularProgress />
                  </div>
                )}
                {stateModal?.map((itm, ind) =>
                  itm.body.feedback && itm.body.type === "REQUEST" ? (
                    <div className="col-12 px-10 mb-3" key={ind}>
                      <div className={`${Styles.cardChat}`}>
                        <p
                          style={{ fontSize: "11px" }}
                        >{`${itm.body.member_first_name} ${itm.body.member_last_name}`}</p>
                        {itm.body.feedback}
                        <div
                          className="d-flex justify-content-end"
                          style={{ fontSize: "10px" }}
                        >
                          {/*{dateConvertMiladiToShamsi(*/}
                          {/*  itm.body.feedback_date.split(" ")[0]*/}
                          {/*)}*/}

                          {itm.body.feedback_date.split(" ")[1].split(".")[0]}
                        </div>
                        <span></span>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 d-flex justify-content-end px-10" key={ind}>
                      <div className={`${Styles.cardChat2} shadow`}>
                        {itm.body.feedback}
                        <div
                          className="d-flex justify-content-end"
                          style={{ fontSize: "10px" }}
                        >
                          {itm.body.feedback_date.split(" ")[1].split(".")[0]}
                        </div>
                        <span></span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <hr className="w-100 m-0 p-0" style={{ background: "gray" }} />
            <div className="d-flex">
              <div className="w-100 pl-4">
                <input
                  value={stateChat.feedback}
                  type="text"
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "0",
                    outline: "0"
                  }}
                  placeholder={"پاسخ خود را تایپ کنید"}
                  onChange={e => handleChangeChat(e.target.value, "feedback")}
                />
              </div>
              <div
                className="px-5 d-flex align-items-center"
                onClick={() => handleSubmit()}
              >
             
                <Telegram style={{ fill: "green", cursor: "pointer" }} />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDetails;
