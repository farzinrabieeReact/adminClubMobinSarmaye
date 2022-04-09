import { TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

const style = {
  width: 500,
  height: 200,
  color: "black",
  backgroundColor: "white",
  borderRadius: 8,
  padding: 20,
};
const Index = ({
  handleChange,
  nationId,
  setnationId,
  handleExit,
  apiSelectClubmember,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (nationId.length === 0) {
      let textError = "لطفا کد ملی راوارد نمایید";
      dispatch({
        type: "ALERT",
        payload: { status: true, textAlert: textError, typeAlert: "warning" },
      });
      alert("لطفا کد ملی را وارد کنید");
      return;
    }

    apiSelectClubmember(nationId);
  };

  return (
    <>
      <div style={style}>
        <h3 className="mb-5">جستجو کدملی</h3>
        <TextField
          id="outlined-basic"
          // label="Outlined"
          style={{width:250}}
          variant="outlined"
          // id="demo-helper-text-aligned"
          label="کدملی را وارد کنید"
          value={nationId}
          onChange={(event) => handleChange(event)}
        />

        <div className="mt-10 d-flex justify-content-end">
          <button className="btnsRed" onClick={handleExit}>
            لغو
          </button>
          <button className="btnsGreen" onClick={handleSubmit}>
            تایید
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
