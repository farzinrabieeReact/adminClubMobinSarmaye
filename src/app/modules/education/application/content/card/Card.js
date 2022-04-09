import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Fade,
  Modal,
  Typography
} from "@material-ui/core";
import ModaltEditEdit from "./modalEdit/ModaltEdit";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 380,
    width: 700,
    marginBottom: 20,
    maxHeight: 440,
    margin: 20,
    position: "relative",
    borderRadius: "15px",
    padding: "0 10px"
  },
  title: {
    fontSize: 30,
    textAlign: "center"
  },
  desc: {
    width: "100%",
    height: 265,
    margin: "auto",
    color: "#3699FF",
    overflowY: "auto",
    lineHeight: 2,
    marginTop: 20
  },
  btn: {
    color: "#3699FF",
    fontSize: 18,
    position: "absolute",
    bottom: 10,
    left: 10
  }
});

export default function SimpleCard({ category, data, index, handelChange }) {
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
        <Typography className={classes.title} component="h1">
          {category}
        </Typography>
        <Typography>
          <ul className={classes.desc}>
            {data.map((item, ind) => {
              if (item.category === category) {
                return (
                  <li key={ind}>
                    <a target={"_blank"} href={item.link}>
                      {item.title}
                    </a>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </Typography>
      </CardContent>

      <button className="btnsGreen" onClick={() => setNewButton(!newButton)}>
        بیشتر
      </button>
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
          <ModaltEditEdit
            setNewButton={setNewButton}
            data={data}
            category={category}
            handelChange={handelChange}
            index={index}
          />
        </Fade>
      </Modal>
    </Card>
  );
}
