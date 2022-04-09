import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import AlertDialogSlide from "../../../../common/components/AlertDialogSlide";
import CardInput from "./cardInput/CardInput";
const useStyles = makeStyles(theme => ({
  card: {
    width: "40%",
    minHeight: 420,
    backgroundColor: "white",
    borderRadius: 8,
    margin: "auto",
    marginTop: "12%",
    padding: "10px -10px 10px 10px",
    position: "relative",
    paddingRight: "25px"
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "95%",
    margin: "auto"
  },
  list: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    width: "95%",
    height: "auto",
    maxHeight: 350,
    margin: "auto",
    marginTop: 10,
    overflow: "auto"
  },
  btns: {
    width: "95%",
    textAlign: "right",
    position: "absolute",
    bottom: 20,
    display: "flex",
    justifyContent: "space-between"
  },
  btnsAdd: {
    margin: "0px 0px 0px 30px"
  }
}));

export default function ModalEdit({
  data,
  index,
  setNewButton,
  handel_Remove_forum,
  handel_update_forum,
  handel_enable_forum,
  name,
  handel_insert_forum,
  handel_update_name_formus
}) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [state, setState] = useState([]);
  const [indexDate, SetindexDate] = useState(null);

  useEffect(() => {
    setState(data);
  }, [data]);

  const showAletDelete = index => {
    setOpenAlert(true);
    SetindexDate(index);
  };

  const handelDelete = () => {
    setState(prev => ({
      ...prev,
      subgroup_name: prev.subgroup_name.filter(
        (items, ind) => ind !== indexDate
      )
    }));
    setOpenAlert(false);
  };

  const handel_ADD_Items = name => {
    setState(prev => [
      {
        id: "",
        body: {
          name: name,
          author_id: "",
          subgroup_name: "",
          is_visible: "",
          insert: true
        }
      },
      ...prev
    ]);
  };

  // const handel_name_forums = (data)=>{
  //     let name = data.subgroup_name
  //     handel_update_name_formus( state , name )
  // }

  if (!state) return null;

  return (
    <div className={classes["card"]}>
      <Box className={classes["header"]}>
        {/* <CardInput
                    value={{ body: { subgroup_name: name } }}
                    title={'عنوان گروه'}
                    type={'name'}
                    handel_update_forum={handel_name_forums}
                    setNewButton={setNewButton}
                    /> */}
      </Box>
      <Box className={classes["list"]}>
        {state.map((item, ind) => {
          return (
            <CardInput
              value={item}
              titleSubgroup={"عنوان زیر گروه"}
              type={"name"}
              key={index}
              flagIconDelete={true}
              flagIconSwitch={true}
              index={ind}
              title={"عنوان"}
              showAletDelete={showAletDelete}
              handel_Remove_forum={handel_Remove_forum}
              handel_update_forum={handel_update_forum}
              handel_enable_forum={handel_enable_forum}
              handel_insert_forum={handel_insert_forum}
              setNewButton={setNewButton}
            />
          );
        })}
      </Box>
      <Box className={classes["btns"]}>
        {/* <button className={'btnsGreen'} >ذخیره </button> */}
        <button
          className={`${classes["btnsAdd"]} btnsBlue`}
          onClick={() => handel_ADD_Items(name)}
        >
          افزودن
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          انصراف{" "}
        </button>
      </Box>

      <AlertDialogSlide
        flagShow={openAlert}
        handleCloseAlert={setOpenAlert}
        handleOkAlert={handelDelete}
        data={dataAlertDialogSlide}
      />
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟"
};
