import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./index.module.scss";
import Header from "./header/Header";
import Card from "./card/Card";
import { actionTypes as actionTypesSelectForum } from "../../../../redux/content/category/forum_select/index";
import { distinctMethod } from "../../../common/method/distinctMethod";
import { forum_update } from "../../../../redux/content/category/forum_update/forum_update";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { forum_remove } from "../../../../redux/content/category/forum_remove/forum_remove";
import { forum_enable } from "../../../../redux/content/category/forum_enable/forum_enable";
import { forum_insert } from "../../../../redux/content/category/forum_insert/forum_insert";
export default function Index() {
  const dispatch = useDispatch();
  // const stateReducer = useSelector()(state => state.forum_v1_select_Reducer);
  const stateReducer = useSelector((state: any) => state.forum_select_reducer);
  ///////////////////////////////////////////////////////////////////////////////////////state
  const [state, setstate] = useState([]);
  const [category, setCategory] = useState([]);
  const [flagApi, setFlagApi] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////hook

  useEffect(() => {
    apiSelectForum();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateReducer?.data.length !== 0) setstate(stateReducer.data);
  }, [stateReducer]);
  useEffect(() => {
    const distincName: any = distinctMethod(state, ["body", "name"]);
    setCategory(distincName);
  }, [state]);

  useEffect(() => {
    // if (state) {
    //   let distickCategory = distinctMethod(state, ["body", "name"]);
    //   setCategory(distickCategory);
    // }
  }, [state]);
  ///////////////////////////////////////////////////////////////////////////////////////functionsApi
  const apiSelectForum = () => {
    dispatch({ type: actionTypesSelectForum.selectForumAsync, payload: {} });
  };

  const handel_Remove_forum = (data: any) => {
    forum_remove(data.id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
  };

  const handel_remove_all_forums = (data: any) => {};

  const handel_enable_forum = (data: any) => {
    forum_enable(data.id)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
  };

  const handel_update_forum = (data: any) => {
    let res = {
      _id: data.id,
      subgroup_name: data.subgroup_name,
      name: data.name
    };
    forum_update(res)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 1000);
    // dispatch(forum_v1_actions_update(res));
    setTimeout(() => {
      setFlagApi((prevState: any) => !prevState);
    }, 2000);
  };

  const handel_insert_forum = (data: any) => {
    let res = {
      name: data.name,
      author_id: null,
      is_visible: null,
      subgroup_name: data.subgroup_name
    };
    forum_insert(res)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res);
        if (!isOk) {
          return;
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });

    setTimeout(() => {
      setFlagApi(prev => !prev);
    }, 1000);
    // dispatch(forum_v1_actions_insert(res));
  };

  const handel_update_name_formus = (data: any, name: any) => {
    data.forEach((item: any) => {
      let res = {
        _id: item.id,
        subgroup_name: item.body.subgroup_name,
        name: item.body.name
      };

      // dispatch(forum_v1_actions_update(res));
    });
  };

  return (
    <>
      <Header
        handleRefreshButton={apiSelectForum}
        stateReducer={stateReducer}
        category={category}
        setFlagApi={setFlagApi}
      />
      <div className={Styles["Category"]} style={{ height: "60.5vh" }}>
        {category
          // .filter(data => data.is_visible)
          .map((data, index) => {
            return (
              <Card
                key={index}
                data={data}
                index={index}
                state={state}
                handel_Remove_forum={handel_Remove_forum}
                handel_update_forum={handel_update_forum}
                handel_enable_forum={handel_enable_forum}
                handel_insert_forum={handel_insert_forum}
                handel_update_name_formus={handel_update_name_formus}
                handel_remove_all_forums={handel_remove_all_forums}
              />
            );
          })}
      </div>
    </>
  );
}
