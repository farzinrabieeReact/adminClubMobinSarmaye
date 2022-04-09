import React, { useState, useEffect } from "react";

// import signUpHelp_select_static_reducer from "../../../../redux/static/signUpHelp_select";
import { actionTypes as signUpHelpSelect } from "../../../../redux/static/signUpHelp/signUpHelp_select";
import { useDispatch, useSelector } from "react-redux";
import { signupHelp_update_action } from "../../../../redux/static/signUpHelp/signUpHelp_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import Header from "./Header";

export default function Index() {
  const dataaa = useSelector((state) => state.signUpHelp_select_static_reducer);
  let dispatch = useDispatch();
  const [state, setState] = useState({
    content: " ",
  });

  useEffect(() => {
    api_call_select();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const api_call_select = () => {
    dispatch({ type: signUpHelpSelect.signUpHelpSelectAsync });
  };
  useEffect(() => {
    if (dataaa?.data[0]) setState(JSON.parse(dataaa?.data[0].body.content));
    // setState(parsData)
  }, [dataaa]);

  const handelSubmitAdd = (value, id) => {
    let res = { content: value };
    signupHelp_update_action(JSON.stringify(res), id)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      api_call_select();
    }, 1000);
  };

  return (
    <div>
      <Header
        id={dataaa?.data[0]?.id ? dataaa?.data[0]?.id : null}
        handelSubmitAdd={handelSubmitAdd}
        content={state}
        api_call_select={api_call_select}
      />
      <div className={"boxCustom"}>
        <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
      </div>
    </div>
  );
}
