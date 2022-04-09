import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  compatitionSelectActive: "[compatitionSelectActive] Action",
  compatitionSelectActiveLoading: "[compatitionSelectActiveLoading] Action",
  compatitionSelectActiveAsync: "[compatitionSelectActiveAsync] Action",
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading:false
};

export const compatition_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.compatitionSelectActive:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0,
      };
    case actionTypes.compatitionSelectActiveLoading:
      return {
        ...state,
        loading:payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({type:actionTypes.compatitionSelectActiveLoading,payload:true})
  let config = {
    url: "select_request",
  };
  let data = {
    table: "competition",
    method_type: "select_competitions",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by,
  };
  
  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    
    yield put({
      type: actionTypes.compatitionSelectActive,
      payload: res.data.response.data,
    });
    yield put({type:actionTypes.compatitionSelectActiveLoading,payload:false})
  } catch (error) {
    handleNotificationAlertCatch();
    yield put({type:actionTypes.compatitionSelectActiveLoading,payload:false})
  }
}

export function* CompatitionSelectActive() {
  yield takeLatest(actionTypes.compatitionSelectActiveAsync, handleWorker);
}
