import { Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionType as ipoListSelect} from '../../../../../redux/ipoList/ipoList_select'
// import { ipoList_select_title_action } from "../../../../../boot/api/Definitions/ipoLIst/select_ipos/action";

const useStyles = makeStyles(() => ({
  filterParent: {
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fliterDiv: {
    width: "400px",
    height: "200px",
    backgroundColor: "white",
    boxShadow: "0 0 19px grey",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btnParent: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    "& button": {
      width: "100%",
      color: "rgb(0, 204, 102)",
      borderColor: "rgb(0, 204, 102)!important",
    },
  },
}));

const Index = ({ valueIpo , handleSubmit ,handleChange }) => {
  const classes = useStyles();

  //   const stockName = distinctMethod(data, ["body", "ipo_stock_name"]);

  const Reducer = useSelector((state) => state.ipoList_select_reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    apiCall();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const apiCall = () => {
    // dispatch(ipoList_select_title_action());
    dispatch({
      type:ipoListSelect.ipoListSelectAsync,
      payload:{}
    })
  };
  


  if (Reducer?.data?.length === 0) {
    return <div className={classes.filterParent}>در حال بارگذاری</div>;
  }








  return (
    <div className={classes.filterParent}>
      <div className={classes.fliterDiv}>
        <div>

          <Autocomplete
            id="combo-box-demo"
            options={Reducer?.data}
            getOptionLabel={(option) => option.body?option.body.stock_name : ""}
            style={{ width: 300 }}
            value={valueIpo}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="نام عرضه" variant="outlined" />
            )}
          />
        </div>
        <div className={classes.btnParent}>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            تایید
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Index;
