import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from './../../../../common/components/datePicker';
import {dateConverttShamsiToMiladi} from './../../../../common/method/date';


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

const FilterBox = ({
  flagFilter,
  stateFilter,
  handleChangeFilter,
  handelSubmitFilter,
}) => {
  const classes = useStyles();
  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box className={Styles["filter"]}>
            <Box width={193} style={{ margin: "0 50px" }} >
              <DatePicker label="تاریخ انقضا">
                {
                  data => handleChangeFilter(data ? `${dateConverttShamsiToMiladi(data)} 23:59:59.999999` : '', "expiration_date")
                }
              </DatePicker>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-name"
                label={"کد تخفیف"}
                value={stateFilter.code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "code")
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
                id="standard-select-lastname"
                label={"دسته بندی"}
                value={stateFilter.category}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "category")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            {/* <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-nationalId"
                label={"تاریخ انقضا"}
                value={stateFilter.expiration_date}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "expiration_date")
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
                id="standard-select-bunus"
                label={"کاربر ادمین"}
                value={stateFilter.issuer_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "issuer_id")
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
                id="standard-select-id"
                label={"شناسه مشتری"}
                value={stateFilter.member_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
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
      ) : null}
    </>
  );
};

export default FilterBox;
