import React, { FC, useEffect, useState } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "./../datePicker";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchSymbol from './searchSymbol';


let useStyles = makeStyles({
  input: {
    width: "100%",
  },
});

interface Props {
  data?: {
    id?: number;
    label?: string | null;
    title?: null | string;
    active?: boolean;
    type?: string;
  };
  state?: any | null;
  handelChangeState?: any;
  handelSubmit?: any;
  flag: boolean;
  isLabel: boolean;
}

const Index: FC<Props> = ({
  data,
  state,
  handelChangeState,
  handelSubmit,
  flag,
  isLabel,
}: any): any => {



  let classes = useStyles();

  if (flag) return null;

  let obj: any = {
    checkbox: (
      <Checkbox
        name={data.label && isLabel ? data.label : ""}
        checked={state[data.title] === true ? true : false}
        inputProps={{ "aria-label": "secondary checkbox" }}
        onClick={() =>
          handelChangeState(
            state[data.title !== null ? data.title : ""] === true
              ? false
              : true,
            data.title
          )
        }
      />
    ),
    number: (
      <TextField
        className={classes["input"]}
        label={data.label && isLabel ? data.label : ""}
        value={
          state[data.title] === null ||
            state[data.title] === "null" ||
            state[data.title] === undefined
            ? ""
            : state[data.title]
        }
        onChange={(event: any) =>
          handelChangeState(event.target.value, data.title)
        }
        onKeyDown={(event: any) => (event.keyCode === 13 ? handelSubmit() : "")}
        variant="outlined"
        size={"small"}
        type="number"
      />
    ),
    text: (
      <TextField
        className={classes["input"]}
        label={data.label && isLabel ? data.label : ""}
        value={
          state[data.title] === null ||
            state[data.title] === "null" ||
            state[data.title] === undefined
            ? ""
            : state[data.title]
        }
        onChange={(event: any) =>
          handelChangeState(event.target.value, data.title)
        }
        onKeyDown={(event: any) => (event.keyCode === 13 ? handelSubmit() : "")}
        variant="outlined"
        size={"small"}
      />
    ),
    date: (
      <DatePicker
        label={data.label && isLabel ? data.label : ""}
        value={
          data.title !== null
            ? state[data.title] === ""
              ? null
              : state[data.title]
            : null
        }
        setValue={(d: any) => handelChangeState(d, data.title)}
      />
    ),
    option: (
      <>
        {data?.option && (
          <TextField
            className={classes["input"]}
            id="standard-select-currency"
            select
            value={state[data.title]}
            onChange={(event: any) =>
              handelChangeState(event.target.value, data.title)
            }
            helperText=""
            size="small"
            fullWidth
            variant="outlined"
            margin="dense"
            label={data.label && isLabel ? data.label : ""}
          >
            {data.option.map((item: any, index: any) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.title}
                </MenuItem>
              );
            })}
            <MenuItem value=""> همه </MenuItem>
          </TextField>
        )}
      </>
    ),
    autocomplete: (
      <>
        {
          data.autocomplete && (
            <Autocomplete
              id="combo-box-demo"
              size={'small'}
              value={state[data.title]}
              onChange={(event: any, value: any) => handelChangeState(value, data.title)}
              options={data.autocomplete.list}
              getOptionLabel={(option: any) => option[data.autocomplete.optionLabel]}
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label={data.label ? data.label : ""} variant="outlined" />}
            />
          )
        }
      </>
    ),
    symbol: <SearchSymbol
      valueSymbol={state[data.title]}
      type={data.title}
      handelChangeState={handelChangeState}
    />
  };

  return <div>{obj[data.type] ? obj[data.type] : ""}</div>;
};
export default Index;
