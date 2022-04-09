import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
import CardImages from "./CardImages";
import Inputs from "./Inputs";
import { Button } from "@material-ui/core";
import { convertDigitToEnglish } from "./../../../../common/method/convertDigitToEnglish";
import { gift_update_dispatch } from "../../../../../redux/gift/gift_edit";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../common/method/handleNotificationAlert";

const Index = React.forwardRef(
  ({ setNewButton, data, apiCallSelectAfterApdate }, ref) => {
    const [state, setstate] = useState({
      title: "",
      name: "",
      gift_category: "",
      gift_sub_category: "",
      type: "",
      required_bonus: "",
      remained_capacity: null,
      expiration_time: "",
      image: "",
      is_physical: false,
      description: "",
      detailed_description: "",
      gift_code: "",
      is_active: null
    });

    const handelSubmit = () => {
      const { is_active, ...rest } = state;

      let res = {
        ...rest,
        is_physical: state.is_physical === true ? "FALSE" : "TRUE",
        expiration_time:
          typeof state.expiration_time === "string"
            ? state.expiration_time
            : state.expiration_time === null
            ? null
            : `${convertDigitToEnglish(
                state.expiration_time.format("YYYY/MM/DD")
              )} 23:59:00.000000`,
        _id: data.id,
        gift_code: state.gift_code === 0 ? null : state.gift_code
      };

      gift_update_dispatch(res)
        .then(res => {
          let isOk = handleNotificationAlertTryUpdate(res);
          if (isOk) {
            setNewButton(false);
            apiCallSelectAfterApdate();
          }
        })
        .catch(err => {
          handleNotificationAlertCatch();
        });
    };
    // new Date("2018-01-01T00:00:00.0000")
    useEffect(() => {
      if (data.body) {
        // let expiration_time_to_func = data.body.expiration_time.replaceAll(" " , "T").replaceAll("/" , "-")
        // console.log("expiration_time_to_func",expiration_time_to_func);
        let res = {
          ...data.body,
          is_physical: data.body.is_physical === "TRUE" ? false : true
          // expiration_time :  new Date(expiration_time_to_func)
        };
        setstate(res);
      }
    }, [data]);

    return (
      <div ref={ref} className={Styles["card"]}>
        <div className={Styles["modal"]}>
          <div className={Styles["cardImges"]}>
            <CardImages stateImages={state} SetStateImages={setstate} />
          </div>
          <div className={Styles["inputs"]}>
            <Inputs state={state} setstate={setstate} />
          </div>
        </div>
        <div className={Styles["btns"]}>
          <Button color={"secondary"} onClick={() => setNewButton(false)}>
            انصراف{" "}
          </Button>
          <Button color={"primary"} onClick={() => handelSubmit()}>
            ذخیره{" "}
          </Button>
        </div>
      </div>
    );
  }
);

export default Index;
