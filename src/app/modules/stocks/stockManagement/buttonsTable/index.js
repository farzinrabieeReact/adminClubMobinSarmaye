import { Box } from "@material-ui/core";
import React, { useState } from "react";
import ModalCustom from "./../../../../common/components/modal";
import Edit from "./edit";


export default function ButtonsTable({
  row,
  handleSubmitEdit
}) {
  const [openEdit, setOpenEdit] = useState(false);



  return (
    <Box>
      <Box>
        <button onClick={() => setOpenEdit(true)} className={`btnsBlue`}>
          ویرایش
       </button>
      </Box>

      <ModalCustom open={openEdit} setOpen={setOpenEdit}>
        <Edit data={row} handleSubmitEdit={handleSubmitEdit} setOpenEdit={setOpenEdit} />
      </ModalCustom>

    </Box>
  );
}