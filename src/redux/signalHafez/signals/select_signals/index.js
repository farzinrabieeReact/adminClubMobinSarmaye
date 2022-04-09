import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "./../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "./../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectSignals: "[selectSignals] Action",
  selectSignalsLoad: "[selectSignalsLoad] Action",
  selectSignalsAsync: "[selectSignalsAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_signals_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectSignals:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selectSignalsLoad:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {

  let config = {
    url: "select_request"
  };

  let data = {
    table: "HADAFHAFEZ",
    method_type: "select_uploaded_documents",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };

  yield put({
    type: actionTypes.selectSignalsLoad,
    payload: true
  });

  try {

    let res = yield axiosCustom(config, data);
    let isOk = handleNotificationAlertTrySelect(res);

    if (!isOk) return;

    yield put({
      type: actionTypes.selectSignals,
      payload: res.data.response.data
    });

  }
  catch {
    handleNotificationAlertCatch();
  }
  finally {

    yield put({
      type: actionTypes.selectSignalsLoad,
      payload: false
    });

  }
}

export function* selectSignals() {
  yield takeLatest(actionTypes.selectSignalsAsync, handleWorker);
}
