import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import AlertDialogSlide from "../../../../common/components/AlertDialogSlide";
import { approve_update } from "../../../../../redux/content/posts/approve_update";
import { actionTypes as actionTypesPost } from "../../../../../redux/content/posts/post_select/index";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
export default function PostShow({
  setFlagContent,
  post_id,
  stateReducerPost,
  apiSubmitSelectPost
  // handleApproveDetail
}) {
  const [ensureApprove, setEnsureApprove] = useState(false);

  const handleClickButtons = type => {
    setFlagContent(type);
  };

  const [state, setState] = useState([]);

  const dispatch = useDispatch();
  // const stateReducer = useSelector(state => state.post_v1_information_Reducer)

  const handleOkAlert = () => {
    // dispatch(post_v1_actions_approve(post_id, [post_v1_actions_information(post_id)]))
    approve_update(post_id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    let _data = {
      data: {
        _id: post_id
      }
    };
    setTimeout(() => {
      dispatch({ type: actionTypesPost.selectPostAsync, payload: _data });
    }, 1000);
    setEnsureApprove(false);
  };

  useEffect(() => {
    apiSubmitSelectPost();
  }, [post_id]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (stateReducerPost?.data) {
  //     setState(...stateReducerPost?.data.response.data.results);
  //   }
  // }, [stateReducerPost]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={Styles["cardPostShow"]}>
      <div className={Styles["header"]}>
        {stateReducerPost?.data[0]?.body?.approve_date ===
          "1970/01/01 00:00:00.000000" && (
          <div className={Styles["head"]}>
            <h4>پست تایید شود؟</h4>
            <div>
              <CheckIcon
                className={Styles["CheckIcon"]}
                onClick={() => setEnsureApprove(true)}
              />
              {/* <ClearIcon className={Styles['ClearIcon']}  /> */}
            </div>
          </div>
        )}
        <div className={Styles["content"]}>
          <div
            dangerouslySetInnerHTML={{
              __html: stateReducerPost?.data[0]?.body?.body
            }}
            className={Styles["bodyhtml"]}
          ></div>
          {/* ---------------------- */}
        </div>
      </div>
      <div className={Styles["btns"]}>
        {/* <button className={Styles['btnsBlue']}>مشاهده ضمائم</button> */}
        <button
          className={Styles["btnsBlue"]}
          onClick={() => handleClickButtons("COMMENTS")}
        >
          مشاهده نظرات{" "}
        </button>
        <button
          className={Styles["btnsBlue"]}
          onClick={() => handleClickButtons("POST_Report")}
        >
          گزارش{" "}
        </button>
      </div>

      <AlertDialogSlide
        flagShow={ensureApprove}
        handleCloseAlert={setEnsureApprove}
        handleOkAlert={handleOkAlert}
        data={dataAlertDialogSlide}
      />
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "تایید",
  description: "از تایید این مورد اطمینان دارید؟"
};
