import React, { useEffect, useRef, useState } from "react";
import { Box, FormControl, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CreateOption from "./CreateOption";
import { makeStyles } from "@material-ui/styles";
import { CkEditor } from "../../../../common/components/ckeditor/index";
import {
  actionTypes as actionTypesUpdate,
  faq_update
} from "../../../../../redux/content/faq/faq_update/index";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10
  },

  table: {
    minWidth: 650,
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold"
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  icons: {
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "white",
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(4, 6, 3),
    // minWidth: "931px",
    padding: "30px",
    borderRadius: 10,
    Width: "70%",
    maxWidth: "70%"
  },
  textEditor: {
    width: "100%",
    height: "400px",
    overflow: "auto"
  },
  buttonsAdded: {
    float: "right"
  }
}));

const ModalEdit = ({
  categotyFAQ,
  setflagClose,
  type,
  data,
  selectedItem,
  flagEdit,
  selected,
  stateReducerCategory,
  setDataEdit,
  DataEdit,
  setflagApi
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const refCategory = useRef(null);

  const handleSubmit = () => {
    let dataa = {
      _id: selected.id,
      category: DataEdit.category,
      question: DataEdit.question,
      answer: DataEdit.answer
    };

    faq_update(dataa)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
        setTimeout(() => {
          setflagApi(prev => !prev);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setflagClose(false);
  };

  const handleEdit = data => {
    setDataEdit(prev => ({
      ...prev,
      ["answer"]: data
    }));
  };
  const handleChange = e => {
    let value = e.target.value;
    setDataEdit(prev => ({
      ...prev,
      ["question"]: value
    }));
  };

  return (
    <>
      <div className={classes.paper}>
        <FormControl variant="outlined" className={classes.formControl}>
          <CreateOption
            categotyFAQ={categotyFAQ}
            selected={selected}
            stateReducerCategory={stateReducerCategory}
            forwardValue={data => (refCategory.current = data?.title)}
            categoryDataEdit={
              type === "INSERT_REQUEST" ? null : DataEdit.category
            }
            setDataEdit={setDataEdit}
            DataEdit={DataEdit}
          />
        </FormControl>

        <Box>
          <TextField
            label="عنوان سوال"
            id="titleNewButton"
            value={DataEdit.question}
            variant="outlined"
            style={{ margin: "20px 0", width: "100%" }}
            onChange={handleChange}
          />
        </Box>

        <div className={classes.textEditor}>
          <CkEditor
            value={DataEdit.answer}
            setValue={data => handleEdit(data)}
          ></CkEditor>
        </div>

        <Box mt={3} className={classes.buttonsAdded}>
          <button className="btnsGreen" onClick={handleSubmit}>
            ذخیره
          </button>
          <button onClick={() => setflagClose(false)} className="btnsRed">
            انصراف
          </button>
        </Box>
      </div>
    </>
  );
};

export default ModalEdit;
