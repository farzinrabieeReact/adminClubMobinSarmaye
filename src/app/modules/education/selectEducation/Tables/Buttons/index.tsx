import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";
import AlertDialogSlide from "../../../../../common/components/AlertDialogSlide";
import AlertDialogSlideAvtivationRegistration from "../../../../../common/components/AlertDialogSlide";
import { useDispatch } from "react-redux";
// import { registration_v1_actions_activation } from "./../../../../../../boot/api/Definitions/EducationCourses/registration_v1_activation/action";

// import ModalE from '../Modal';
import ModalEdit from "../ModalEdit";
import { course_activation } from "../../../../../../redux/education/education_Activation";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { course_active } from "../../../../../../redux/education/education_active";
import { course_deacvtive } from "../../../../../../redux/education/education_deactive";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Index({
  info,
  data,
  apiCoursesUpdate,
  apiCoursesDeactive,
  apiCoursesActive,
  dataRow,
  setflagApi,
  index
}: any) {
  const [newButton, setNewButton] = useState(false);
  const classes = useStles();
  const dispatch = useDispatch();

  const handleOkAlertRegistration = () => {
    setNewButton(false);

    course_activation("unregister", dataRow.id)
      .then(result => {
        let isOk = handleNotificationAlertTryUpdate(result);

        if (!isOk) {
          return;
        }
      })
      .catch(err => {
        handleNotificationAlertCatch();
      });
  };

  const handelDelete = () => {
    // if (data.body.is_active === "TRUE") apiCoursesDeactive(data.id);
    if (data.body.is_active === "FALSE") {
      course_active(data.id)
        .then(result => {
          let isOk = handleNotificationAlertTryUpdate(result);
          if (!isOk) {
            return;
          }
          setflagApi((prev: any) => !prev);
        })
        .catch(err => {
          handleNotificationAlertCatch();
        });
    }
    if (data.body.is_active === "TRUE") {
      course_deacvtive(data.id)
        .then(result => {
          let isOk = handleNotificationAlertTryUpdate(result);
          if (!isOk) {
            return;
          }
          setflagApi((prev: any) => !prev);
        })
        .catch(err => {
          handleNotificationAlertCatch();
        });
    }

    // if (data.body.is_active === "TRUE") course_deacvtive(data.id);

    setNewButton(false);
  };

  const Components: any = {
    AlertDialogSlideAvtivationRegistration: (
      <AlertDialogSlideAvtivationRegistration
        flagShow={newButton}
        handleCloseAlert={setNewButton}
        handleOkAlert={handleOkAlertRegistration}
        data={dataAlertDialogSlideRegistration}
      />
    ),
    ModalEdit: (
      <ModalEdit
        setNewButton={setNewButton}
        data={data}
        apiCoursesUpdate={apiCoursesUpdate}
        setflagApi={setflagApi}
      />
    ),
    modalDelete: (
      <AlertDialogSlide
        flagShow={newButton}
        handleCloseAlert={setNewButton}
        handleOkAlert={() => handelDelete()}
        data={dataAlertDialogSlideRegistration}
      />
    )
  };

  const handleClickButton = (data: any) => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
  };
  const handleClickBtn = () => {
    setNewButton(!newButton);
  };

  return (
    <>
      <button
        className={info.className}
        style={{ marginTop: 10 }}
        onClick={handleClickBtn}
      >
        {info.title}{" "}
      </button>
      {info.modal && (
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
          <Fade in={newButton}>{Components[info.modal]}</Fade>
        </Modal>
      )}
    </>
  );
}

const dataAlertDialogSlideRegistration = {
  title: "ویرایش",
  description: "از ویرایش این رکورد اطمینان دارید؟"
};
