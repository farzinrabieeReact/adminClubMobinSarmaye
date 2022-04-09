import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import AlertDialogSlide from "../../../../../../common/components/AlertDialogSlide";
import Styles from "./index.module.scss";

const useStyles = makeStyles(theme => ({
  ModalAdd: {
    width: "60%",
    height: "",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "whitesmoke",
    textAlign: "right",
    margin: "auto",
    marginTop: "5%"
  },
  root: {
    padding: "20px 0",

    width: "90%",
    margin: "auto",
    "& .MuiBox-root": {}
  },
  btns: {
    margin: "0px 0 10px 0",
    textAlign: "right",
    width: "95%"
  }
}));

export default function ModaltEdit({
  setNewButton,
  data,
  category,
  handelChange
}) {
  const [openAlert, setOpenAlert] = useState(false);

  const classes = useStyles();
  const [state, setState] = useState(null);
  const [categoryState, setCategoryState] = useState(category);

  useEffect(() => {
    let splitData = data.filter(item => {
      if (item.category === category) {
        return true;
      }
      return false;
    });
    setState(splitData);
  }, [data]); //eslint-disable-line  react-hooks/exhaustive-deps

  const handelDelete = indexItems => {
    let res = state.filter((data, index) => index !== indexItems);
    setState(res);
  };

  const handelChangeValue = (valueItems, index, type) => {
    let res = state.map((data, ind) => {
      const { ...rest } = data;

      if (ind === index) {
        return { ...rest, [type]: valueItems };
      }
      return data;
    });

    setState(res);
  };

  const addItems = () => {
    setState(prev => [
      {
        title: "",
        link: "#",
        category: categoryState
      },
      ...prev
    ]);
  };

  const handelSubmit = () => {
    let res = data.filter(item => item.category !== category);
    let dataNew = state
      .filter(item => {
        if (item.title.length === 0) {
          return false;
        }
        return true;
      })
      .map(item => ({
        ...item,
        category: categoryState
      }));

    let result = [...dataNew, ...res];
    handelChange(result);

    setNewButton(false);
  };

  const handelDeleteCategory = () => {
    let res = data.filter(item => item.category !== category);

    handelChange(res);
    setNewButton(false);
  };

  const handleOkAlert = () => {
    handelDeleteCategory();
  };

  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box
          width="100%"
          className="d-flex justify-content-between align-items-center"
        >
          <div style={{ width: "40%" }}>
            <TextField
              label="عنوان"
              id="titleNewButton"
              // defaultValue={state.title}
              value={categoryState}
              variant="outlined"
              size="small"
              fullWidth
              margin="dense"
              onChange={event => {
                setCategoryState(event.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() => addItems()}
              className={`${Styles["btnAdd"]} btnsBlue `}
            >
              اضافه کردن
            </button>
          </div>
        </Box>

        <Box className={Styles["list"]}>
          {state && (
            <>
              {state?.map((items, ind) => {
                return (
                  <div className={Styles["questions"]} key={ind}>
                    <Box width={"50%"} className={Styles["inputIcon"]}>
                      <ClearIcon
                        style={{ color: "#F64E60 " }}
                        onClick={() => handelDelete(ind)}
                      />
                      <TextField
                        value={items.title}
                        id="outlined-basic"
                        label={""}
                        variant="outlined"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={event => {
                          handelChangeValue(event.target.value, ind, "title");
                        }}
                      />
                    </Box>
                    <TextField
                      value={items.link}
                      id="outlined-basic"
                      placeholder={`url`}
                      label={""}
                      variant="outlined"
                      size="large"
                      style={{ width: "50%" }}
                      onChange={event => {
                        handelChangeValue(event.target.value, ind, "link");
                      }}
                    />
                  </div>
                );
              })}
            </>
          )}
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsGreen"} onClick={handelSubmit}>
          اعمال تغییرات
        </button>
        <button className={"btnsYellow"} onClick={() => setOpenAlert(true)}>
          حذف همه
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </div>

      <AlertDialogSlide
        flagShow={openAlert}
        handleCloseAlert={setOpenAlert}
        handleOkAlert={handleOkAlert}
        data={dataAlertDialogSlide}
      />
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};
