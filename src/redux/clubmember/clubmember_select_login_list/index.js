import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectLoginList: "[selectLoginList] Action",
  selectLoginListLoading: "[selectLoginListLoading] Action",
  selectLoginListAsync: "[selectLoginListAsync] Action",
  selectLoginListEmpty: "[selectLoginListEmpty] Action"
};

const initialState = {
  data: {},
  size: 50,
  total: 10000,
  loading: false
};

export const select_login_list_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectLoginList:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectLoginListLoading:
      return {
        ...state,
        loading: payload
      };
    case actionTypes.selectLoginListEmpty:
      return initialState;
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "clubmember",
    method_type: "select_login_log",
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by,
    data: payload.data ? payload.data : {}
  };
  yield put({ type: actionTypes.selectLoginListLoading, payload: true });

  try {
    let res = yield axiosCustom(config, data);
    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectLoginList,
      payload: res.data.response.data
    });
    yield put({ type: actionTypes.selectLoginListLoading, payload: false });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectLoginListLoading, payload: false });
  }
}

export function* selectLoginList() {
  yield takeLatest(actionTypes.selectLoginListAsync, handleWorker);
}
