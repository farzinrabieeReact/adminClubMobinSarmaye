import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectNotify: "[selectNotify] Action",
  selectNotifyLoading: "[selectNotifyLoading] Action",
  selectNotifyAsync: "[selectNotifyAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_notify_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectNotify:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : 10000
      };
    case actionTypes.selectNotifyLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selectNotifyLoading, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "notification",
    method_type: "select_notifications",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectNotify,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.selectNotifyLoading, payload: true });
  }
}

export function* selectNotify() {
  yield takeLatest(actionTypes.selectNotifyAsync, handleWorker);
}
