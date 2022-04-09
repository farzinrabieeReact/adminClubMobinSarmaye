import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Buttons from "./Buttons";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
    width: "96.2%",
    margin: "auto",
  },

  table: {
    minWidth: 600,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  modal: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 600,
    margin: "auto",
    padding: theme.spacing(5),
    "& div": {
      width: 250,
    },
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%",
  },
}));

export default function SimpleTable({ data,api_call_select }) {
  const classes = useStyles();
  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 10, height: "75vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {JSON.parse(data[0]?.body?.content)
            .map((row, ind) => (
              <TableRow
                key={ind}
              >
                <TableCell className="colorInherit" align="center">
                  {ind + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.Title}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {" "}
                  {row.Url}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  <Buttons
                    dataPrev={data}
                    api_call_select={api_call_select}
                    row={row}
                    info={{
                      title: "ویرایش",
                      className: "btnsYellow",
                      modal: "ModalAdd",
                    }}
                  />
                  <Buttons
                    api_call_select={api_call_select}
                    dataPrev={data}
                    row={row}
                    info={{
                      title: "حذف",
                      className: "btnsRed",
                      modal: "AlertDialogSlide",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const tableHead = ["ردیف", "عنوان سامانه", "لینک", "ابزار"];

// const tablebody = [

//     { nameCompatitions: 'اوراق ', dateStart: 'تجارت' },

// ];
