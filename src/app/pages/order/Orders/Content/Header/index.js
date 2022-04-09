import React, { useEffect } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "35ch",
    [`& fieldset`]: {
      borderRadius: 20,
    },
  },
}));

export default function Index({
  handelShowFilterItems,
  apiSelectProfile,
  stateReducerProfile,
  values,
  setValues,
  handleRefresh,
}) {
  const classes = useStyles();
  let dispatch = useDispatch();

  // const [values, setValues] = React.useState({ Ncode: '', fullName: '' });

  useEffect(() => {
    if (stateReducerProfile.data[0]) {
      let firstName = stateReducerProfile.data[0].body.first_name
        ? stateReducerProfile.data[0].body.first_name
        : "";
      let lastName = stateReducerProfile.data[0].body.last_name
        ? stateReducerProfile.data[0].body.last_name
        : "";

      setValues((prev) => ({
        ...prev,
        fullName: firstName + " " + lastName,
      }));
    }
    if (stateReducerProfile.national_id) {
      setValues((prev) => ({
        ...prev,
        Ncode: stateReducerProfile.national_id
          ? stateReducerProfile.national_id
          : "",
      }));
    }
  }, [stateReducerProfile.data, stateReducerProfile.national_id]); //eslint-disable-line  react-hooks/exhaustive-deps

  const handel_submit = () => {
    if (values.Ncode.length > 1) {
      apiSelectProfile(values.Ncode);
    } else {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "لطفا فیلد کد ملی را وارد نمایید",
          typeAlert: "info",
        },
      });
    }
  };

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, Ncode: event.target.value }));
  };

  return (
    <div className={Styles["header"]}>
      <Box borderRadius={20}  className={Styles["grid"]}>
        <FormControl
          size="small"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="standard-start-adornment">
            کد ملی را وارد نمایید
          </InputLabel>
          <OutlinedInput
            id="standard-start-adornment"
            type={"text"}
            value={values.Ncode}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onClick={handel_submit}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={270}
          />
        </FormControl>

        <Box ml={5} style={{marginTop:15}}>
          <p>{values.fullName}</p>
        </Box>
      </Box>

      <div className={Styles["icon"]}>
  
        {/* <RefreshIcon onClick={handleRefresh} style={{ cursor: "pointer",fontSize:25 }} />  */}

        {/* <button onClick={()=>apiSelectProfile('0015846237')}>send </button> */}
      </div>
    </div>
  );
}
