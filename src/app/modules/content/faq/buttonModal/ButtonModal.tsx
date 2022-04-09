import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Modal
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import ModalEdit from "./ModalEdit";
import { faq_delete } from "../../../../../redux/content/faq/faq_delete";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
  handleNotificationAlertTryUpdate
} from "../../../../common/method/handleNotificationAlert";
const useStyles = makeStyles((theme: any) => ({
  tableContainer: {
    height: "95%",
    direction: "rtl",
    borderRadius: 10
  },

  table: {
    minWidth: 650,
    direction: "ltr",
    borderRadius: 10
  },
  head: {
    fontWeight: "bold"
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr"
  },
  icons: {
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  // paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     // border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(4, 6, 3),
  //     minWidth: "931px",
  //     borderRadius: 10
  // },
  textEditor: {
    width: "100%",
    height: "400px"
  },
  buttonsAdded: {
    float: "right"
  }
}));
const ButtonModal = ({
  setFlagEdit,
  flagEdit,
  categotyFAQ,
  tableBodyData,
  selectedItem,
  handleButton,
  selected,
  stateReducerCategory,
  setDataEdit,
  DataEdit,
  setflagApi
}: any) => {
  const classes = useStyles();

  // const handleClose = () => {
  //     setOpen(false);
  // };
  const handleClickDelete = () => {
    faq_delete(selected.id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) return;
        setTimeout(() => {
          setflagApi((prev: any) => !prev);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setFlagEdit(false);
  };
  return (
    <>
      {handleButton === 1 ? (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description11"
            className={classes.modal}
            open={flagEdit}
            onClose={() => setFlagEdit(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={flagEdit}>
              <ModalEdit
                selected={selected}
                categotyFAQ={categotyFAQ}
                stateReducerCategory={stateReducerCategory}
                setflagClose={setFlagEdit}
                type={"EDIT_REQUEST"}
                data={tableBodyData}
                selectedItem={selectedItem[1]}
                flagEdit={flagEdit}
                // dataEdit={testDataEdit}
                DataEdit={DataEdit}
                setDataEdit={setDataEdit}
                setflagApi={setflagApi}
              />
            </Fade>
          </Modal>
        </div>
      ) : (
        handleButton === 2 && (
          <Dialog
            open={flagEdit}
            onClose={() => setFlagEdit(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent style={{ minWidth: "300px" }}>
              <DialogContentText id="alert-dialog-description">
                ایا از حذف این رکورد اطمینان دارید ؟
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="btnsGreen" onClick={handleClickDelete}>
                تایید
              </Button>
              <Button className="btnsRed" onClick={() => setFlagEdit(false)}>
                لغو
              </Button>
            </DialogActions>
          </Dialog>
        )
      )}
    </>
  );
};

export default ButtonModal;
