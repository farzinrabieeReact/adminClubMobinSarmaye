import React, { useState } from "react";
import makeStyles from "@material-ui/styles/makeStyles/makeStyles";
import {
  Button,
  Card,
  CardContent,
  Fade,
  Modal,
  Typography
} from "@material-ui/core";
import ModalEdit from "../modal/ModalEdit";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 380,
    width: 700,
    marginBottom: 20,
    maxHeight: 440,
    marginTop: 10,
    marginLeft: 30,
    borderRadius: "15px !important"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    minHeight: 50
  },
  desc: {
    width: "100%",
    height: 290,
    margin: "auto",
    textAlign: "justify",
    padding: 10,
    overflow: "auto"
  },
  btn: {
    color: "#3699FF",
    fontSize: 18,
    position: "relative",
    top: -10,
    left: 10
  }
});

export default function CardJobs({
  data,
  index,
  handelsubmitUpdate,
  handelDeleteSubmit
}) {
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = data => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
    return;
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} component="h2">
          {data.Title}
        </Typography>
        <Typography>
          <div
            className={classes.desc}
            dangerouslySetInnerHTML={{ __html: data.Content }}
          ></div>
        </Typography>
      </CardContent>
      <div className="p-5 w-100">
        <button
          className={"btnsYellow"}
          size="large"
          onClick={() => setNewButton(!newButton)}
        >
          ویرایش{" "}
        </button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={newButton}>
          <ModalEdit
            setNewButton={setNewButton}
            data={data}
            index={index}
            handelsubmitUpdate={handelsubmitUpdate}
            handelDeleteSubmit={handelDeleteSubmit}
          />
        </Fade>
      </Modal>
    </Card>
  );
}
