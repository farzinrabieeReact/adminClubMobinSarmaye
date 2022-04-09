import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function TableBody({
  data,
  selectedItem,
  changedSelected,
  index,
  pagnation,
  stateReducer
}) {
  const handleClickRow = () => {
    changedSelected(
      selectedItem[1] === data.id ? [false, null] : [true, data.id]
    );
  };

  return (
    <TableRow
      selected={selectedItem[1] === data.id ? selectedItem[0] : false}
      // className={classes.tableRow}
      onClick={handleClickRow}
    >
      <TableCell className="colorInherit" align="center">
        {" "}
        {pagnation.number !== 1
          ? pagnation.number * stateReducer.size -
            stateReducer.size +
            (index + 1)
          : index + 1}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.ProvinceName}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.CityName ? data.body.CityName : "-"}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.FullName}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.OfficeId}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.PhoneNumber}
      </TableCell>
      <TableCell className="colorInherit" align="center">
        {data.body.PostalCode}
      </TableCell>
      <TableCell className="colorInherit" align="left">
        {data.body.Address}
      </TableCell>
      <TableCell className="colorInherit" align="left"></TableCell>
    </TableRow>
  );
}
