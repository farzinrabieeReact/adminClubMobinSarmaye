import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// import DatePicker from "./../../../Common/Components/DatePicker";
import Styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    padding: 30
  },
  buttons: {
    textAlign: "right"
  }
}));

export default function Index({
  flagFilter,
  stateFilter,
  handleChangeFilter,
  handelSubmitFilter,
  handleChange,
  valueIpo
}) {
  const classes = useStyles();
  const Reducer = useSelector(state => state.select_ipo_list_title_reducer);

  // console.log("titleReducer",titleReducer.data)

  // useEffect(() => {
  //     if(valueIpo){
  //         handleChangeFilter(valueIpo.id, "ipo_id")
  //     }
  // }, [valueIpo]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box className={Styles["filter"]}>
            {/* <Box width={193} style={{ margin: "0 50px" }} >
                                    <DatePicker label="تاریخ ثبت">
                                        {
                                            data => handleChange(data, "create_date")
                                        }
                                    </DatePicker>
                                </Box> */}
            <Box width={250} className={Styles["TextField"]}>
              <Autocomplete
                id="combo-box-demo"
                options={Reducer.data}
                getOptionLabel={option =>
                  option.body ? option.body.stock_name : ""
                }
                style={{ width: 250, height: 50 }}
                value={valueIpo}
                onChange={handleChange}
                className="auto"
                renderInput={params => (
                  <TextField {...params} label="نام عرضه" variant="outlined" />
                )}
              />
              {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="نام عرضه"
                                        value={stateFilter.ipo_stock_name}
                                        onChange={(event) => handleChangeFilter(event.target.value, "ipo_stock_name")}
                                        variant="outlined"
                                        size="small"
                                        helperText=""
                                        style={{ minWidth: 250 }}
                                    >
                                        {titleReducer.data.map((title,index.js)=>(
                                             <MenuItem value={title.body.stock_name}>
                                                 {title.body.stock_name} 
                                             </MenuItem> 
                                        ))}
                                    </TextField> */}
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"کد ملی"}
                value={stateFilter.member_national_id}
                onChange={event =>
                  handleChangeFilter(event.target.value, "member_national_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"کد معاملاتی"}
                value={stateFilter.member_bourse_account}
                onChange={event =>
                  handleChangeFilter(
                    event.target.value,
                    "member_bourse_account"
                  )
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="outlined-select-currency"
                select
                label="وضعیت پیش نیازها"
                value={stateFilter.state}
                onChange={event =>
                  handleChangeFilter(event.target.value, "state")
                }
                variant="outlined"
                size="small"
                helperText=""
                className="textField"
                style={{ minWidth: 250 }}
              >
                {is_visible.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button
                className="btnBlueFilter"
                onClick={() => handelSubmitFilter()}
              >
                بازخوانی
              </button>
            </div>
          </Box>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const is_visible = [
  {
    value: "FINALIZED",
    label: "تایید شده"
  },
  {
    value: "REJECTED",
    label: "رد شده"
  },
  {
    value: "NOT_PROCESSED",
    label: "در دست بررسی"
  }
];
