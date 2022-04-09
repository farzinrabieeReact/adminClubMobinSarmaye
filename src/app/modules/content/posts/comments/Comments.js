import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardNoData from "../../../../common/components/cardNoData";
import Styles from "./index.module.scss";
import Card from "./card/Card";
import { Box } from "@material-ui/core";
import { post_select_subComment_reducer } from "../../../../../redux/content/posts/post_select_subComment";
import { actionTypes as actionTypesNotif } from "../../../../../redux/notificationAlert";
export default function Comments({
  post_id,
  apiSubmitSelectPost,
  stateReducerPost
}) {
  const [stateId, setStateId] = useState(null);

  const dispatch = useDispatch();
  // const stateReducer = useSelector(state => state.comments_v1_select_Reducer);
  const stateReducerSubComments = useSelector(
    stae => stae.post_select_subComment_reducer
  );
  // console.log("possssssssssssssssssssssssssssssstiddddddddddddddd", post_id);
  // console.log(
  //   "stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereducerPost",
  //   stateReducerPost
  // );
  // console.log(
  //   "stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesubComments",
  //   stateReducerSubComments
  // );
  //
  // if (stateReducerSubComments.data.length !== 0) {
  //   console.log("iffffffffffffffffffffffffffffffffff");

  // stateReducerSubComments.data.map(itm => {
  //   console.log("itmmmmmmmmmmmmmmmmm", itm);
  // });
  useEffect(() => {}, [post_id]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    apiSubmitSelectPost(stateId);
  }, [stateId]); //eslint-disable-line react-hooks/exhaustive-deps

  const handel_Submit_insert_comment = (value, data) => {
    // let date = data_m();
    // let session_login = JSON.parse(sessionStorage.getItem("login"));
    //
    // if (!date) {
    //   alert("فرمت تاریخ وارد شده اشتباه می باشد لطفا آن را بررسی نمایید ");
    //   return;
    // }
    //
    // let obj = {
    //   title: value,
    //   body: value,
    //   abstract: value,
    //   create_date: date,
    //   approve_date: null,
    //   is_visible: null,
    //   parent_post_id: data.id,
    //   forum_name: null,
    //   subgroup_id: null,
    //   subgroup_name: null,
    //   author_id: session_login.member_id,
    //   author_first_name: null,
    //   author_last_name: null,
    //   select_permission_level: null,
    //   update_permission_level: null,
    //   delete_permission_level: null,
    //   isin: null,
    //   tags: null,
    //   likes: null,
    //   short_url: null
    // };
    //
    // dispatch(post_v1_actions_insert(obj, comments_v1_actions_select, data.id));
  };

  const handel_submit_edit_comment = (value, id, parent_post_id) => {
    // let obj = {
    //   _id: id,
    //   abstract: value,
    //   title: value,
    //   body: value
    // };
    // dispatch(
    //   post_v1_actions_update(obj, comments_v1_actions_select, parent_post_id)
    // );
  };
  const handleNotify = () => {
    dispatch({
      type: actionTypesNotif.info,
      textAlert: "پاسخی برای نمایش وجود ندارد"
    });
  };

  return (
    <div className={Styles["Comments"]}>
      {stateReducerPost?.data?.length === 0 && <CardNoData />}
      {/*{stateReducerPost.data*/}
      {/*  ?.filter(itm => itm.body.parent_post_id === post_id)*/}
      {/*  .map((itm, ind) => {*/}
      {/*    return (*/}
      {/*      <>*/}
      {/*        <Card*/}
      {/*          key={ind}*/}
      {/*          data={itm}*/}
      {/*          apiSubmitSelectPost={apiSubmitSelectPost}*/}
      {/*          post_id={post_id}*/}
      {/*          setStateId={setStateId}*/}
      {/*        />*/}
      {/*        /!*{stateReducerPost?.data*!/*/}
      {/*        /!*  ?.filter(itm => itm.body.parent_post_id === stateId)*!/*/}
      {/*        /!*  .map((itm, ind) => (*!/*/}
      {/*        /!*    <Box width="90%" className="mx-auto">*!/*/}
      {/*        /!*      <Card*!/*/}
      {/*        /!*        subComment={true}*!/*/}
      {/*        /!*        key={ind}*!/*/}
      {/*        /!*        data={itm}*!/*/}
      {/*        /!*        apiSubmitSelectPost={apiSubmitSelectPost}*!/*/}
      {/*        /!*        post_id={post_id}*!/*/}
      {/*        /!*      />*!/*/}
      {/*        /!*    </Box>*!/*/}
      {/*        /!*  ))}*!/*/}
      {/*      </>*/}
      {/*    );*/}
      {/*  })}*/}
      {stateReducerPost?.data?.map((item, index) => {
        return (
          // <Card
          //   dataReducer={comment}
          //   key={index.js}
          //   data={comment}
          //   style={{ mr: "0%", width: "100%" }}
          //   parent_post_id={post_id}
          //   handel_Submit_insert_comment={handel_Submit_insert_comment}
          //   handel_submit_edite_comment={handel_submit_edit_comment}
          // />
          <>
            <Card
              key={index}
              data={item}
              apiSubmitSelectPost={apiSubmitSelectPost}
              post_id={post_id}
              setStateId={setStateId}
              stateReducerSubComments={stateReducerSubComments}
            />

            {stateReducerSubComments.data?.length !== 0
              ? stateReducerSubComments.data?.map((itm, ind) =>
                  item.id === itm.body.parent_post_id ? (
                    <Box width="90%" className="mx-auto">
                      <Card
                        subComment={true}
                        key={ind}
                        data={itm}
                        apiSubmitSelectPost={apiSubmitSelectPost}
                        post_id={post_id}
                      />
                    </Box>
                  ) : null
                )
              : null}
          </>
        );
      })}
    </div>
  );
}
