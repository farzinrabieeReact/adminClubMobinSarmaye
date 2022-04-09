import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  giftCashSelectOnlineCharge: "[giftCashSelectOnlineCharge] Action",
  giftCashSelectOnlineChargeLoading:
    "[giftCashSelectOnlineChargeLoading] Action",
  giftCashSelectOnlineChargeAsync: "[giftCashSelectOnlineChargeAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  loading: false,
  total: 10000
};

export const giftCash_select_onlineCharge_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.giftCashSelectOnlineCharge:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? (payload > 10000 ? 10000 : payload.total) : 10000
      };
    case actionTypes.giftCashSelectOnlineChargeLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({
    type: actionTypes.giftCashSelectOnlineChargeLoading,
    payload: true
  });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "onlinecharge",
    method_type: "select_registrations",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.giftCashSelectOnlineCharge,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.giftCashSelectOnlineChargeLoading,
      payload: false
    });
  }
}

export function* giftCashSelectonlineCharge() {
  yield takeLatest(actionTypes.giftCashSelectOnlineChargeAsync, handleWorker);
}
