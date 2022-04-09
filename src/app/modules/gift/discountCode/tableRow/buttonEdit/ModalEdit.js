import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { Box, TextField } from "@material-ui/core";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";
import DatePicker from "../../../../../common/components/datePicker/index";
import { discountCode_update } from "../../../../../../redux/gift/discountCode/discountCode_update/discountCode_update";
import { handleNotificationAlertTryUpdate } from "../../../../../common/method/handleNotificationAlert";
const useStles = makeStyles(() => ({
  paper: {
    backgroundColor: "white",
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(4, 6, 3),
    // minWidth: "931px",
    padding: "50px",
    borderRadius: 10,
    width: "500px",
    maxWidth: "70%",
    display: "flex",
    justifyContent: "center",

    flexDirection: "column"
  }
}));

const ModalEdit = ({ data, setNewButton, setflagApi }) => {
  const classes = useStles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    code: "",
    gift_title: "",
    expiration_date: "",
    _id: ""
  });

  useEffect(() => {
    setState(prev => {
      return {
        ...prev,
        code: data.body.code,
        gift_title: data.body.gift_title,
        expiration_date: data.body.expiration_date,
        _id: data.id
      };
    });
  }, [data]);

  const handleChange = (value, type) => {
    setState(prevState => ({
      ...prevState,
      [type]: value
    }));
  };

  const handleClickEdit = () => {
    discountCode_update(state).then(res => {
      let isOk = handleNotificationAlertTryUpdate(res);
      if (!isOk) {
        return;
      }
      setTimeout(() => {
        setflagApi(prev => !prev);
      }, 1000);
    });
    setNewButton(false);
  };

  return (
    <>
      <Box className={classes.paper}>
        <h4>ویرایش</h4>
        <TextField
          label="کد تخفیف"
          id="titleNewButton"
          variant="outlined"
          value={state.code}
          style={{ margin: "20px 0", minWidth: "300px" }}
          onChange={e => handleChange(e.target.value, "code")}
        />
        {/*<TextField*/}
        {/*  label="دسته بندی"*/}
        {/*  id="titleNewButton"*/}
        {/*  variant="outlined"*/}
        {/*  style={{ margin: "20px 0", minWidth: "300px" }}*/}
        {/*  onChange={e => handleChange(e.target.value, "gift_title")}*/}
        {/*  value={state.gift_title}*/}
        {/*/>*/}
        <DatePicker
          label="تاریخ انقضا"
          value={state.expiration_date}
          setValue={data =>
            handleChange(
              `${convertDigitToEnglish(
                data?.format("YYYY/MM/DD")
              )} 00:00:00.000000`,
              "expiration_date"
            )
          }
        >
          {/* {data => handelCHnage(`${data}` , 'start_date')} */}
        </DatePicker>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "50px"
          }}
        >
          <button className="btnsGreen" onClick={handleClickEdit}>
            ویرایش
          </button>
          <button className="btnsRed" onClick={() => setNewButton(false)}>
            لغو
          </button>
        </div>
      </Box>
    </>
  );
};

export default ModalEdit;
