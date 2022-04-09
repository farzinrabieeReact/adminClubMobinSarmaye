import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import { Switch, TextField } from "@material-ui/core";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import Styles from "./index.module.scss";
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 20
  },
  input: {
    width: 250,
    minWidth: 200,
    "& input": {
      fontSize: 14
    }
  },
  iconDelete: {
    fill: "#F64E60",
    cursor: "pointer",
    width: 35,
    height: 25
  }
}));
export default function CardInput({
  // flagIconDelete,
  flagIconSwitch,
  value,
  title,
  titleSubgroup,
  // index.js,
  // showAletDelete,
  handel_Remove_forum,
  handel_update_forum,
  handel_enable_forum,
  handel_insert_forum,
  setNewButton
}) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [flag, setFlag] = useState(""); //remove && update

  const [state, setState] = useState({
    name: "",
    id: "",
    is_visible: "",
    subgroup_name: ""
  });

  useEffect(() => {
    setState({
      name: value.body.name,
      id: value.id,
      is_visible: value.body.is_visible,
      subgroup_name: value.body.subgroup_name,
      insert: value.body.insert
    });
  }, [value]);

  const handelShowAlertDialogSlide = type => {
    setOpenAlert(true);
    setFlag(type);
  };

  const handelChangeSubgroup_name = (value, type) => {
    // if (flagIconSwitch)
    setState(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handelSumbit = () => {
    if (flag === "remove") {
      if (state.is_visible === "TRUE") handel_Remove_forum(state);

      if (state.is_visible === "FALSE") handel_enable_forum(state);
    }

    if (flag === "update") {
      if (state.insert) {
        handel_insert_forum(state);
        setOpenAlert(false);
        setNewButton(false);
        return;
      }

      handel_update_forum(state);
    }

    setOpenAlert(false);
    setNewButton(false);
  };

  return (
    <>
      <div className={classes["card"]}>
        {/* {
                flagIconDelete && (
                    <DeleteIcon className={classes['iconDelete']} onClick={() => showAletDelete(index.js)} />
                )
            } */}

        <div onClick={() => handelShowAlertDialogSlide("update")}>
          <CheckIcon className={Styles["CheckIcon"]} />
        </div>

        <TextField
          className={classes["input"]}
          id="outlined-basic"
          label={title}
          variant="outlined"
          size="small"
          value={state.name}
          onChange={event =>
            handelChangeSubgroup_name(event.target.value, "name")
          }
        />

        <TextField
          className={classes["input"]}
          id="outlined-basic"
          label={titleSubgroup}
          variant="outlined"
          size="small"
          value={state.subgroup_name}
          onChange={event =>
            handelChangeSubgroup_name(event.target.value, "subgroup_name")
          }
        />

        {flagIconSwitch && !state.insert && (
          <Switch
            inputProps={{ "aria-label": "primary checkbox" }}
            color="primary"
            checked={
              state.is_visible === "FALSE"
                ? false
                : state.is_visible === "TRUE"
                ? true
                : ""
            }
            onClick={() => {
              handelShowAlertDialogSlide("remove");
            }}
          />
        )}
      </div>

      {openAlert && (
        <AlertDialogSlide
          flagShow={openAlert}
          handleCloseAlert={setOpenAlert}
          handleOkAlert={handelSumbit}
          data={dataAlertDialogSlide}
        />
      )}
    </>
  );
}

const dataAlertDialogSlide = {
  title: "ویرایش",
  description: "از ویرایش این رکورد اطمینان دارید؟"
};
