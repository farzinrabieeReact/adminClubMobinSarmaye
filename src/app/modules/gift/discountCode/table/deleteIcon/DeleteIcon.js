import React from "react";
import { DeleteSweep } from "@material-ui/icons";
import { Fade, Modal, Tooltip } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  // paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     // border: '2px solid #000',
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(4, 6, 3),
  //     minWidth: "931px",
  //     borderRadius: 10
  // },
}));
const DeleteIcon = ({
  handelDeleteCheckBox,
  flagDetails,
  setFlagDetails,
  selectDelete,
  handleDeleteDisCode
}) => {
  // const [flag, setFlag] = useState(false);

  const classes = useStyles();
  return (
    <>
      <Tooltip title={"حذف دسته ای"} placement="top-end" arrow>
        <DeleteSweep
          onClick={() => handelDeleteCheckBox()}
          style={{
            fontSize: "26px",
            marginLeft: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#d11010"
          }}
        />
      </Tooltip>

      {/*<AlertDialogSlide*/}
      {/*  flagShow={flag}*/}
      {/*  handleCloseAlert={setFlag}*/}
      {/*  handleOkAlert={handelDeleteCheckBox}*/}
      {/*  data={dataAlertDialogSlide}*/}
      {/*/>*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description11"
        className={classes.modal}
        open={flagDetails}
        onClose={() => setFlagDetails(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagDetails}>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "30%",
              borderRadius: "10px",
              border: "unset",
              outline: "inset"
            }}
          >
            {selectDelete._id?.length !== 0 ? (
              <>
                <div className="w-100 d-flex justify-content-center">
                  {" "}
                  <h5>
                    ایا میخواهید
                    <span
                      style={{
                        fontSize: "20px"
                      }}
                      className=" border-dark p-1 mx-2 text-align "
                    >
                      {selectDelete?._id?.length}
                    </span>
                    مورد را پاک کنید؟
                  </h5>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <div className="w-100 d-flex justify-content-end">
                    <button
                      className="btnsRed"
                      onClick={() => setFlagDetails(false)}
                    >
                      لغو
                    </button>
                    <button className="btnsGreen" onClick={handleDeleteDisCode}>
                      تایید
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-100 d-flex justify-content-center">
                {" "}
                <h4>هیچ موردی انتخاب نکرده اید</h4>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  );
};
// const dataAlertDialogSlide = {
//   title: "حذف",
//   description: "از حذف این رکورد اطمینان دارید؟"
// };

export default DeleteIcon;
