import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, TextField } from "@material-ui/core";
import { CkEditor } from "../../../../common/components/ckeditor";

const useStyles = makeStyles(theme => ({
  ModalAdd: {
    width: "60%",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
    margin: "auto",
    marginTop: "100px"
  },
  root: {
    padding: "20px 0",
    width: "90%",
    margin: "auto"
    // "& .MuiBox-root": {
    //   margin: theme.spacing(1)
    // }
  },
  btns: {
    margin: "0px 0 10px 0",
    textAlign: "right",
    width: "95%"
  }
}));
export default function ModalAdd({ setNewButton, handelSubmitAdd }) {
  const classes = useStyles();
  const [data, setDate] = useState({ Title: "", Content: "" });

  const handelChange = (value, type) => {
    setDate(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handelClick = () => {
    handelSubmitAdd(data);
    setNewButton(false);
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box width="40%">
          <TextField
            label="عنوان        "
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event => {
              handelChange(event.target.value, "Title");
            }}
          />
        </Box>
        <Box height={"400px"} style={{ overflow: "auto" }}>
          <CkEditor
            value={data.Content}
            setValue={data => handelChange(data, "Content")}
          ></CkEditor>
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button
          className={"btnsGreen"}
          onClick={() => {
            handelClick();
          }}
        >
          ذخیره{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>
    </div>
  );
}
