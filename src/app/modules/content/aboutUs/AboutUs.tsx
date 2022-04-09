import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "./content";
import { actionTypes as actionTypesAboutUs } from "../../../../redux/content/aboutUs/select_static_about";
import { update_static_aboutUS } from "../../../../redux/content/aboutUs/update_static_about/update_static_aboutUS";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { Backdrop, Fade, LinearProgress, Modal } from "@material-ui/core";
import ModalAdd from "./modalAdd/ModalAdd";

export default function AboutUs() {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////state
  const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line  no-unused-vars
  const [flagApi, setFlagApi] = useState(false);
  const [flagModal, setFlagModal] = useState(false);

  const dispatch = useDispatch();
  const about_us_reducer = useSelector(
    (state: any) => state.aboutUs_select_static_reducer
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////////////hook
  useEffect(() => {
    api_call_select();
  }, [flagApi]); //eslint-disable-line  react-hooks/exhaustive-deps
  ////////////////////////////////////////////////////////////////////////////////////////////////////////functionApi
  const api_call_select = () => {
    let obj = { name: "about" };
    let _data = {
      data: obj
    };
    dispatch({
      type: actionTypesAboutUs.selectStaticAboutAsync,
      payload: _data
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////function

  const handelsubmitUpdate = (value: any, index: any) => {
    let id = about_us_reducer.data[0]?.id;
    let content = JSON.parse(about_us_reducer.data[0]?.body.content);
    let res = content.map((item: any, ind: any) => {
      if (ind === index) return value;
      return item;
    });
    let _data = {
      content: JSON.stringify(res),
      name: "about",
      _id: id
    };
    update_static_aboutUS(_data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
  };

  const handelSubmitAdd = (value: any) => {
    let id = about_us_reducer.data[0]?.id;
    let content = JSON.parse(about_us_reducer.data[0]?.body.content);
    let res = [value, ...content];
    let _data = {
      content: JSON.stringify(res),
      name: "about",
      _id: id
    };
    update_static_aboutUS(_data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
  };

  const handelDeleteSubmit = (index: any) => {
    let id = about_us_reducer.data[0]?.id;
    let content = JSON.parse(about_us_reducer.data[0]?.body.content);
    let res = content.filter((items: any, ind: any) => index !== ind);
    let _data = {
      content: JSON.stringify(res),
      name: "about",
      _id: id
    };
    update_static_aboutUS(_data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
  };
  const handleClickButton = () => {
    setFlagModal(false);
  };

  return (
    <div>
      <button className={"btnsGreen mb-5"} onClick={() => setFlagModal(true)}>
        افزودن
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={flagModal}
        onClose={() => handleClickButton()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagModal}>
          <ModalAdd
            setNewButton={setFlagModal}
            handelSubmitAdd={handelSubmitAdd}
          />
        </Fade>
      </Modal>
      <div
        style={{
          overflow: "auto",
          height: "80vh",
          borderRadius: "20px !important"
        }}
      >
        {about_us_reducer.loading ? <LinearProgress /> : null}
        {about_us_reducer.data.length !== 0 ? (
          <Content
            _data={about_us_reducer.data[0]?.body}
            handelsubmitUpdate={handelsubmitUpdate}
            handelDeleteSubmit={handelDeleteSubmit}
          />
        ) : null}
      </div>
    </div>
  );
}
