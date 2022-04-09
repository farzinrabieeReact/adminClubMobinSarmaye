import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import ModalEdit from "./EditModal";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AlertDialogSlide from "./../../../common/components/AlertDialogSlide";
import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import { seprateNumberFromComma } from "../../../common/method/seprateNumberFromComma";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../../redux/notificationAlert";
// import {
//     actionTypes as actionTypesNotif
// } from "./../../../../redux/notificationAlert";

const useStyles = makeStyles({
  root: {
    width: "23%",
    margin: "1%",
    paddingTop: 10,
    borderRadius: 10
  },
  CardActions: {
    display: "flex",
    justifyContent: "space-between"
  },
  cardHeader: {
    textAlign: "center",
    "& div": {
      width: "100%"
    },
    "& span": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },
  border: {
    borderBottom: "1px solid lightgray",
    padding: "7px 0"
  },
  image: {
    width: "auto",
    height: 130,
    margin: "auto"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export function CardGift({
  data,
  apiCallSelectAfterApdate,
  apiGiftActive,
  apiGiftDeactivate
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [flagShow, setFlagShow] = useState(false);
  const [FlagAlert, setFlagAlert] = useState(false);
  // const dispatch = useDispatch()
  const ref = React.createRef();
  const { push } = useHistory();

  const handleClickButton = data => {
    if (data === "NEW") {
      setFlagShow(prev => !prev);
    }
    return;
  };

  const handelSubmitStatus = () => {
    data.body.is_active === "TRUE"
      ? apiGiftDeactivate(data.id)
      : apiGiftActive(data.id);

    setFlagAlert(false);
  };

  const handleClickOrder = id => {
    push({
      pathname: "/gift/requests",
      state: { gift_id: id }
    });
  };

  const copyToClipboard = () => {
    var copyText = document.getElementById(`input-id-gift-${data.id}`);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    dispatch({ type: actionTypes.success });

    // alert("Copied the text: " + copyText.value);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => setFlagShow(prev => !prev)}>
        <CardMedia
          className={classes.image}
          component="img"
          alt=""
          image={`data:image/png;base64,${data.body.image}`}
          title=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            className="ellipsis"
            component="h5"
            style={{ fontWeight: "bold" }}
          >
            {data.body.title ? data.body.title : "-"}
          </Typography>
          <Typography
            className={`${classes.border} ellipsis`}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            گروه : {data.body.gift_category}
          </Typography>
          <Typography
            className={`${classes.border} ellipsis`}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            زیرگروه : {data.body.gift_sub_category}
          </Typography>
          <Typography
            className={classes.border}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            امتیاز مورد نیاز :{" "}
            {seprateNumberFromComma(data.body.required_bonus)}
          </Typography>
          <Typography
            className={classes.border}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            وضعیت فعلی : {data.body.is_active === "TRUE" ? "فعال" : "غیر فعال"}
          </Typography>
          <Typography
            className={classes.border}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            کد کالا :{" "}
            {data.body.gift_code === "null" ? "-" : data.body.gift_code}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.CardActions}>
        <div>
          <Button size="small" color="primary">
            <Switch
              checked={data.body.is_active === "TRUE" ? true : false}
              onChange={() => setFlagAlert(prev => !prev)}
              name="checkedA"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Button>
        </div>
        <div>
          <Button
            size="small"
            color="success"
            style={{ margin: "0 5px" }}
            variant="contained"
            onClick={copyToClipboard}
          >
            کپی کردن شناسه
          </Button>
          <Button
            size="small"
            color="primary"
            style={{ margin: "0 5px" }}
            variant="contained"
            onClick={() => handleClickOrder(data.id)}
          >
            سفارشات
          </Button>
          <Button
            size="small"
            color="default"
            variant="outlined"
            onClick={() => setFlagShow(prev => !prev)}
          >
            ویرایش
          </Button>
          <input
            onChange={() => null}
            style={{ opacity: 0, width: 10 }}
            type="text"
            value={data.id}
            id={`input-id-gift-${data.id}`}
          />
        </div>
      </CardActions>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagShow}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagShow}>
          <ModalEdit
            ref={ref}
            data={data}
            apiCallSelectAfterApdate={apiCallSelectAfterApdate}
            setNewButton={() => setFlagShow(false)}
          />
        </Fade>
      </Modal>

      <AlertDialogSlide
        flagShow={FlagAlert}
        handleCloseAlert={setFlagAlert}
        handleOkAlert={() => handelSubmitStatus()}
        data={dataAlertDialogSlide}
      />
    </Card>
  );
}

const dataAlertDialogSlide = {
  title: "ویرایش",
  description: "از ویرایش این رکورد اطمینان دارید؟"
};
