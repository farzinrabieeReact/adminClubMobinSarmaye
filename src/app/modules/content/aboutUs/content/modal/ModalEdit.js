import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, TextField } from "@material-ui/core";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import TextEditor from "./textEditor/TextEditor";
import { CkEditor } from "../../../../../common/components/ckeditor";

const useStyles = makeStyles(theme => ({
  ModalAdd: {
    width: "60%",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
    textAlign: "right",
    margin: "auto",
    marginTop: "10%"
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

export default function ModalEdit({
  setNewButton,
  data,
  index,
  handelsubmitUpdate,
  handelDeleteSubmit
}) {
  const classes = useStyles();
  const [textEditor, setTextEditor] = useState({
    Title: "",
    Content: ""
  });
  useEffect(() => {
    setTextEditor({ Title: data.Title, Content: data.Content });
  }, [data]);

  const [flag, setFlag] = useState(false);

  const handelChange = (value, type) => {
    setTextEditor(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handelClick = (value, index) => {
    handelsubmitUpdate(value, index);

    setNewButton(false);
  };

  const handelDelete = () => {
    setNewButton(false);
    handelDeleteSubmit(index);
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box width="40%">
          <TextField
            label="عنوان"
            id="titleNewButton"
            value={textEditor.Title}
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
          {textEditor.Content !== "" && (
            <CkEditor
              value={textEditor.Content}
              setValue={data => handelChange(data, "Content")}
            ></CkEditor>
          )}
          {/*<TextEditor answerDataEdit={textEditor.Content}>*/}
          {/*  {data => handelChange(data, "Content")}*/}
          {/*</TextEditor>*/}
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsYellow"} onClick={() => setFlag(true)}>
          {" "}
          حذف
        </button>
        <button
          className={"btnsGreen"}
          onClick={() => {
            handelClick(textEditor, index);
          }}
        >
          ذخیره{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>
      {flag && (
        <AlertDialogSlide
          flagShow={setNewButton}
          handleCloseAlert={() => setFlag(false)}
          handleOkAlert={handelDelete}
          data={dataAlertDialogSlide}
        />
      )}
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};
