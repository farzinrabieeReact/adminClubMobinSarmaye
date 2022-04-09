import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AccordionComonent from "./AccordionComponent";
import Category from "./Category";
import ModalAdd from "./ModalAdd/Modal";
import { PREMISSON_DATA } from "../../../pages/permition/permition/PREMISSON_DATA";
import { useDispatch, useSelector } from "react-redux";
import {
  actionTypes,
  permision_select_role_reducer
} from "../../../../redux/permision/permision_select_role";
import { permision_update_role } from "../../../../redux/permision/permision_update_role";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { permision_delete_role } from "../../../../redux/permision/permision_delete_role";
import { permision_insert_role } from "../../../../redux/permision/permision_insert_role";

const useStyles = makeStyles(theme => ({
  btnAdd: {
    backgroundColor: "#28A745",
    width: "100%",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    color: "white"
  },
  btnsActive: {
    backgroundColor: "#4a9ef1",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    transition: "all 0.5s"
  },
  btns: {
    backgroundColor: "white",
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    borderBottom: "1px solid #b9b9b9",
    ".clearBtn:hover": {
      visibility: "visible",
      opacity: "1"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  clearBtn: {
    visibility: "visible",
    opacity: "1",
    transition: "all 0.5s"

    // "&:hover": {
    //   visibility: "visible",
    //   opacity: "1"
    // }
  },
  clearBtnNone: {
    visibility: "hidden",
    opacity: "0",
    transition: "all 0.5s"

    // "&:hover": {
    //   visibility: "visible",
    //   opacity: "1"
    // }
  },
  backdrop: {
    zIndex: 1000000,
    color: "black"
  }
}));
const Permition = () => {
  const reducerRole = useSelector(
    (state: any) => state.permision_select_role_reducer
  );
  let classes = useStyles();

  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState<any>(false);
  const [openModal, setOpenModal] = React.useState<any>(false);
  const [flagChange, setFlagChange] = React.useState<any>(false);
  const [clickBtnId, setClickBtnId] = React.useState<any>("");
  const [openBackDrop, setOpenBackDrop] = React.useState<any>(false);
  const [permitted_methods, setPermitted_methods] = useState<any>("");
  const [permissionList, setPermissionList] = useState(PREMISSON_DATA);
  const [roleInputInsert, setRoleInputInsert] = useState<any>("");
  useEffect(() => {
    dispatch({ type: actionTypes.roleSelectAsync });
  }, []);

  useEffect(() => {
    // let isTrue = true;

    // if (permitted_methods === "CLUB .*") {
    //   setPermitted_methods("CLUB");
    // }

    if (permitted_methods.trim() === "CLUB .*") {
      setPermitted_methods("CLUB .*");
      return;
    }
    let perString: string = "CLUB";
    permissionList.forEach((itmParent, ind) => {
      if (itmParent.active) {
        perString = perString.concat(" ", itmParent.id);
      } else {
        // isTrue = false;
        itmParent.children.forEach((itmChild, ind) => {
          if (itmChild.active) {
            perString = perString.concat(" ", itmChild.id);
          }
        });
      }
    });
    // if (isTrue) {
    //   setPermitted_methods("CLUB .*");
    // } else {
    //   setPermitted_methods(perString);
    // }
    setPermitted_methods(perString);
  }, [permissionList]);

  useEffect(() => {
    setOpenBackDrop(reducerRole.loading);
    if (reducerRole.data.length) {
      let id = reducerRole?.data[0]?.id;
      let perMethod = reducerRole?.data[0]?.body?.permitted_methods;
      handleClickCategory(id, perMethod);
      // setClickBtnId(reducerRole?.data[0]?.id);
    }
  }, [reducerRole]);

  useEffect(() => {
    let allArr = permissionList.map((itemparent, ind) => {
      if (permitted_methods?.includes(itemparent.id)) {
        itemparent.active = true;

        return {
          ...itemparent,
          children: itemparent.children.map(itm => ({
            ...itm,
            active: true
          }))
        };
        //
        // return itemparent;
      } else {
        itemparent.active = false;
        return {
          ...itemparent,
          children: itemparent.children.map(itm => {
            if (permitted_methods.split(" ").indexOf(itm.id) !== -1) {
              itm.active = true;
              return itm;
            } else {
              itm.active = false;
              return itm;
            }
          })
        };
      }
    });
    setPermissionList(allArr);
  }, [flagChange]);

  const handleChangeChecked = (
    e: any,
    itmClick: any,
    type: string,
    indClick: any
  ) => {
    let allArr: any = permissionList.map((itemList, ind) => {
      if (type === "parent") {
        if (itmClick.id === itemList.id) {
          return {
            ...itemList,
            active: e.target.checked,
            children: itemList.children.map(itm => ({
              ...itm,
              active: e.target.checked
            }))
          };
        }
        return itemList;
      } else {
        // if (itemList.children)
        if (itemList.children.length > 0) {
          if (itmClick?.id === itemList?.children[indClick]?.id) {
            itemList.children[indClick].active = e.target.checked;
            let everyActive = itemList.children.every(itm => itm.active);
            return everyActive
              ? { ...itemList, active: true }
              : { ...itemList, active: false };
          }
          return itemList;
        }
        return itemList;
      }
    });
    if (permitted_methods.trim() === "CLUB .*") {
      setPermitted_methods("CLUB");
    }

    setPermissionList(allArr);
  };

  const handleClickCategory = (id: any, perMethod: any) => {
    setPermitted_methods(perMethod);
    setClickBtnId(id);
    // setPermissionList(PREMISSON_DATA);
    setFlagChange(!flagChange);
  };

  const handleClickUpdate = () => {
    setOpenBackDrop(true);
    let data = {
      _id: clickBtnId,
      permitted_methods: permitted_methods
    };
    permision_update_role(data)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);

        if (!isok) {
          return;
        }

        dispatch({ type: actionTypes.roleSelectAsync });
      })
      .catch(err => handleNotificationAlertCatch())
      .finally(() => {
        setOpenBackDrop(false);
      });
  };

  const handleClickDelete = (id: any) => {
    let data = {
      _id: id
    };

    permision_delete_role(data)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        dispatch({ type: actionTypes.roleSelectAsync });
      })
      .catch(err => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
        setOpenBackDrop(false);
      });
  };
  const handleClickInsert = () => {
    let data = {
      role_name: roleInputInsert
    };
    permision_insert_role(data)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        dispatch({ type: actionTypes.roleSelectAsync });
      })
      .catch(err => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
        setOpenBackDrop(false);
        setRoleInputInsert("");
        setOpenModal(false);
      });
  };
  return (
    <>
      <Backdrop
        className={classes.backdrop}
        onClick={() => setOpenBackDrop(false)}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <div className="w-100 d-flex justify-content-end mb-5">
          <div>
            {" "}
            <button className="btnsGreen" onClick={handleClickUpdate}>
              ثبت
            </button>
          </div>
        </div>
        <div className="row">
          <Category
            classes={classes}
            setOpenModal={setOpenModal}
            clickBtn={clickBtnId}
            setClickBtn={setClickBtnId}
            reducerRole={reducerRole}
            handleClickCategory={handleClickCategory}
            handleClickDelete={handleClickDelete}
          />
          <div className="col-10">
            <div className="bg-white rounded-lg">
              <div className="w-100 p-5">
                <input
                  style={{
                    borderRadius: "5px",
                    height: "50px",
                    border: "1px solid #b9b9b9",
                    direction: "ltr"
                  }}
                  value={permitted_methods}
                  onChange={e => setPermitted_methods(e.target.value)}
                  type="text"
                  className="w-100 shadow-lg"
                />
              </div>
              <div>
                {permissionList.map((itm, ind) => (
                  <AccordionComonent
                    handleChangeChecked={handleChangeChecked}
                    itm={itm}
                    expanded={expanded}
                    setExpanded={setExpanded}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAdd
        handleClickInsert={handleClickInsert}
        setRoleInputInsert={setRoleInputInsert}
        roleInputInsert={roleInputInsert}
        openModal={openModal}
        setOpenModal={setOpenModal}
        classes={classes}
      />
    </>
  );
};
let itemCheckBox = [
  {
    title: "مدیریت کاربران",
    state: "panel1",
    children: [
      { lable: "مدیریت کاربران  ", id: 0, active: true },
      { lable: "لیست کاربران", id: 1, active: true },
      { lable: " کاربران", id: 2, active: true }
    ]
  },
  {
    title: "امتیازات",
    state: "panel2",
    children: [
      { lable: "مدیریت کاربران  ", id: 0, active: true },
      { lable: "لیست کاربران", id: 1, active: true },
      { lable: " کاربران", id: 2, active: true }
    ]
  },
  {
    title: "سیگنال",
    state: "panel3",
    children: [
      { lable: "مدیریت کاربران  ", id: 0, active: true },
      { lable: "لیست کاربران", id: 1, active: true },
      { lable: " کاربران", id: 2, active: true }
    ]
  }
];
let itemBtn = [
  {
    title: "مدیر سیستم",
    id: 1
  },
  {
    title: "پشتیبان",
    id: 2
  },
  {
    title: "مدیر",
    id: 3
  }
];

export default Permition;
