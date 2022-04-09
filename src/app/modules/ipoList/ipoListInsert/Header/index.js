import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ModalCustom from "./ModalAdd";


const useStyles = makeStyles((theme) => ({
  btnDisbale: {
    color: "grey !important",
    border: "1px solid grey",
    backgroundColor: "white",
    borderRadius: "7px",
    marginLeft: "8px",
    padding: "4px 20px",
    cursor: "default",
    "& a": {
      color: "grey",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 500,
    borderRadius: 10,
  },
  buttonsAdded: {
    marginTop: 15,
    float: "right",
  },
}));

export default function Index({
  handleChangeText,
  state,
  setState,
  handleSubmit,
  addedCategory,
  setAddedCategory,
  handleExit,
  handleShowFilter,
  handleRefresh,
}) {
  const dataButtons = [
    // { name: 'خروجی اکسل', type: '', className: 'btnsBlue' },
    { name: "تعریف عرضه اولیه", type: "", className: "btnsGray" },
    // {name : 'تایید' , type:'' , className:'btnsGreen'},
    // {name : 'عدم تایید' , type:'' , className:'btnsRed'},
    // {name : 'ویرایش' , type:'' , className:'btnsYellow'},
    // {name : 'حذف' , type:'' , className:'btnsBlack'},
  ];

  // const excelfile = useSelector((state) => state.select_ipoList_excel_reducer.data);

  const classes = useStyles();
  // const [newButton, setNewButton] = useState(false);
  const dispatch = useDispatch();

  const stateReducerExcel = useSelector((state) => state.excel_select_reducer);

  // const handleClickButton = (data) => {
  //   if (data === "NEW") {
  //     setNewButton(prev => !prev)
  //   }
  // }

  // const handleFlag = () => {
  //   setflag(false);
  //   dispatch({type:SELECT_IPO_LIST_EMPTY});
  // };

  // const handleExcel = () => {
  //   dispatch(ipoList_select_excel_action());
  // };

  // const handleRefresh = ()=>{

  // }

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {/* <button className={classes.btnDisbale} >
          <a>خروجی اکسل</a>
        </button> */}
        {dataButtons.map((data, index) => {
          return (
            <button
              key={index}
              className={data.className}
              onClick={() => setAddedCategory(!addedCategory)}
            >
              {data.name}
            </button>
          );
        })}
      </div>

      <div className={Styles["icon"]} style={{ marginLeft: "30px" }}>
        {/* <FilterListIcon
					onClick={() => {
						handleShowFilter();
					}}
					style={{ margin: '0 20px' }}
				/> */}
        {/* <img src="/media/common/excel.ico" alt="test" style={{width:25,height:25,cursor:'pointer'}}/> */}
        <RefreshIcon
          onClick={handleRefresh}
          style={{ fontSize: 25, marginRight: 20 }}
          onClick={handleRefresh}
        />
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description11"
          className={classes.modal}
          open={addedCategory}
          onClose={() => setAddedCategory(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addedCategory}>
            <ModalCustom
              setNewButton={() => setAddedCategory(false)}
              handleChangeText={handleChangeText}
              state={state}
              setState={setState}
              handleSubmit={handleSubmit}
              handleExit={handleExit}
              // dataPrev={dataPrev}
            />
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

{
  /* <div className={Styles["icon"]}>
        {/* <Button 
        // onClick={handleFlag} 
        variant="outlined" 
        color="secondary">
          بازگشت
        </Button> */
}
{
  /* <FilterListIcon */
}
{
  /* // onClick={() => { handelShowFilterItems() }} */
}
{
  /* /> */
}
{
  /* <RefreshIcon  */
}
{
  /* // onClick={hanldeRefresh} 
        /> */
}
{
  /* </div> */
}

{
  /* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalAdd
            setNewButton={setNewButton}
            handleCloseModal={() => handleClickButton("NEW")}
            handelSubmitUpdate={handelSubmitUpdate}
            disable={setNewButton}
          />
        </Fade>
      </Modal> */
}
