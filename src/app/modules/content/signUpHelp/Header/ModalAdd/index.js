import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import { CkEditor } from "../../../../../common/components/ckeditor";
// import TextEditorQuill from "../../../../../Common/Components/TextEditorQuill";

const useStyles = makeStyles((theme) => ({
  ModalAdd: {
    width: "70%",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
  },
  root: {
    padding: "20px 0",
    height: 600,
    width: "90%",
    margin: "auto",
    "& .MuiBox-root": {
      margin: theme.spacing(1),
    },
  },
  btns: {
    margin: "0px 0 10px 0",
    textAlign: "right",
    width: "95%",
  },
}));

export default function Index({ setNewButton, handelSubmitAdd, id, content }) {
  const classes = useStyles();

  const [textEditor, setTextEditor] = useState([]);
  

  useEffect(() => {
    setTextEditor(content.content)
  }, [content]);
  
  const handelClick = () => {
    handelSubmitAdd(textEditor, id);
    setNewButton(false);
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box height={"600px"} width="100%" overflow={"auto"}>
          <CkEditor
            // setValue={(data) => handelChange(data, "Content")}
            setValue={setTextEditor}
            value={content.content}
          />
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsGreen"} onClick={() => handelClick()}>
          ذخیره{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>
    </div>
  );
}
