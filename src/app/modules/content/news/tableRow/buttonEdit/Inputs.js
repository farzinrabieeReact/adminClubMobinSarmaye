import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  InputBase,
  TextareaAutosize,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Styles from "../../index.module.scss";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    flexDirection: "column"
  }
}));

export default function Input({ state, handleChange, setstate }) {
  // console.log("stateeeedit", state.body?.image.split(",")[1]);

  const classes = useStyles();
  let myRef = useRef();
  const [Obj, SetObj] = useState({
    title: "",
    PdfUrl: "",
    orderShow: 0,
    Pic: ""
  });
  const [nameFile, setNameFile] = useState("");
  const openFile = file => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;

      let image = input.files[0].type;
      let formatImages = image.split("/");
      let sizeImage = input.files[0].size;

      if (
        formatImages[1] !== "png" &&
        formatImages[1] !== "jpg" &&
        formatImages[1] !== "jpeg"
      ) {
        // output.src = dataURL;
        alert("لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg , jpg)");
        return;
      }

      if (sizeImage > 500000) {
        alert("سایز عکس باید کمتر از 500KB باشد.");
        return;
      }

      setstate(prev => ({
        ...prev,
        body: {
          ...prev.body,
          image: dataURL
        }
      }));

      setNameFile(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  };

  return (
    <div className={classes["root"]}>
      <Box style={{ width: "100%" }} className="mb-5">
        <TextField
          id="standard-select-lastname"
          label={"عنوان"}
          value={state.body?.title ? state.body.title : null}
          onChange={event => handleChange(event.target.value, "title")}
          helperText=""
          size="small"
          fullWidth
          variant="outlined"
          margin="dense"
          style={{ width: "100%" }}
        />
      </Box>
      <Box style={{ width: "100%" }}>
        <p className="m-0">متن خبر</p>
        <TextareaAutosize
          value={state.full_description ? state.full_description : null}
          minRows={5}
          className="mb-5"
          style={{ width: "100%" }}
          placeholder="متن خبر"
          onChange={event =>
            handleChange(event.target.value, "full_description")
          }
        />
      </Box>
      <Box style={{ width: "100%" }}>
        <p className="m-0">خلاصه خبر</p>
        <TextareaAutosize
          value={
            state.body?.short_description ? state.body.short_description : null
          }
          minRows={5}
          className="mb-5 rounded"
          style={{ width: "100%" }}
          placeholder="خلاصه خبر"
          onChange={event =>
            handleChange(event.target.value, "short_description")
          }
        />
      </Box>
      <Box width="100%" className={Styles["grid"]}>
        <Box width="50%">
          <Box
            width="72%"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid gray",
              padding: "10px",
              width: "250px",
              marginLeft: "20px"
            }}
            className="rounded"
          >
            <InputBase
              defaultValue="مسیر عکس"
              inputProps={{ "aria-label": "naked" }}
              value={nameFile ? nameFile : "مسیر عکس"}
            />
            <Button variant="contained" onClick={() => myRef.current.click()}>
              انتخاب
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={myRef}
              onChange={event => openFile(event)}
            />
          </Box>
        </Box>
        <Box style={{ textAlign: "left" }}>
          {state.body?.image.includes("base64") ? (
            <img
              src={`${state.body?.image}`}
              alt="gradient"
              className={Styles.img}
              style={{ width: "200px" }}
            />
          ) : (
            <img
              src={`data:image/png;base64,${state.body?.image}`}
              alt="gradient"
              className={Styles.img}
              style={{ width: "200px" }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}
