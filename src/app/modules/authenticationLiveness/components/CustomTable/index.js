import React, { useState } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DetailsModal from "../detailsModal";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
  padNone: {
    padding: "10px 10px 10px 5px",
  },
});

export default function CustomTable({ head, reducerState }) {
  const classes = useStyles();
  return (
    <Box>
      {reducerState.loading && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {head.map((item, index) => (
                <TableCell key={index} align="center" className={classes.head}>
                  {item.label}
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reducerState.data.map((row, ind) => (
              <TableRow key={ind}>
                {head.map((column, index) => {
                  let value = column.id === 1 ? ind + 1 : row[column.title];
                  return (
                    <TableCell align="center">
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell align="center" className={classes.padNone}>
                  <DetailsModal data={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
