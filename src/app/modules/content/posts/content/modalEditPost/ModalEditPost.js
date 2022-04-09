import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@material-ui/core";
import { CkEditor } from "../../../../../common/components/ckeditor";
import { makeStyles } from "@material-ui/styles";
import { actionTypes as actionTypesPost } from "../../../../../../redux/content/posts/post_select_subComment/index";
import { post_update } from "../../../../../../redux/content/posts/post_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";

const useStyles = makeStyles(() => ({
  root: {
    width: "80%",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: 8,
    margin: "auto",
    marginTop: "10vh",
    padding: 30,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  buttons: {
    textAlign: "right",
    margin: "10px 20px"
  }
}));

export default function ModalEditPost({
  setFlagNewPost,
  subgroup_id,
  data,
  stateReducerPost,
  apiSubmitSelectPost,
  setflagApi
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    title: "",
    abstract: "",
    body: "",
    tags: "",
    isin: "",
    short_url: "",
    create_date: "",
    subgroup_id: "",
    author_id: "",
    approve_date: "",
    is_visible: "",
    parent_post_id: "",
    forum_name: "",
    subgroup_name: "",
    author_first_name: "",
    author_last_name: "",
    select_rate_score: "",
    update_rate_score: "",
    delete_rate_score: "",
    likes: ""
  });

  const dispatch = useDispatch();
  // const stateReducer = useSelector(state => state.post_v1_information_Reducer);
  const stateReducerPostEdit = useSelector(
    state => state.post_select_subComment_reducer
  );

  useEffect(() => {
    // dispatch(post_v1_actions_information(subgroup_id));
    //
    // return () => {
    //   dispatch(post_v1_actions_information_empty());
    // };
  }, [subgroup_id]); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    let _data = {
      data: {
        _id: subgroup_id
      }
    };
    dispatch({
      type: actionTypesPost.selectPostAsyncSubComment,
      payload: _data
    });
  }, []);

  useEffect(() => {
    if (stateReducerPostEdit.data.length !== 0) {
      setState(stateReducerPostEdit.data[0]?.body);
    }
  }, [stateReducerPostEdit]); //eslint-disable-line react-hooks/exhaustive-deps

  ///////////////////////OnChange state//////////////////
  const handleChange = (value, type) => {
    setState(prev => ({
      ...prev,
      [type]: value
    }));
  };

  ///////////////////////submit edit post//////////////////
  const handleSubmitUpdatePost = () => {
    // let obj = {};
    let obj = {};
    Object.keys(state).forEach(key => {
      if (state[key] !== stateReducerPostEdit.data[0].body[key]) {
        if (key === "tags") {
          let tagsTrim = state.tags.trim();
          let tagsReplace = tagsTrim.replaceAll(" ", ",");
          obj[key] = tagsReplace;
          return;
        }

        obj[key] = state[key];
      }
    });

    if (Object.keys(obj).length) {
      let id = subgroup_id;

      let data = {
        _id: id,
        ...obj
      };

      post_update(subgroup_id, data)
        .then(res => {
          let isOk = handleNotificationAlertTryUpdate(res);
          if (!isOk) return;
        })
        .catch(() => {
          handleNotificationAlertCatch();
        });
      setTimeout(() => {
        setflagApi(prev => !prev);
      }, 1000);
      setFlagNewPost(false);
    } else {
      alert("تغییری ثبت نگردیده است");
    }

    // Object.keys(state).forEach(key => {
    //   if (state[key] !== stateReducer.data.response.data.results[0].body[key]) {
    //     if (key === "tags") {
    //       let tagsTrim = state.tags.trim();
    //       let tagsReplace = tagsTrim.replaceAll(" ", ",");
    //       obj[key] = tagsReplace;
    //       return;
    //     }
    //
    //     obj[key] = state[key];
    //   }
    // });
    // if (Object.keys(obj).length) {
    //   let id = stateReducer.data.response.data.results[0].id;
    //   let data = {
    //     _id: id,
    //     ...obj
    //   };
    //
    //   // dispatch(post_v1_actions_update(data));
    //   setFlagNewPost(false);
    // } else {
    //   alert("تغییری ثبت نگردیده است");
    // }
  };

  return (
    <div className={classes.root}>
      <Box>
        <TextField
          id="outlined-basic"
          label="عنوان"
          variant="outlined"
          value={state.title}
          onChange={event => handleChange(event.target.value, "title")}
          style={{ width: "100%" }}
        />
      </Box>

      <Box>
        <TextField
          id="outlined-basic"
          label="خلاصه"
          variant="outlined"
          value={state.abstract}
          onChange={event => handleChange(event.target.value, "abstract")}
          style={{ width: "100%" }}
        />
      </Box>

      <Box>
        <TextField
          id="outlined-basic"
          label="کلمات کلیدی"
          variant="outlined"
          value={state.tags ? state.tags.replaceAll(",", " ") : ""}
          onChange={event => handleChange(event.target.value, "tags")}
          style={{ width: "32%", marginLeft: "1%" }}
        />

        <TextField
          id="outlined-basic"
          label="نماد"
          variant="outlined"
          value={state.isin}
          onChange={event => handleChange(event.target.value, "isin")}
          style={{ width: "33%", marginLeft: "1%" }}
        />

        <TextField
          id="outlined-basic"
          label="لینک کوتاه"
          variant="outlined"
          value={state.short_url}
          onChange={event => handleChange(event.target.value, "short_url")}
          style={{ width: "33%" }}
        />
      </Box>

      <Box height={"400px"} style={{ overflow: "auto" }}>
        <CkEditor
          value={state.body ? state.body : ""}
          setValue={data => handleChange(data, "body")}
        ></CkEditor>
      </Box>

      <Box className={classes["buttons"]}>
        <button
          className={`btnsYellow`}
          onClick={() => handleSubmitUpdatePost()}
        >
          ویرایش
        </button>
        <button className={"btnsRed"} onClick={() => setFlagNewPost(false)}>
          انصراف
        </button>
      </Box>
    </div>
  );
}
