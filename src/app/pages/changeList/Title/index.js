import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  title: {
    width: "90%",

    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "10px",
    marginBottom: "30px"
  },
  h: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px"
  },
  ul: {
    padding: "0",
    paddingLeft: "25px",
    margin: "0",

    "& li": {
      color: "grey",
      lineHeight: "25px"
    }
  },
  titleText: {
    display: "inline-block",
    color: "green",
    fontSize: "12px"
  },
  btnGreen: {
    color: "#1bc5bd",
    backgroundColor: "#c9f7f5",
    padding: ".10rem .55rem",
    borderRadius: ".42rem",
    fontSize: ".7rem",
    fontWeight: 500,
    margin: "5px 10px"
  },
  btnBlue: {
    color: "#6993ff",
    backgroundColor: "#e1e9ff",
    padding: ".10rem .55rem",
    borderRadius: ".42rem",
    fontSize: ".7rem",
    fontWeight: 500,
    margin: "5px 10px"
  },
  btnRed: {
    color: "#ffe2e5",
    backgroundColor: "#f64e60",
    padding: ".10rem .55rem",
    borderRadius: ".42rem",
    fontSize: ".7rem",
    fontWeight: 500,
    margin: "5px 10px"
  }
}));

const Index = ({ textData, type, btnTitle }) => {
  const classes = useStyles();

  return (
    <>
      {textData.map((info, index) => (
        <div className={classes.title} key={index}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="btnsGreen d-flex justify-content-center align-items-center">
              {info.version}
            </span>
            <span
              style={{ fontSize: "11px", marginTop: "5px" }}
              className="d-flex justify-content-center align-items-center"
            >
              {info.date}
            </span>
          </div>
          <div style={{ width: "80%" }}>
            <div className={classes.h}>
              <h3 style={{ padding: "0", margin: "0" }}>{info.title}</h3>
            </div>
            <ul className={classes.ul}>
              {info.list.map((infoList, index) => (
                <li key={index}>
                  <div>
                    <span
                      className={
                        infoList.per === type.insert
                          ? classes.btnGreen
                          : infoList.per === type.update
                          ? classes.btnBlue
                          : classes.btnRed
                      }
                      style={{ display: "inline-block" }}
                    >
                      {infoList.per === type.insert
                        ? btnTitle.titleInsert
                        : infoList.per === type.update
                        ? btnTitle.titleUpdate
                        : btnTitle.titleFixid}
                    </span>
                    <span style={{ marginBottom: "10px" }}>
                      {infoList.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Index;
