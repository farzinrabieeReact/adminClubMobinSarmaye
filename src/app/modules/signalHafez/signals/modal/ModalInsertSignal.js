import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  InputBase,
  TextField,
  CircularProgress,
  MenuItem,
  makeStyles
} from "@material-ui/core";
import DataPicker from "./../../../../common/components/datePicker";

let useStyles = makeStyles({
  root: {
    maxWidth: "100%"
  },
  content: {
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function ModalInsertSignal({
  setOpen,
  handleSubmitInsert,
  loading
}) {
  let classes = useStyles();

  let myRef = useRef();
  const [state, setstate] = useState({
    title: "",
    document: "",
    stock_symbol: "",
    type: "",
    is_active: null,
    insert_date_time: null
  });
  const [nameFile, setNameFile] = useState("");

  const openFile = file => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;
      let size = input.files[0].size;

      let image = input.files[0].type;
      let formatImages = image.split("/");


      if (formatImages[1] === "pdf" && size <= 3000000) {
        // output.src = dataURL;
        // SetObj(prev => ({
        //     ...prev,
        //     Pic: dataURL
        // }))

        handleChangeValueInsert(dataURL, "document");

        setNameFile(input.files[0].name);
      } else {
        alert(
          "لطفا فرمت مناسبی را انتخاب نمایید و یا حجم فایل بالاتر از 3mb باشد (pdf)"
        );
      }
    };

    reader.readAsDataURL(input.files[0]);
  };

  const handleChangeValueInsert = (value, type) => {
    setstate(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmit = () => {
    let obj = {};
    Object.keys(state).forEach(element => {
      if (state[element]) {
        obj[element] = state[element];
      }
    });

    if (Object.keys(state).length !== Object.keys(obj).length) {
      alert("لطفا تمام فیلدها را پر نمایید");
      return;
    }

    handleSubmitInsert(state);
  };

  return (
    <Box p={3} className={classes.root}>
      <Box className={classes.content}>
        <Box m={2} width={232}>
          <TextField
            placeholder="نام نماد"
            fullWidth
            variant="outlined"
            value={state.stock_symbol}
            onChange={e =>
              handleChangeValueInsert(e.target.value, "stock_symbol")
            }
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            placeholder="عنوان"
            fullWidth
            variant="outlined"
            value={state.title}
            onChange={e => handleChangeValueInsert(e.target.value, "title")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            id="standard-select-competitions"
            select
            label={"نوع تحلیل"}
            value={state.type}
            fullWidth
            variant="outlined"
            onChange={event =>
              handleChangeValueInsert(event.target.value, "type")
            }
          >
            <MenuItem value="Technical">تکنیکال</MenuItem>
            <MenuItem value="Fundamental">بنیادی</MenuItem>
            <MenuItem value="Technical-Fundamental">تکنیکال-بنیادی</MenuItem>
          </TextField>
        </Box>
        <Box m={2} width={232}>
          <TextField
            id="standard-select-competitions"
            select
            label={"وضعیت"}
            value={state.is_active}
            fullWidth
            variant="outlined"
            onChange={event =>
              handleChangeValueInsert(event.target.value, "is_active")
            }
          >
            <MenuItem value="TRUE">فعال</MenuItem>
            <MenuItem value="FALSE">غیرفعال</MenuItem>
          </TextField>
        </Box>
        <Box
          m={2}
          width={232}
          border="1px solid #c4c4c4"
          padding="9px"
          borderRadius="5px"
        >
          <InputBase
            defaultValue="مسیر فایل"
            inputProps={{ "aria-label": "naked" }}
            value={nameFile ? nameFile : "مسیر فایل"}
          />
          <Button variant="contained" onClick={() => myRef.current.click()}>
            انتخاب
          </Button>
          <input
            type="file"
            style={{ display: "none" }}
            ref={myRef}
            onChange={event => openFile(event)}
          />
        </Box>
        <Box m={2} width={232}>
          <DataPicker
            label={"زمان ثبت"}
            value={state.insert_date_time ? state.insert_date_time : null}
            setValue={data => handleChangeValueInsert(data, "insert_date_time")}
          ></DataPicker>
        </Box>
      </Box>

      <Box mt={4} textAlign="end">
        {loading ? (
          <CircularProgress style={{ width: 30, height: 30, marginLeft: 15 }} />
        ) : (
          <button className="btnsGreen" onClick={handleSubmit}>
            ثبت
          </button>
        )}
        <button className="btnsRed" onClick={() => setOpen(false)}>
          انصراف
        </button>
      </Box>
    </Box>
  );
}
