import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  performanceSelectById: "[performanceSelectById] Action",
  performanceSelectByIdEmpty: "[performanceSelectByIdEmpty] Action",
  performanceSelectByIdAsync: "[performanceSelectByIdAsync] Action",
};

const initialState = {
  data: [],
};

export const performance_select_by_id_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.performanceSelectById:
      return {
        ...state,
        data: payload.results,
      };
    case actionTypes.performanceSelectByIdEmpty:
      return initialState;
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };
 
  let data = {
    table: "competition",
    method_type: "select_performance_by_id",
    data: payload ? payload: {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.performanceSelectById,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* performanceSelectById() {
  yield takeLatest(actionTypes.performanceSelectByIdAsync, handleWorker);
}
