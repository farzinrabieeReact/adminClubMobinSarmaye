import React, { useState, useEffect } from "react";
import CardImages from "./CardImages";
import Inputs from "./Inputs";
import Styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { gift_insert_dispatch } from "../../../../redux/gift/gift_insert";
import { actionTypes as actionTypesCategory } from "../../../../redux/gift/gift_category_select";
import { actionTypes as actionTypesSubCategory } from "../../../../redux/gift/gift_subCategory_select";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import { Button } from "@material-ui/core";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";

interface STate {
  title: string;
  name: string;
  gift_category: string;
  gift_sub_category: string;
  type: string;
  required_bonus: number;
  remained_capacity: number;
  expiration_time: any;
  image: string;
  is_physical: boolean;
  description: string;
  detailed_description: string;
  gift_code: number;
  is_active: null;
}

let initState = {
  title: "",
  name: "",
  gift_category: "",
  gift_sub_category: "",
  type: "NO_TYPE",
  required_bonus: 0,
  remained_capacity: 0,
  expiration_time: null,
  image: "",
  is_physical: false,
  description: "",
  detailed_description: "",
  gift_code: 0,
  is_active: null
};

export function InsertGift() {
  const [nameFile, setNameFile] = useState("مسیر عکس");
  const [state, setstate] = useState<STate>(initState);

  const dispatch = useDispatch();

  ////////////////////////////////Categories////////////////////////////////////
  const reducerCategories = useSelector(
    (state: any) => state.gift_select_Reducer_categories.data
  );

  useEffect(() => {
    dispatch({ type: actionTypesCategory.giftSelectActiveCategorisAsync });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    state.gift_sub_category &&
      setstate(prev => ({ ...prev, gift_sub_category: "" }));

    callApiSelectSubCategory();
  }, [state.gift_category]); // eslint-disable-line react-hooks/exhaustive-deps
  //////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////subCategories////////////////////////////////////
  const reducerSubcategories = useSelector(
    (state: any) => state.gift_select_Reducer_subCategories.data
  );

  const callApiSelectSubCategory = () => {
    let isFilter = state.gift_category
      ? { gift_category: state.gift_category }
      : {};

    dispatch({
      type: actionTypesSubCategory.giftSelectActiveSubCategoryAsync,
      payload: isFilter
    });
  };
  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// api gift insert //////////////////////////////
  const apiGiftInsert = (): void => {
    let image = state.image.split(",")[1] ? state.image.split(",")[1] : "";

    let obj = {
      ...state,
      image,
      is_physical: state.is_physical === true ? "FALSE" : "TRUE",
      expiration_time: state.expiration_time
        ? `${convertDigitToEnglish(
            state.expiration_time.format("YYYY/MM/DD")
          )} 23:59:00.000000`
        : null,
      gift_code: state.gift_code === 0 ? null : state.gift_code
    };

    gift_insert_dispatch(obj)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (isOk) {
          setstate(initState);
        }
      })
      .catch(err => {
        handleNotificationAlertCatch();
      });
  };
  //////////////////////////////////////////////////////////////////////////////

  /////////////////////////////// handle submit //////////////////////////////
  const handelSubmit = () => {
    apiGiftInsert();
    setNameFile("مسیر عکس");
  };
  //////////////////////////////////////////////////////////////////////////////

  return (
    <div className={Styles["card"]}>
      <div className={Styles["modal"]}>
        <div className={Styles["cardImges"]}>
          <CardImages
            stateImages={state}
            SetStateImages={setstate}
            nameFile={nameFile}
            setNameFile={setNameFile}
          />
        </div>
        <div className={Styles["inputs"]}>
          <Inputs
            reducerCategories={reducerCategories}
            state={state}
            setstate={setstate}
            reducerSubcategories={reducerSubcategories}
          />
        </div>
      </div>
      <div className={Styles["btns"]}>
        <Button variant="contained" onClick={handelSubmit} color={"primary"}>
          ذخیره{" "}
        </Button>
        {/* <button className={'btnsRed'} onClick={() => setNewButton(false)} >انصراف </button> */}
      </div>
    </div>
  );
}
