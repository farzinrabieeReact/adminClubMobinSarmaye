import React from "react";
import Styles from "./index.module.scss";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DatePicker from "../../../../../common/components/datePicker";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  }
}));

export default function Input({ state, handleChange }) {
  const classes = useStyles();

  return (
    <div className={classes["root"]}>
      <Box width={250} className={Styles["TextField"]}>
        <TextField
          id="standard-select-lastname"
          label={"نام"}
          value={state.body.member_first_name}
          onChange={event =>
            handleChange(event.target.value, "member_first_name")
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
          label={"نام خانوادگی"}
          value={state.body.member_last_name}
          onChange={event =>
            handleChange(event.target.value, "member_last_name")
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
          label={"کد ملی"}
          value={state.body.member_national_id}
          onChange={event =>
            handleChange(event.target.value, "member_national_id")
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
          label={"نماد"}
          value={state.body.stock_symbol}
          onChange={event => handleChange(event.target.value, "stock_symbol")}
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
          label={"شرکت"}
          value={state.body.company_name}
          onChange={event => handleChange(event.target.value, "company_name")}
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
          label={"تعداد سهام"}
          value={state.body.stocks}
          onChange={event => handleChange(event.target.value, "stocks")}
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
          label={"ارزش سود"}
          value={state.body.dividend_value}
          onChange={event => handleChange(event.target.value, "dividend_value")}
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
          label={"سود ناخالص نقدی توزیع شده"}
          value={state.body.distributed_gross_margin}
          onChange={event =>
            handleChange(event.target.value, "distributed_gross_margin")
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
          label={"سود خالص نقدی توزیع شده"}
          value={state.body.distributed_netincome}
          onChange={event =>
            handleChange(event.target.value, "distributed_netincome")
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
          label={"ارزش سهام پیش از مجمع"}
          value={state.body.pre_price_stock_agm}
          onChange={event =>
            handleChange(event.target.value, "pre_price_stock_agm")
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
          label={"قیمت سهم پس از مجمع"}
          value={state.body.post_price_stock_agm}
          onChange={event =>
            handleChange(event.target.value, "post_price_stock_agm")
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
          label={"قیمت سهم پیش از مجمع"}
          value={state.body.pre_value_stock}
          onChange={event =>
            handleChange(event.target.value, "pre_value_stock")
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
          label={"ارزش سهام پس از مجمع"}
          value={state.body.post_value_stock}
          onChange={event =>
            handleChange(event.target.value, "post_value_stock")
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
          label={"سرمایه شرکت"}
          value={state.body.company_asset}
          onChange={event => handleChange(event.target.value, "company_asset")}
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
          label={"سود خالص تحقق یافته"}
          value={state.body.valid_netincome}
          onChange={event =>
            handleChange(event.target.value, "valid_netincome")
          }
          helperText=""
          size="small"
          fullWidth
          variant="outlined"
          margin="dense"
        />
      </Box>
      <Box width={250} className={Styles["TextField"]}>
        <DatePicker
          label="تاریخ مجمع"
          value={state.body.agm_date}
          setValue={data =>
            handleChange(
              `${convertDigitToEnglish(
                data?.format("YYYY/MM/DD")
              )} 00:00:00.000000`,
              "agm_date"
            )
          }
        >
          {/* {data => handelCHnage(`${data}` , 'start_date')} */}
        </DatePicker>
      </Box>
      <Box width={250} className={Styles["TextField"]}>
        <DatePicker
          label="تاریخ اعلام"
          value={state.body.publish_date}
          setValue={data =>
            handleChange(
              `${convertDigitToEnglish(
                data?.format("YYYY/MM/DD")
              )} 00:00:00.000000`,
              "publish_date"
            )
          }
        ></DatePicker>
      </Box>
      <Box width={250} className={Styles["TextField"]}>
        <DatePicker
          label="تاریخ پرداخت"
          value={state.body.pay_date}
          setValue={data =>
            handleChange(
              `${convertDigitToEnglish(
                data?.format("YYYY/MM/DD")
              )} 00:00:00.000000`,
              "pay_date"
            )
          }
        ></DatePicker>
      </Box>
    </div>
  );
}
