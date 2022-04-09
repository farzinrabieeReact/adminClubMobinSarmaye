import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LinearProgress, TextareaAutosize } from "@material-ui/core";
export default function ReplyResponse({ parent_post_id, setClose }) {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = () => {
    // if (!data) {
    //   dispatch({
    //     type: actionTypes.info,
    //     textAlert: "دیدگاه خود را وارد نکرده اید."
    //   });
    //   return;
    // }

    setLoading(true);

    // InsertComment(data, parent_post_id)
    //   .then(res => {
    //     let resOk = handleNotificationAlertTryUpdate(res);
    //     if (resOk) {
    //       dispatch({
    //         type: actionTypesCommentList.selectCommentAsync,
    //         filter: { parent_post_id: parent_post_id },
    //         level1: false
    //       });
    //     }
    //     setLoading(false);
    //     setClose(false);
    //   })
    //   .catch(() => {
    //     handleNotificationAlertCatch();
    //     setLoading(false);
    //   });
  };

  return (
    <>
      {loading && <LinearProgress className="mx-3" />}
      <div className="p-5 pb-20">
        <TextareaAutosize
          rowsMax={10}
          className={`rounded-lg p-5`}
          onChange={event => setData(event.target.value)}
          placeholder="دیدگاه خود را در 1000 کاراکتر وارد نماید"
          value={data}
          style={{
            minHeight: 200,
            width: 750,
            resize: "none",
            border: "1px solid #707070",
            marginTop: 30
          }}
        />

        <div className="text-center">
          <button
            className="btn btn-success mt-3 text-center"
            onClick={handleSubmitComment}
          >
            ارسال دیدگاه
          </button>
        </div>
      </div>
    </>
  );
}
