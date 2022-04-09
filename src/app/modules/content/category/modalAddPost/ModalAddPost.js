import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { Box, TextField } from "@material-ui/core";
import { CkEditor } from "../../../../common/components/ckeditor";
import { post_inset } from "../../../../../redux/content/category/post_inset";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
import { data_m } from "../../../../common/method/date";
import { getSessionParam } from "../../../../common/method/getSessionParam";
const useStyles = makeStyles({
  root: {
    width: "45%",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 8,
    margin: "auto",
    marginTop: "10vh",
    padding: 30,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingRight: "25px"
  },
  box: {
    marginBottom: "10px"
  },
  buttons: {
    textAlign: "right",
    margin: "10px 20px"
  }
});

export default function ModalAddPost({
  setFlagNewPost,
  subgroup_id,
  setNewButton,
  handelSubmitAdd
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    abstract: "",
    body: "",
    tags: "",
    isin: "",
    short_url: "",
    create_date: null,
    subgroup_id: subgroup_id,
    author_id: null,
    approve_date: null,
    is_visible: null,
    parent_post_id: null,
    forum_name: null,
    subgroup_name: null,
    author_first_name: null,
    author_last_name: null,
    select_permission_level: null,
    update_permission_level: null,
    delete_permission_level: null,
    likes: null
  });

  // useEffect(() => {
  //     console.log("state", state);
  // }, [state])

  ///////////////////////OnChange state//////////////////
  const handleChange = (value, type) => {
    setState(prev => ({
      ...prev,
      [type]: value
    }));
  };

  ///////////////////////submit insert post//////////////////
  const handleSubmitInsetPost = () => {
    let member_id = getSessionParam("member_id");

    let date = data_m();

    let tagsTrim = state.tags.trim();
    let tagsReplace = tagsTrim.replaceAll(" ", ",");
    let result = {
      ...state,
      author_id: member_id,
      create_date: date,
      tags: tagsReplace
    };
    post_inset(result)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    // if (!date) {
    //   alert("فرمت تاریخ مناسب نمی باشد.");
    //   return;
    // }

    // console.log("result", result);

    setFlagNewPost(false);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <TextField
          id="outlined-basic"
          label="عنوان"
          variant="outlined"
          value={state.title}
          onChange={event => handleChange(event.target.value, "title")}
          style={{ width: "100%" }}
        />
      </Box>

      <Box className={classes.box}>
        <TextField
          id="outlined-basic"
          label="خلاصه"
          variant="outlined"
          value={state.abstract}
          onChange={event => handleChange(event.target.value, "abstract")}
          style={{ width: "100%" }}
        />
      </Box>

      <Box className={classes.box}>
        <TextField
          id="outlined-basic"
          label="کلمات کلیدی"
          variant="outlined"
          value={state.tags}
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

      <Box height={"400px"}>
        <CkEditor
          value={state.body ? state.body : ""}
          setValue={data => handleChange(data, "body")}
        ></CkEditor>
        {/*<CKEditor>*/}
        {/*    {*/}
        {/*        data => handleChange(data, 'body')*/}
        {/*    }*/}
        {/*</CKEditor>*/}
        {/*<CkEditor value={} setValue={data => handleEdit(data)}></CkEditor>*/}
      </Box>

      <Box className={classes["buttons"]}>
        <button className={`btnsBlue`} onClick={() => handleSubmitInsetPost()}>
          افزودن
        </button>
        <button className={"btnsRed"} onClick={() => setFlagNewPost(false)}>
          انصراف
        </button>
      </Box>
    </div>
  );
}
