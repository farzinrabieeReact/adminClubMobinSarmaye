import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonsTable from "./../buttonsTable";


export default function Index({ head, stateReducer, pagnation, handleSubmitEdit, item, index }: any) {

  return (
    <TableRow key={index}>
      <TableCell align="center">
        {pagnation.number !== 1
          ? pagnation.number * stateReducer.size -
          stateReducer.size + (index + 1) : index + 1}
      </TableCell>
      {head
        .filter(
          (column: any, ind: any) => !column.active
        )
        .map((column: any, index: any) => {
          let value = item.body[column.title];
          return (
            <TableCell align="center" key={index}>
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}

      <TableCell
        className="colorInherit"       
      >
        <ButtonsTable
          row={item}
          handleSubmitEdit={handleSubmitEdit}
        />
      </TableCell>
    </TableRow>
  )
}