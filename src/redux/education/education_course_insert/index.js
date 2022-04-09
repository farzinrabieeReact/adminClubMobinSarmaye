import { takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import store from './../../store';
import { actionTypes as actionTypesNotif } from './../../notificationAlert/index'

import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  educationCourseInsert: "[educationCourseInsert] Action",
  educationCourseEmpty: "[educationCourseEmpty] Action",
  educationCourseInsertAsync: "[educationCourseInsertAsync] Action"
};

const initialState = {
  data: [],
};


export const education_course_insert_Reducer = (state = initialState, { type, payload }) => {

  switch (type) {

    default:
      return state;
  }
};




function* handleWorker({ payload }) {

  let { dispatch } = store


  let config = {
    url: "insert_request"
  };

  let data = {
    table: "course",
    method_type: "register",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {
  
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;

    if (!res.data.response.is_successful) {
      dispatch({ type: actionTypesNotif.error, textAlert: `خطایی رخ داد(${res.data.response.error_description})` })
      return
    }
    if (res.data.status !== 200) {
      handleNotificationAlertCatch(dispatch)
      return
    }

    dispatch({ type: actionTypesNotif.success, textAlert: "درخواست شما با موفقیت انجام شد." })


  } catch {
    handleNotificationAlertCatch();
  }
}

export function* education_course_insert_worker() {
  yield takeLatest(actionTypes.educationCourseInsertAsync, handleWorker);
}
