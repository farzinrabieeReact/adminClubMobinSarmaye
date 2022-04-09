import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React, { useState } from "react";
import ButtonDetails from "../buttonDetatils/ButtonDetails";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
}

export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item
}: elem) {
  const [flagDetails, setFlagDetails] = useState(false);
  const handleClickModal = () => {
    setFlagDetails(true);
  };
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
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      <TableCell align="center">
        <button className="btnsYellow" onClick={() => handleClickModal()}>
          مشاهده ضمائم
        </button>
        <ButtonDetails
          data={item}
          flagDetails={flagDetails}
          setFlagDetails={setFlagDetails}
        />

        {/*<ButtonDetails*/}
        {/*  info={{*/}
        {/*    title: "جزئیات",*/}
        {/*    color: "primary",*/}
        {/*    modal: "ModalDetails"*/}
        {/*  }}*/}
        {/*  data={item}*/}
        {/*/>*/}
      </TableCell>
    </TableRow>
  );
}
