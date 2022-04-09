import React from "react";
import DatePicker from "./../../../../../common/components/datePicker";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Styles from "./index.module.scss";
import { CkEditor } from "./../../../../../common/components/ckeditor";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MenuItem from "@material-ui/core/MenuItem";

export default function Index({ state, setstate }) {
  const handelCHnage = (data, type) => {
    let value = data;
    setstate(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className={Styles["inputs"]}>
      <Box width="23%" mr={1}>
        <TextField
          value={state.title}
          label="عنوان"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          onChange={event => handelCHnage(event.target.value, "title")}
        />
      </Box>

      <Box width="71.4%">
        <TextField
          value={state.name}
          label="نام"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          onChange={event => handelCHnage(event.target.value, "name")}
        />
      </Box>

      <Box width="23%" mr={1}>
        <TextField
          value={state.gift_category}
          label="گروه"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          onChange={event => handelCHnage(event.target.value, "gift_category")}
        />
      </Box>

      <Box width="23%" mr={1}>
        <TextField
          value={state.gift_sub_category}
          label="زیر گروه"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          onChange={event =>
            handelCHnage(event.target.value, "gift_sub_category")
          }
        />
      </Box>

      <Box width="23%" mr={1}>
        <TextField
          value={state.required_bonus}
          label="امتیاز مورد نظر "
          id="titleNewButton"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          type="number"
          onChange={event =>
            handelCHnage(Number(event.target.value), "required_bonus")
          }
        />
      </Box>

      <Box width="23%">
        <TextField
          value={state.remained_capacity || 0}
          label="ظرفیت باقی مانده"
          id="titleNewButton"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          type="number"
          onChange={event =>
            handelCHnage(Number(event.target.value), "remained_capacity")
          }
        />
      </Box>

      <Box width={"23%"}>
        <TextField
          id="standard-select-currency"
          select
          label={"نوع"}
          value={state.type}
          onChange={event => handelCHnage(event.target.value, "type")}
          helperText=""
          size="small"
          fullWidth
          variant="outlined"
          margin="dense"
        >
          <MenuItem value="BIMEH_SAMAN">بیمه سامان</MenuItem>
          <MenuItem value="TAHLIL">تحلیل</MenuItem>
          <MenuItem value="UP">آپ</MenuItem>
          <MenuItem value="DG">دیجی کالا</MenuItem>
          <MenuItem value="OFF_CODE">کد تخفیف</MenuItem>
          <MenuItem value="PHYSICAL">تحویل فیزیکی</MenuItem>
          <MenuItem value="NO_TYPE">عمومی</MenuItem>
          <MenuItem value="ONLINE_CHARGE">شارژ آنلاین</MenuItem>
        </TextField>
      </Box>

      <Box width="23%" ml={1}>
        <DatePicker
          label="تاریخ انقضاء"
          value={state.expiration_time ? state.expiration_time : null}
          setValue={data => handelCHnage(data, "expiration_time")}
        />
        {/* {data => handelCHnage(`${data ? `${dateMiladi(data)} 23:59:00.000000` : ''}`, 'expiration_time')} */}
      </Box>

      <Box width="23%" ml={1}>
        <TextField
          value={state.gift_code}
          label="کد کالا"
          id="titleNewButton"
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          type="number"
          onChange={event =>
            handelCHnage(Number(event.target.value), "gift_code")
          }
        />
      </Box>

      <Box width="100%" mt={1}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.is_physical}
                onChange={e => handelCHnage(!state.is_physical, "is_physical")}
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="is_physical"
              />
            }
            label="تایید جایزه به صورت اتوماتیک انجام شود"
          />
        </FormGroup>
      </Box>
      <Box width="96%" height={120} mt={2}>
        <TextareaAutosize
          value={state.description}
          aria-label="maximum height"
          placeholder="توضیحات خلاصه"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #ccc",
            padding: 10,
            backgroundColor: "transparent",
            borderRadius: 10
          }}
          onChange={event => handelCHnage(event.target.value, "description")}
        />
      </Box>

      <Box width={"96%"} height={"400px"} mt={2}>
        {state.detailed_description && (
          <CkEditor
            value={state.detailed_description}
            setValue={data =>
              handelCHnage(
                data === undefined ? "" : data,
                "detailed_description"
              )
            }
          />
        )}

        {/* {
                    !state.detailed_description && (
                        <CkEditor >
                            {
                                (data) => handelCHnage(data === undefined ? '' : data, 'detailed_description')
                            }
                        </CkEditor>

                    )
                } */}
      </Box>
    </div>
  );
}
