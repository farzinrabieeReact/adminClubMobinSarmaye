import React, { useState, useEffect } from "react";
import Header from "./Header";
import Content from "./Content";
import { useSelector, useDispatch } from "react-redux";
import { jobOpportunity_update_action } from "../../../../redux/static/jobOpportunity/jobOpportunity_update";
import { actionTypes as jobOpportunitySelect } from "../../../../redux/static/jobOpportunity/jobOpportunity_select";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";

export default function Index() {
  let dispatch = useDispatch();
  const [flagFilter, setflagFilter] = useState(false);

  let jobOpportunity_reducer = useSelector(
    (state) => state.jobOpportunity_select_static_reducer.data
  );

  useEffect(() => {
    api_call_select();
  }, []);

  const api_call_select = () => {
    dispatch({
      type: jobOpportunitySelect.jobOpportunitySelectAsync,
      payload: {},
    });
  };

  const handelSubmitUpdate = (value, index) => {
    let id = jobOpportunity_reducer.response.data.results[0].id;
    let data = JSON.parse(
      jobOpportunity_reducer.response.data.results[0].body.content
    );
    let res = data.map((items, ind) => {
      if (ind === index) return value;
      return items;
    });
    jobOpportunity_update_action(JSON.stringify(res), id)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        api_call_select();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
  };

  const handelSubmitAdd = (value) => {
    let id = jobOpportunity_reducer.response.data.results[0].id;
    let data = JSON.parse(
      jobOpportunity_reducer.response.data.results[0].body.content
    );
    let res = [value, ...data];
    jobOpportunity_update_action(JSON.stringify(res), id)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        api_call_select();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
  };

  const handelDeleteSubmit = (index) => {
    let id = jobOpportunity_reducer.response.data.results[0].id;
    let data = JSON.parse(
      jobOpportunity_reducer.response.data.results[0].body.content
    );
    let res = data.filter((items, ind) => ind !== index);
    jobOpportunity_update_action(JSON.stringify(res), id)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        api_call_select();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
  };

  return (
    <div>
      <Header
        handelShowFilterItems={() => setflagFilter((prev) => !prev)}
        handelSubmitAdd={handelSubmitAdd}
        api_call_select={api_call_select}
      />
      <div style={{ overflow: "auto", height: "80vh" }}>
        {jobOpportunity_reducer && (
          <Content
            handelDeleteSubmit={handelDeleteSubmit}
            handelSubmitUpdate={handelSubmitUpdate}
            jobOpportunity_reducer={
              jobOpportunity_reducer.response.data.results[0].body
            }
          />
        )}
      </div>
    </div>
  );
}
