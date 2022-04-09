import React, { useState, useRef } from "react";
import Styles from "./index.module.scss";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

export default function Index({
  stateImages,
  SetStateImages,
  setNameFile,
  nameFile
}) {
  let myRef = useRef();

  const openFile = file => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;

      let image = input.files[0].type;
      let formatImages = image.split("/");

      if (
        formatImages[1] === "png" ||
        formatImages[1] === "jpg" ||
        formatImages[1] === "jpeg"
      ) {
        // output.src = dataURL;
        SetStateImages(prev => ({
          ...prev,
          image: dataURL
        }));

        setNameFile(input.files[0].name);
      } else {
        alert("لطفا فرمت مناسبی را انتخاب نمایید (png , jpeg)");
      }
    };

    reader.readAsDataURL(input.files[0]);
  };

  return (
    <Box width="100%" className={Styles["grid"]}>
      <div
        className={Styles["defualtImages"]}
        style={
          !stateImages.image
            ? {
                border: "1px solid rgba(0,0,0,0.5)",
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 8
              }
            : {}
        }
      >
        {stateImages.image && (
          <img className={Styles["img"]} src={stateImages.image} alt="" />
        )}
      </div>
      <Box width="100%">
        <Box width="100%" className={Styles["card-inputs-file"]}>
          <InputBase
            // defaultValue="مسیر عکس"
            inputProps={{ "aria-label": "naked" }}
            value={nameFile}
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
      </Box>
    </Box>
  );
}
