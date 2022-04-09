import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// import DatePicker from "./../../../Common/Components/DatePicker";
import Styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import DatePicker from "../../../../../../Common/Components/DatePicker";
import { dateConverttShamsiToMiladi } from "../../../../../../Common/method/date";

const useStyles = makeStyles((theme) => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    padding: 30,
  },
  buttons: {
    textAlign: "right",
  },
}));

export default function Index({
  flagFilter,
  stateFilter,
  handleChangeFilter,
  handelSubmitFilter,
  handleChange,
  valueIpo,
}) {
  const classes = useStyles();
  const Reducer = useSelector((state) => state.select_ipo_list_title_reducer);



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
            {/* <Box width={250} className={Styles["TextField"]}>
              <Autocomplete
                id="combo-box-demo"
                options={Reducer.data}
                getOptionLabel={(option) =>
                  option.body ? option.body.stock_name : ""
                }
                style={{ width: 250, height: 50 }}
                value={stateFilter.stock_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "stock_name")
                }
                className="auto"
                renderInput={(params) => (
                  <TextField {...params} label="نام عرضه" variant="outlined" />
                )}
              />
            </Box> */}

            {/* <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"شناسه"}
                value={stateFilter.isin}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "isin")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box> */}

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"نام عرضه"}
                value={stateFilter.stock_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "stock_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={200} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"تعداد سهم قابل درخواست"}
                value={stateFilter.max_quantity}
                onChange={(event) =>
                  handleChangeFilter(parseInt(event.target.value), "max_quantity")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={150} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"قیمت از"}
                value={stateFilter.min_price}
                onChange={(event) =>
                  handleChangeFilter(parseInt(event.target.value), "min_price")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                label={"تا قیمت"}
                value={stateFilter.max_price}
                onChange={(event) =>
                  handleChangeFilter(parseInt(event.target.value), "max_price")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            
            <Box width={200} className={Styles["TextField"]}>
              <DatePicker label="تاریخ عرضه">
                {(data) =>
                  handleChangeFilter(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "ipo_date"
                  )
                }
              </DatePicker>
              {/* <TextField
                id="standard-select-currency"
                label={"تاریخ عرضه"}
                value={stateFilter.ipo_date}
                onChange={(event) =>
                  handleChangeFilter(
                    event.target.value,
                    "ipo_date"
                  )
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              /> */}
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
    label: "تایید شده",
  },
  {
    value: "REJECTED",
    label: "رد شده",
  },
  {
    value: "NOT_PROCESSED",
    label: "در دست بررسی",
  },
];
