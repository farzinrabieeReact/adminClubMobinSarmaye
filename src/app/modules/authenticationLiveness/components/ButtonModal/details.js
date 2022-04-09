import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  flexDisplay: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "noWrap",
    width: '1000px',
  },
  divison: {
    width: "80%",
    padding: 10,
    margin: "auto",
    maxHeight: "500px",
  },
  img: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
  },
  lableParent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  lableParentVideo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
  },
  noData: {
    marginTop: 30,
  },
}));

export default function Details({ data }) {
  const classes = useStyles();

  return (
    <Box className={classes.flexDisplay}>
      {data.video ? (
        <Box className={classes.lableParentVideo}>
          <label className={classes.head}>ویدیو کاربر</label>
          {data.video !== null && data.video !== "null" ? (
            <Box className={classes.divison}>
              <video
                className={classes.img}
                src={data.video}
                title="video"
                controls
                autoplay
              ></video>
            </Box>
          ) : (
            <Box className={(classes.divison, classes.noData)}>
              داده ای وجود ندارد
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box className={classes.lableParent}>
            <label className={classes.head}>تصویر کارت ملی</label>
            {data.inputImage !== null && data.inputImage !== "null" ? (
              <Box className={classes.divison}>
                <img
                  className={classes.img}
                  src={
                    data.input_image_uri
                      ? data.input_image_uri
                      : data.inputImage
                    // data.inputImage
                  }
                  title="input_image"
                />
              </Box>
            ) : (
              <Box className={(classes.divison, classes.noData)}>
                داده ای وجود ندارد
              </Box>
            )}
          </Box>
          <Box className={classes.lableParent}>
            <label className={classes.head}>تصویر امضای کاربر</label>
            {data.inputSigniture !== null && data.inputSigniture !== "null" ? (
              <Box className={classes.divison}>
                <img
                  className={classes.img}
                  src={data.inputSigniture}
                  title="input_sign_image_uri"
                />
              </Box>
            ) : (
              <Box className={(classes.divison, classes.noData)}>
                داده ای وجود ندارد
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
