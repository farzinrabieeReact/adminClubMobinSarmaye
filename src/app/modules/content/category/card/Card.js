import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  
  // AccordionDetails,
  // AccordionSummary,
  Box,
  Fade,
  Modal,
  Typography
} from "@material-ui/core";
import { Edit, NoteAdd, VisibilityOff } from "@material-ui/icons";
import ModalEdit from "../modalEdit/ModalEdit";
import AlertDialogSlide from "../../../../common/components/AlertDialogSlide";
import ModalAddPost from "../modalAddPost/ModalAddPost";
import Backdrop from "@material-ui/core/Backdrop";
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'

// import Accordion from '@material-ui/core/Accordion'
// import Accordion from '@material-ui/core/Accordion'
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: "auto",
    marginBottom: 8,
    borderRadius: 8,
    border: "none",
    "& > div": {
      boxShadow: "1px 0px 5px rgba(0,0,0,0.1)",
      borderRadius: 8
    }
  },
  header: {
    backgroundColor: "#F3F6F9"
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center"
  },
  icons: {
    display: "flex",
    justyfyContent: "space-between",
    alignItems: "center"
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  iconEdit: {
    width: 30,
    height: 30,
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA800",
    borderRadius: 3,
    zIndex: 100,
    "& svg": {
      fill: "white"
    }
  },
  iconDelete: {
    width: 30,
    height: 30,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F64E60",
    "& svg": {
      fill: "white"
    }
  },
  subtitle: {
    width: "100%",
    height: 50,
    alignItems: "center",
    border: ".5px solid rgba(0,0,0,0.1)",
    marginTop: 0.1,
    padding: "0 40px",
    color: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "space-between",
    userSelect: "none"
  },
  VisibilityOffIcon: {
    margin: "0px 10px",
    verticalAlign: "middle",
    color: "lightgray"
  },
  flex: {
    display: "flex"
  },
  iconAdd: {
    cursor: "pointer",
    color: "#3f51b5",
    "& svg": {
      verticalAlign: "sub"
    }
  }
}));

export default function Card({
  data,
  state,
  handel_Remove_forum,
  handel_update_forum,
  handel_enable_forum,
  handel_insert_forum,
  handel_update_name_formus,
  handel_remove_all_forums,
  index
}) {
  const classes = useStyles();
  const [flag, setFlag] = useState(data.is_visible);
  const [newButton, setNewButton] = useState(false);
  const [flagNewPost, setFlagNewPost] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [subGroup, setSubGroup] = useState([]);
  const [subgroupIDForInsertPost, setSubgroupIDForInsertPost] = useState(null);

  const handleClickNewPost = id => {
    setSubgroupIDForInsertPost(id);
    setFlagNewPost(true);
  };

  const handleClickButton = data => {
    if (data === "NEW") {
      setNewButton(prev => !prev);
    }
    return;
  };

  const handelDelete = () => {
    setOpenAlert(false);
    handel_remove_all_forums(subGroup);
  };

  useEffect(() => {
    let subGroupVar = [];
    state.forEach(item => {
      if (data === item.body.name) {
        subGroupVar.push(item);
      }
    });
    setSubGroup(subGroupVar);
  }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

  let flagIcon = subGroup.filter(item => item.body.is_visible === "TRUE");

  if (!subGroup) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={flag}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.header}
        >
          <Box className={classes.head}>
            <Box
              className={classes.heading}
              onClick={() => setFlag(prev => !prev)}
            >
              <Typography
                style={{ opacity: flagIcon.length === 0 ? "0.5" : "" }}
              >
                {data}
              </Typography>
            </Box>
            <Box className={classes.icons}>
              <Typography
                className={classes.iconEdit}
                onClick={() => setNewButton(true)}
              >
                <Edit />
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <Box style={{ width: "100%" }}>
            {subGroup.map((item, ind) => {
              return (
                <div key={ind}>
                  <Typography key={ind} className={classes["subtitle"]}>
                    <div className={classes["flex"]}>
                      <div style={{ minWidth: 41 }}>
                        {item.body.is_visible === "FALSE" && (
                          <VisibilityOff
                            fontSize="small"
                            className={classes["VisibilityOffIcon"]}
                          />
                        )}
                      </div>
                      {item.body.subgroup_name}
                    </div>

                    <span
                      onClick={() => handleClickNewPost(item.id)}
                      className={classes["iconAdd"]}
                    >
                      <NoteAdd color="primary" />
                      ایجاد پست
                    </span>
                  </Typography>
                </div>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>

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
            data={subGroup}
            name={data}
            handel_Remove_forum={handel_Remove_forum}
            handel_update_forum={handel_update_forum}
            handel_enable_forum={handel_enable_forum}
            handel_insert_forum={handel_insert_forum}
            handel_update_name_formus={handel_update_name_formus}
          />
        </Fade>
      </Modal>

      {/*------------------ add modal post ----------------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flagNewPost}
        onClose={() => setFlagNewPost(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={flagNewPost}>
          <ModalAddPost
            setFlagNewPost={setFlagNewPost}
            subgroup_id={subgroupIDForInsertPost}
          />
        </Fade>
      </Modal>

      {openAlert && (
        <AlertDialogSlide
          flagShow={openAlert}
          handleCloseAlert={setOpenAlert}
          handleOkAlert={handelDelete}
          data={dataAlertDialogSlide}
        />
      )}
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};
