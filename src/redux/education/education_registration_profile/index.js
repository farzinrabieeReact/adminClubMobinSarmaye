import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import store from './../../store';
import {actionTypes as actionTypesNotif} from './../../notificationAlert/index'

import {handleNotificationAlertTrySelect,handleNotificationAlertCatch} from "../../../app/common/method/handleNotificationAlert/";
  

export const actionTypes = {
  educationProfileSelect: "[educationProfileSelect] Action",
  educationProfileEmpty: "[educationProfileEmpty] Action",
  educationProfileSelectAsync: "[educationProfileSelectAsync] Action"
};


const initialState = {
  dataProfile: [],
  isOkProfile: false
};

export const education_profile_select_Reducer = (state = initialState,{ type, payload }) => {
  
  switch (type) {

    case actionTypes.educationProfileSelect:
      return { ...state, dataProfile: payload.response.data.results, isOkProfile: true }

    case actionTypes.educationProfileEmpty:
      return { ...state, isOkProfile: false, dataProfile: [] }

    default:
      return state;
  }
};


function* handleWorker({ payload }) {

  let { dispatch } = store

  let config = {
    url: "select_request"
  };
  let data = {
    table: "clubmember",
    method_type: "select",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? {national_id:payload.data} : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {

    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) {
      dispatch({ type: actionTypes.educationProfileEmpty })
      return
    }

    if (res.data.response.data.results.length === 0) {
      dispatch({ type: actionTypesNotif.error, textAlert: "کد ملی مورد نظر یافت نشد." })
      dispatch({ type: actionTypes.educationProfileEmpty })
      return
    }

    yield put({
      type: actionTypes.educationProfileSelect,
      payload: res.data
    });


  } catch {
    handleNotificationAlertCatch();
  }
}

export function* education_profile_select_worker() {
  yield takeLatest(actionTypes.educationProfileSelectAsync, handleWorker);
}
