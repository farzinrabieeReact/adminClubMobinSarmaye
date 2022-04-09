import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { marketer_details } from "../../../../../../redux/formManager/marketer/marketer_details";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../../common/method/handleNotificationAlert";
import { LinearProgress } from "@material-ui/core";


const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 30,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto"
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15
  },
  LinearProgress: {
    width: "100%"
  }
}));

export default function ModalContent({
  item
}) {
  const classes = useStyles();
  const [state, setstate] = useState({})
  const [attachmentType, setattachmentType] = useState([]);


  useEffect(() => {
    apiCallAttachment()
  }, [])



  const cvSplit = (sender_CV) => {
    if (sender_CV) {
      let typeSplit1 = sender_CV.split("/");
      let typeSplit2 = typeSplit1[1].split(";");
      setattachmentType(typeSplit2[0]);
    }
  };

  const apiCallAttachment = () => {
    if (item?.id) {
      marketer_details(item.id)
        .then((res) => {
          let isOk = handleNotificationAlertTrySelect(res)
          if (isOk) {
            let result = res.data.response.data.results[0]
            setstate(result)
            cvSplit(result.body.sender_cv);
          }
        })
        .catch(() => {
          handleNotificationAlertCatch()
        })
    }
  }


  return (
    <div className={classes.modalDetail}>
      {
        !state.id ? (
          <LinearProgress />
        ) : (
            <div style={{ width: "100%", display: "block", textAlign: "center" }}>
              {attachmentType === "pdf" && (
                <iframe
                  src={state?.body.sender_cv}
                  style={{ margin: "10px 2.5%", width: "99%", height: "700px" }}
                ></iframe>
              )}
              {attachmentType !== "pdf" && (
                <img
                  style={{ margin: "10px 2.5%" }}
                  display="block"
                  width="45%"
                  src={state?.body.sender_cv}
                  alt=""
                />
              )}
              {state?.body.sender_cv === "" && "هیچ فایل ضمیمه‌ای وجود ندارد"}
            </div>
          )
      }

    </div >
  );
}
