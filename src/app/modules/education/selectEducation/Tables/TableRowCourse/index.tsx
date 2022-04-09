import React from "react";
// import ButtonDetails from "./../buttonDetails";
import Buttons from "../Buttons/index";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import LongMenu from "../../LongMenu";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  flagTypePage?: any;
}

export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  handleOpen,
  apiCoursesUpdate,
  apiCoursesDeactive,
  apiCoursesActive,
  setflagApi
}: any) {
  return (
    <TableRow key={index}>
      <TableCell align="center">
        {pagnation.number !== 1
          ? pagnation.number * stateReducer.size -
            stateReducer.size +
            (index + 1)
          : index + 1}
      </TableCell>
      {head
        .filter(
          (column: any, index: any) => index !== 0 && index !== head.length
        )
        .map((column: any, index: any) => {
          let value = item.body[column.title];
          return (
            <TableCell align="center">
              {}
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}

      <TableCell
        className="colorInherit"
        // align="center"
        style={{
          minWidth: 300,
          display: "flex"
        }}
      >
        <button
          style={{ marginTop: 10 }}
          onClick={() => handleOpen(index, item.id)}
          // className={classes.btnModal}
          className={"btnsBlue"}
        >
          ثبت نام کننده ها
        </button>
        <Buttons
          info={{
            title: "ویرایش",
            className: "btnsYellow",
            modal: "ModalEdit"
          }}
          data={item}
          apiCoursesUpdate={apiCoursesUpdate}
          setflagApi={setflagApi}
        />

        <Buttons
          index={index}
          info={{
            title: item.body.is_active === "TRUE" ? "غیر فعال" : "فعال",
            className: item.body.is_active === "TRUE" ? "btnsRed" : "btnsGreen",
            modal: "modalDelete"
          }}
          apiCoursesDeactive={apiCoursesDeactive}
          apiCoursesActive={apiCoursesActive}
          data={item}
        />
      </TableCell>
      {/* <TableCell
        className="colorInherit"
        // align="center"
      ></TableCell> */}
    </TableRow>
  );
}
