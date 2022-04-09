import React, { useEffect, useState } from "react";
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
    // marginTop:10,
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

export default function SimpleTable({ data,handleRefresh }) {
  const classes = useStyles();
//   const [state, setstate] = useState([]);

//   useEffect(() => {
    //     setstate(JSON.parse(data[0]?.body?.content));
    //   }, [data]);

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
                  // onClick={() => handleSortTa\ble(ind, item)}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            JSON.parse(data[0]?.body?.content)
            .map((row, ind) => (
              <TableRow
                key={ind}
                // className={classes.tableRow}
                // onClick={handleClickRow}
              >
                <TableCell className="colorInherit" align="center">
                  {ind + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.title}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {" "}
                  {row.link}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  <Buttons
                    dataPrev={data}
                    handleRefresh={handleRefresh}
                    row={row}
                    info={{
                      title: "ویرایش",
                      className: "btnsYellow",
                      modal: "ModalAdd",
                    }}
                  />
                  <Buttons
                  handleRefresh={handleRefresh}
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
