import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesPost } from "../../../../../redux/content/posts/post_select/index";
import { actionTypes as actionTypesPostComments } from "../../../../../redux/content/posts/post_select_subComment/index";
import Styles from "./index.module.scss";
import InformationPost from "./informationPost/InformationPost";

export default function PostReport({ setFlagContent, post_id }) {
  const handleClickButtons = type => {
    setFlagContent(type);
  };

  const [state, setState] = useState([]);
  const [countComments, setcountComments] = useState(null);

  const dispatch = useDispatch();
  const stateSelectPost = useSelector(state => state.post_select_reducer);
  const stateSelectPostComments = useSelector(
    state => state.post_select_subComment_reducer
  );
  useEffect(() => {
    if (stateSelectPostComments) {
      setcountComments(stateSelectPostComments.data.length);
    }
  }, [stateSelectPostComments]);
  useEffect(() => {
    if (stateSelectPost) {
      setState(stateSelectPost.data[0]);
    }
  }, [stateSelectPost]);

  useEffect(() => {
    let _data = {
      data: {
        _id: post_id
      }
    };
    dispatch({ type: actionTypesPost.selectPostAsync, payload: _data });
    let data = {
      data: {
        parent_post_id: post_id
      }
    };
    dispatch({
      type: actionTypesPostComments.selectPostAsyncSubComment,
      payload: data,
      flag: true
    });
  }, [post_id]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (stateReducer.data) {
  //     setState(...stateReducer.data.response.data.results);
  //   }
  // }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (stateReducerComments) {
  //     setcountComments(stateReducerComments.data.length);
  //   }
  // }, [stateReducerComments]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={Styles["postReport"]}>
      <div className={Styles["body"]}>
        <InformationPost data={state} countComments={countComments} />
        {/* <Chart /> */}
      </div>
      <div className={Styles["btns"]}>
        <button
          className={Styles["btnsBlue"]}
          onClick={() => handleClickButtons("COMMENTS")}
        >
          مشاهده نظرات{" "}
        </button>
        {/* <button className={Styles['btnsBlue']} onClick={()=>handleClickButtons('POST_Report')}>گزارش </button> */}
      </div>
    </div>
  );
}
