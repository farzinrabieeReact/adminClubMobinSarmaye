import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectBonusRequests: "[selectBonusRequests] Action",
  selectBonusRequestsLoad: "[selectBonusRequestsLoad] Action",
  selectBonusRequestsAsync: "[selectBonusRequestsAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_bonus_requests_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectBonusRequests:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectBonusRequestsLoad:
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
    table: "bonus",
    method_type: "select_bonus_requests",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };
  yield put({ type: actionTypes.selectBonusRequestsLoad, payload: true });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectBonusRequests,
      payload: res.data.response.data
    });
    yield put({ type: actionTypes.selectBonusRequestsLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectBonusRequestsLoad, payload: false });
  }
}

export function* selectBonusRequests() {
  yield takeLatest(actionTypes.selectBonusRequestsAsync, handleWorker);
}
