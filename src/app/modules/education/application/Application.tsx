import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesSelectApp } from "../../../../redux/education/education_application/index";
import { distinctMethod } from "../../../common/method/distinctMethod";
import Content from "./content";
import { application_update } from "../../../../redux/education/application_update_static/application_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";

export default function Application() {
  const dispatch = useDispatch();
  const data = useSelector(
    (state: any) => state.application_static_select_reducer
  );

  const [state, setState] = useState(null);
  const [flagAPi, setFlagApi] = useState(false);
  const [flagFilter, setflagFilter] = useState(false); //eslint-disable-line no-unused-vars

  useEffect(() => {
    api_call_select();
  }, [flagAPi]); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // if (data.data.response) {
    //   setState(JSON.parse(data.data.response.data.results[0].body.content));
    // }
    if (data.data.length !== 0) {
      setState(JSON.parse(data.data[0]?.body.content));
    }
  }, [data]);

  const api_call_select = () => {
    let _data = {
      data: { name: "education_software" }
    };
    dispatch({
      type: actionTypesSelectApp.appStaticSelectAsync,
      payload: _data
    });
  };

  const handleUpdateDispatch = (dataIns: any) => {
    const id = data.data[0].id;
    let _data = {
      name: "education_software",
      _id: id,
      content: JSON.stringify(dataIns)
    };
    application_update(_data)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
        setTimeout(() => {
          setFlagApi(prevState => !prevState);
        }, 1000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  return (
    <div>
      {state && (
        <Content
          category={distinctMethod(state, ["category"])}
          data={state}
          handleUpdate={handleUpdateDispatch}
        />
      )}
    </div>
  );
}
