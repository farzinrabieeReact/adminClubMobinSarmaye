import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  divisionFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));
export default function Header({ handleRefresh }) {
  const classes = useStyles();
  return (
    <Box className={classes.divisionFlex}>
      <RefreshIcon onClick={handleRefresh} className="btnIcon" />
    </Box>
  );
}
