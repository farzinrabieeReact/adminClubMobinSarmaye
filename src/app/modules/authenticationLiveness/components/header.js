import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  refreshStyle: {
    height: "auto",
    fontSize: 25,
    marginRight: 20,
    cursor: "pointer",
  },
});

export default function Header({
  handelRefresh,
}) {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <RefreshIcon
        className={classes.refreshStyle}
        onClick={() => handelRefresh()}
      />
    </div>
  );
}
