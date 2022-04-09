import React, { useState } from "react";
import { number } from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonModal from "../buttonModal/ButtonModal";
import AlertDialogSlide from "../../../../common/components/AlertDialogSlide";
import { Grid } from "@material-ui/core";

interface elem {
  pagnation: any;
  index: any;
  stateReducer: any;
  head: any;
  item: any;
  handelSubmitUpdate: any;
  setflagApi: any;
  handleSubmitDelete: any;
}
export default function Index({
  index,
  pagnation,
  stateReducer,
  head,
  item,
  handelSubmitUpdate,
  setflagApi,
  handleSubmitDelete
}: elem) {
  const [flagEdit, setFlagEdit] = useState(false);
  const [flagDelete, setFlagDelete] = useState(false);
  const handleClickModal = (id: number, item: any) => {
    setFlagEdit(prevState => !prevState);
  };
  const handleOkAlert = () => {
    handleSubmitDelete(index);
    setFlagDelete(false);
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
          let value = item[column.title];
          return (
            <TableCell align="center">
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      <TableCell align="center">
        <div style={{ display: "flex" }}>
          <button
            className="btnsYellow"
            onClick={() => handleClickModal(1, item)}
          >
            ویرایش
          </button>
          <button className="btnsRed" onClick={() => setFlagDelete(true)}>
            حذف
          </button>
        </div>
        <ButtonModal
          index={index}
          item={item}
          flagEdit={flagEdit}
          setFlagEdit={setFlagEdit}
          handelSubmitUpdate={handelSubmitUpdate}
        />
        <AlertDialogSlide
          flagShow={flagDelete}
          handleCloseAlert={setFlagDelete}
          handleOkAlert={handleOkAlert}
          data={dataAlertDialogSlide}
        />
      </TableCell>
    </TableRow>
  );
}

const dataAlertDialogSlide = {
  title: "تایید",
  description: "از حذف این مورد اطمینان دارید؟"
};
