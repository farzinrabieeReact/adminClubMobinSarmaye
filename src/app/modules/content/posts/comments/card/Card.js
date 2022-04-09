import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./index.module.scss";
import { DateRange, Person, Reply, ThumbUp } from "@material-ui/icons";
import TextAreaSubmited from "./TextAreaSubmited";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import { Box, Button, IconButton } from "@material-ui/core";
import { dateMiladiToShamsi } from "../../../../../common/method/date";
import ReplyReponse from "./ReplyReponse";
import ModalCustom from "./ModalCustom";
import { DateRangeIcon } from "@material-ui/pickers/_shared/icons/DateRangeIcon";
import { handleNotificationAlertTryUpdate } from "../../../../../common/method/handleNotificationAlert";
import { actionTypes as actionTypesNotif } from "../../../../../../redux/notificationAlert";
const borderBottom = {
  borderTop: "1px solid lightgray"
};

export default function Card({
  data,
  subComment,
  parentID,
  post_id,
  apiSubmitSelectPost,
  setStateId,
  stateReducerSubComments
}) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleShowReply = (e, data) => {
    if (!subComment) {
      setStateId(data);
      // if (stateReducerSubComments.data.length === 0) {
      //   dispatch({
      //     type: actionTypesNotif.info,
      //     textAlert: "پاسخی برای نمایش وجود ندارد"
      //   });
      // }
    }
    // apiSubmitSelectPost(data);
    // dispatch({
    //   type: actionTypes.selectCommentAsync,
    //   filter: { parent_post_id: data.id },
    //   level1: false
    // });
  };

  const handleLike = () => {
    // LikesPost(data.id)
    //   .then(res => {
    //     let resOk = handleNotificationAlertTryUpdate(res);
    //     if (resOk) {
    //       dispatch({
    //         type: actionTypesCommentList.clickLikeComment,
    //         payload: { id: data.id }
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     handleNotificationAlertCatch();
    //   });
  };

  return (
    <div
      className={`pt- my-1 pb-5 mb-5 ${
        subComment ? "bg-light border-top" : ""
      }`}
      style={borderBottom}
    >
      <div className="d-flex my-10">
        <p className="mx-2 px-2 h5">
          {data.body.author_first_name} {data.body.author_last_name}
        </p>
        <p className="mx-2 px-2 text-muted-custom border-left">
          <span className="px-1">
            <DateRange />
          </span>
          <span className="px-1">
            {dateMiladiToShamsi(data.body.create_date.split(" ")[0])}
          </span>
          <span className="px-1">
            {data.body.create_date.split(" ")[1].split(".")[0]}
          </span>
        </p>
      </div>

      <Box width="90%" className="text-height-30 mx-auto mx-auto text-justify">
        {data.body.title}
      </Box>

      <Box width="90%" className="text-right mx-auto">
        {!subComment && (
          <>
            <span className="px-1">
              <Button
                className="color-g"
                onClick={e => handleShowReply(e, data.id)}
              >
                نمایش پاسخ
              </Button>
            </span>
            <span className="px-1 border-left border-right">
              <IconButton onClick={() => setOpenModal(true)}>
                <Reply className="color-g" />
              </IconButton>
            </span>
          </>
        )}
        <span className="px-1">
          <IconButton onClick={handleLike}>
            <ThumbUp
              className={
                data.body.is_liked === "FALSE" ? "text-muted" : "color-g"
              }
            />
            <span className="pl-1" style={{ fontSize: 14 }}>
              {data.body.likes}
            </span>
          </IconButton>
        </span>
      </Box>

      <ModalCustom open={openModal} setOpen={setOpenModal}>
        <ReplyReponse parent_post_id={data.id} setClose={setOpenModal} />
      </ModalCustom>
    </div>
  );
}
