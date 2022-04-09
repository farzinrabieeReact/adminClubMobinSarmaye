import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  InputBase,
  TextareaAutosize,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  }
}));

export default function Input({ state, handleChange, setstate }) {
  console.log("statteeeeinser", state);
  const classes = useStyles();
  const [nameFile, setNameFile] = useState("");
  let myRef = useRef();

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
        image: dataURL
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
          value={state.title ? state.title : null}
          onChange={event => handleChange(event.target.value, "title")}
          helperText=""
          size="small"
          fullWidth
          variant="outlined"
          margin="dense"
          style={{ width: "100%" }}
        />
      </Box>
      <Box style={{ width: "100%" }} className="mb-5">
        <TextField
          id="standard-select-lastname"
          label={"دسته بندی"}
          value={
            state.category_name && state.category_name !== "null"
              ? state.category_name
              : null
          }
          onChange={event => handleChange(event.target.value, "category_name")}
          helperText=""
          size="small"
          fullWidth
          variant="outlined"
          margin="dense"
          style={{ width: "100%" }}
        />
      </Box>
      <Box style={{ width: "100%" }}>
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
        <TextareaAutosize
          value={state.short_description ? state.short_description : null}
          minRows={5}
          className="mb-5"
          style={{ width: "100%" }}
          placeholder="خلاصه خبر"
          onChange={event =>
            handleChange(event.target.value, "short_description")
          }
        />
      </Box>
      <Box width="100%">
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
          {state.image &&
            (state.image.includes("base64") ? (
              <img src={`${state.image}`} style={{ width: "200px" }} />
            ) : (
              <img
                src={`data:image/png;base64,${state.image}`}
                style={{ width: "200px" }}
              />
            ))}
        </Box>
      </Box>
    </div>
  );
}
