import React, { useRef } from "react";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";

export default function Index({ value, setValues }) {
  let myRef = useRef();
  const openFile = file => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;
      let image = input.files[0].type;

      let data = {
        file: dataURL,
        file_type: image.split("/")[1],
        file_name: input.files[0].name,
        file_size: input.files[0].size
      };

      setValues(data);
    };

    reader.readAsDataURL(input.files[0]);
  };

  const handelclik = type => {
    if (type === "حذف") {
      myRef.current.value = null;
      setValues("");
    }

    if (!value.file && type === "انتخاب") {
      myRef.current.click();
    }
  };

  return (
    <Box
      width="100%"
      className={"shadow p-5 mt-5 d-flex justify-content-between "}
    >
      <InputBase
        inputProps={{ "aria-label": "naked" }}
        value={value.file_name ? value.file_name : "مسیر فایل"}
        className={"w-75"}
      />
      <button
        type={"button"}
        value={!value.file ? "انتخاب" : "حذف"}
        className={`btn btn-outline-${!value.file ? "success" : "danger"}`}
        onClick={event => handelclik(event.currentTarget.value)}
      >
        {!value.file ? "انتخاب" : "حذف"}
      </button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={myRef}
        onChange={event => openFile(event)}
      />
    </Box>
  );
}
