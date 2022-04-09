import React, {  useState } from "react";
import Checkbox from '@material-ui/core/Checkbox';

import {
  Box,
  TextField,
  CircularProgress,
  MenuItem,
  makeStyles
} from "@material-ui/core";

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

  const [state, setstate] = useState({
    Name: "",
    ProvinceName: "",
    CityName: "",
    DirectorName: "",
    Address: '',
    PhoneNumber: '',
    CityCodePhoneNumber: '',
    IsActive: 'TRUE',
    IsBranch: 'TRUE',
    IsMainBranch: 'FALSE',
    PostalCode: '',
    GoogleMapUrl: '',
  });

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
            label="شعبه"
            fullWidth
            variant="outlined"
            value={state.Name}
            onChange={(e) => handleChangeValueInsert(e.target.value, "Name")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="استان"
            fullWidth
            variant="outlined"
            value={state.ProvinceName}
            onChange={(e) => handleChangeValueInsert(e.target.value, "ProvinceName")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="شهر"
            fullWidth
            variant="outlined"
            value={state.CityName}
            onChange={(e) => handleChangeValueInsert(e.target.value, "CityName")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="مسئول"
            fullWidth
            variant="outlined"
            value={state.DirectorName}
            onChange={(e) => handleChangeValueInsert(e.target.value, "DirectorName")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="آدرس"
            fullWidth
            variant="outlined"
            value={state.Address}
            onChange={(e) => handleChangeValueInsert(e.target.value, "Address")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="کد معرف شعبه"
            fullWidth
            variant="outlined"
            value={state.recommender_id}
            onChange={(e) => handleChangeValueInsert(e.target.value, "recommender_id")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="تلفن"
            fullWidth
            variant="outlined"
            value={state.PhoneNumber}
            onChange={(e) => handleChangeValueInsert(e.target.value, "PhoneNumber")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="کد"
            fullWidth
            variant="outlined"
            value={state.CityCodePhoneNumber}
            onChange={(e) => handleChangeValueInsert(e.target.value, "CityCodePhoneNumber")}
          />
        </Box>
        <Box m={2} width={232}>
          <TextField
            id="standard-select-competitions"
            select
            label={"فعال/غیرفعال"}
            value={state.IsActive}
            fullWidth
            variant="outlined"
            onChange={(event) =>
              handleChangeValueInsert(event.target.value, "IsActive")
            }
          >
            <MenuItem value="TRUE">فعال</MenuItem>
            <MenuItem value="FALSE">غیر فعال</MenuItem>
          </TextField>
        </Box>
        <Box m={2} width={232}>
          <TextField
            id="standard-select-competitions"
            select
            label={"شعبه/نمایندگی"}
            value={state.IsBranch}
            fullWidth
            variant="outlined"
            onChange={(event) =>
              handleChangeValueInsert(event.target.value, "IsBranch")
            }
          >
            <MenuItem value="TRUE">شعبه</MenuItem>
            <MenuItem value="FALSE">نمایندگی</MenuItem>
          </TextField>
        </Box>
        <Box m={2} width={232}>
          <TextField
            label="کد پستی"
            fullWidth
            variant="outlined"
            value={state.PostalCode}
            onChange={(e) => handleChangeValueInsert(e.target.value, "PostalCode")}
          />
        </Box>
        <Box m={2} width={232}>
          <Checkbox
            checked={state.IsMainBranch === 'TRUE' ? true : false}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onClick={(event) => handleChangeValueInsert(event.target.checked ? 'TRUE' : 'FALSE' , 'IsMainBranch')}
          />
          شعبه مرکزی
        </Box>
        <Box m={2} width={'90%'}>
          <TextField
            label="نقشه"
            fullWidth
            variant="outlined"
            value={state.GoogleMapUrl}
            onChange={(e) => handleChangeValueInsert(e.target.value, "GoogleMapUrl")}
          />
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
