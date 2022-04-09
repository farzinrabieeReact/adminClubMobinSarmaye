import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import ModalDetails from "./modalDetails/ModalDetails";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../../common/method/handleNotificationAlert";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesChatBody } from "../../../../../../redux/feedback/feedback_select_chat_body";
import { actionTypes } from "../../../../../../redux/feedback/feedback_Select";
import { feedbackInsert } from "../../../../../../redux/feedback/feedBack_insert";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { actionTypes as notifAlert } from "../../../../../../redux/notificationAlert";
let useStles = makeStyles({
  Circle: {
    backgroundColor: "#0073e9",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "relative",
  },
  CircleRed: {
    backgroundColor: "crimson",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "absolute",
    top: "33px",
    right: 0,
  },
  hover: {
    "&:hover": {
      backgroundColor: "rgb(232, 232, 232)",
      transition: "all 0.2s",
      cursor: "pointer",
    },
  },
  hover2: {
    borderBottom: "1px solid lightgray",
    "&:hover": {
      borderBottom: "1px solid gray",
      transition: "all 0.2s",
      cursor: "pointer",
    },
  },
});
const Answer = () => {
  let classes = useStles();
  const [stateModal, setStateModal] = useState([]);
  const [stateChat, setstateChat] = useState({
    feedback: "",
    ticket_id: "",
  });
  const [newButton, setNewButton] = useState(false);
  const [stateIndex, setstateIndex] = useState();
  let dispatch = useDispatch();

  const reducerFeedback = useSelector(
    (state) => state.reducerFeedbackSelectList
  );
  const chatReducer = useSelector((state) => state.feedBack_Select_ChatBody);

  const apiFeedbackInsert = () => {
    // if (state) {
    let ticket = {
      data: {
        ticket_id: stateChat.ticket_id,
      },
    };
    let data = {
      feedback: stateChat.feedback,
      ticket_id: stateChat.ticket_id,
    };

    feedbackInsert(data)
      .then((res) => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        setTimeout(() => {
          dispatch({
            type: actionTypesChatBody.selectChatBodyAsync,
            payload: ticket,
          });
        }, 1000);
        setTimeout(() => {
          let data = {
            after_key: null,
            // from: pagnation.nember,
          };
          dispatch({ type: actionTypes.feedbackAsync2, payload: data });
        }, 2000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const handleClickField = (e, item, index) => {
    setstateIndex(reducerFeedback.data[index]);
    setNewButton(true);
    let data = {
      data: {
        ticket_id: item.body.ticket_id,
      },
    };
    dispatch({ type: actionTypesChatBody.selectChatBodyAsync, payload: data });
    setstateChat((prevState) => {
      return { ...prevState, ticket_id: item.body.ticket_id };
    });
  };

  const handleCopy = (event, value) => {
    if (value) {
      event.stopPropagation();
      navigator.clipboard.writeText(value);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="bg-white w-100">
        {reducerFeedback?.data.map((itm, ind) => (
          <div
          key={ind}
            className={`${classes.hover} p-5 d-flex justify-content-between align-items-center border-bottom position-relative`}
            onClick={(e) => handleClickField(e, itm, ind)}
          >
            <div className="d-flex align-items-center w-25">
              <div className={classes.Circle}>
                <div className={classes.CircleRed}>{itm?.body?.unseen}</div>
                {itm?.body?.member_first_name[0]}{" "}
                {itm?.body?.member_last_name[0]}
              </div>
              <div className="d-flex flex-column ml-2 ">
                <h6>
                  {itm?.body?.member_first_name} {itm?.body?.member_last_name}
                </h6>
                <span style={{ color: "gray" }}>
                  {itm?.body?.feedback_title}
                </span>
              </div>
            </div>
            <div
              onClick={
                itm?.body?.member_national_id
                  ? (event) => handleCopy(event, itm?.body?.member_national_id)
                  : null
              }
              className={classes.hover2}
            >
              <span className="mr-1">
                <FileCopyOutlinedIcon />
              </span>
              <span>{itm?.body?.member_national_id}</span>
            </div>
            <div>
              <span style={{ color: "gray" }}>کد پیگیری:</span>{" "}
              <span>{itm?.body?.ticket_id}</span>
            </div>
            <div>
              <span></span>
              <span>
                {dateMiladiToShamsi(itm?.body?.last_update.split(" ")[0])}
              </span>
            </div>
          </div>
        ))}
      </div>
      {newButton && (
        <ModalDetails
          stateModal={stateModal}
          setStateModal={setStateModal}
          apiFeedbackInsert={apiFeedbackInsert}
          stateChat={stateChat}
          setstateChat={setstateChat}
          stateIndex={stateIndex}
          setNewButton={setNewButton}
          newButton={newButton}
          chatReducer={chatReducer}
        />
      )}
    </>
  );
};

export default Answer;
