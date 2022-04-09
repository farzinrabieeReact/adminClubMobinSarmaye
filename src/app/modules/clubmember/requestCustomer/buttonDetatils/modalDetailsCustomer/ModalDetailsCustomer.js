import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesCustomerAttachment } from "../../../../../../redux/clubmember/clubmember_select_broker_customer_atachement/index";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap"
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15
  }
}));

export default function ModalDetailsCustomer({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stateReducer = useSelector(
    state => state.select_clubmember_attachment_reducer
  );
  const [attachments, setattachments] = useState([]);

  useEffect(() => {
    const _data = {
      data: { _id: data.id }
    };
    dispatch({
      type: actionTypesCustomerAttachment.selecClubmemberAttachmentAsync,
      payload: _data
    });
    return () => {
      dispatch({
        type: actionTypesCustomerAttachment.selecClubmemberAttachmentEmpty
      });
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  // functions

  useEffect(() => {
    if (stateReducer.data.length) {
      let attachment = stateReducer.data[0].body.attachments
        ? JSON.parse(stateReducer.data[0].body.attachments)
        : [];
      setattachments(attachment);
    }
  }, [stateReducer]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //     if (stateReducer.data.length) {
  //         let attachment = stateReducer.data[0].body.attachments
  //             ? JSON.parse(stateReducer.data[0].body.attachments)
  //             : [];
  //
  //         setattachments(attachment);
  //     }
  //
  // }, [stateReducer])

  return (
    <div className={classes.modalDetail}>
      <div style={{ width: "100%", display: "block", textAlign: "center" }}>
        {stateReducer.loading ? <LinearProgress /> : null}
        {attachments
          ? attachments.map((itm, ind) => {
              return (
                <img
                  style={{ margin: "10px 2.5%" }}
                  display="block"
                  width="45%"
                  key={ind}
                  src={`${
                    itm["File"]
                      ? itm["File"]
                      : `data:image/jpeg;base64,${itm["file-content"]}`
                  }`}
                  id={"attachmentId" + ind + 1}
                  alt=""
                />
              );
            })
          : "ضمیمه‌ای وجود ندارد"}
      </div>
    </div>
  );
}
