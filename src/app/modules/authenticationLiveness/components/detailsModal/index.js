import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ModalCustom from "./../../../../common/components/modal";
import Deatils from "../ButtonModal/details";
import { authenticationLiveness_update } from "../../../../../redux/authenticationLiveness/authentication_updatet";
import { actionTypes as authenticationTypes } from "../../../../../redux/authenticationLiveness/authentication_select/index";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonMarg: {
    margin: 2,
    width:97

  },
}));

export default function DetailsModal({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPicDetails, setOpenPicDetails] = useState(false);
  const [openVideoDetails, setOpenVideoDetails] = useState(false);
  const [info, setinfo] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    newData(data);
  }, [data]);

  useEffect(() => {
    dispatch({ type: authenticationTypes.selectAuthenticationAsync });
  }, [flag]);

  const newData = (data) => {
    let pics = {
      inputImage: data.input_image_uri
        ? data.input_image_uri
        : data.input_image,
      inputSigniture: data.input_sign_image_uri,
    };
    let video = {
      video: data.input_video ? data.input_video : data.input_video_uri,
    };
    setinfo({
      video: video,
      image: pics,
    });
  };

  const handleOpenPic = () => {
    setOpenPicDetails(true);
  };

  const handleOpenVideo = () => {
    setOpenVideoDetails(true);
  };

  const rejectPerson = (data) => {
    let newData = {
      id: data.id,
      confirm: "FALSE",
    };
    authenticationLiveness_update(newData).then(() =>
      setFlag((prevState) => !prevState)
    );
  };

  const acceptPerson = (data) => {
    let newData = {
      id: data.id,
      confirm: "TRUE",
    };
    authenticationLiveness_update(newData).then(() =>
      setFlag((prevState) => !prevState)
    );
  };

  return (
    <div>
      <Box>
        <button
          type="button"
          onClick={handleOpenPic}
          className={`${classes.buttonMarg} btnsBlue`}
        >
          نمایش تصاویر
        </button>
        <button
          type="button"
          onClick={handleOpenVideo}
          className={`${classes.buttonMarg} btnsBlue`}
        >
          نمایش ویدیو
        </button>
      </Box>
      <Box>
   
        <button
          type="button"
          onClick={() => acceptPerson(data)}
          className={`${classes.buttonMarg} btnsGreen`}
        >
          تایید
        </button>
        <button
          type="button"
          onClick={() => rejectPerson(data)}
          className={`${classes.buttonMarg} btnsRed`}
        >
          رد کردن
        </button>
      </Box>

      <ModalCustom
        open={openPicDetails}
        setOpen={setOpenPicDetails}
      >
        <Deatils data={info.image} />
      </ModalCustom>

      <ModalCustom
        open={openVideoDetails}
        setOpen={setOpenVideoDetails}
      >
        <Deatils data={info.video} />
      </ModalCustom>
    </div>
  );
}
