import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
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

export default function ModalContent({ item, data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stateReducer = useSelector(
    state => state.workWithUs_AttachmentSelect_reducer
  );

  const [senderCV, setsenderCV] = useState("");
  const [attachmentType, setattachmentType] = useState([]);

  // useEffect(() => {
  //   dispatch(workwithus_v1_select_attachments_actions(data));
  // }, []);
  //
  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: WORK_WITH_US_V1_SELECT_ATTACHMENTS_EMPTY });
  //   };
  // }, []);

  useEffect(() => {
    if (stateReducer.data.length > 0) {
      setsenderCV(stateReducer?.data[0]?.body.sender_cv);
      cvSplit(stateReducer?.data[0]?.body.sender_cv);
    } else {
    }
  }, [stateReducer]);

  const cvSplit = sender_CV => {
    if (sender_CV) {
      let typeSplit1 = sender_CV.split("/");
      let typeSplit2 = typeSplit1[1].split(";");
      setattachmentType(typeSplit2[0]);
    }
  };

  return (
    <div className={classes.modalDetail}>
      <div style={{ width: "100%", display: "block", textAlign: "center" }}>
        {attachmentType === "pdf" && (
          <iframe
            src={senderCV}
            style={{ margin: "10px 2.5%", width: "99%", height: "700px" }}
          ></iframe>
        )}
        {attachmentType !== "pdf" && (
          <img
            style={{ margin: "10px 2.5%" }}
            display="block"
            width="45%"
            src={senderCV}
            alt=""
          />
        )}
        {senderCV === "" && "هیچ فایل ضمیمه‌ای وجود ندارد"}
      </div>
    </div>
  );
}
