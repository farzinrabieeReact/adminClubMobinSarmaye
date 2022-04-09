import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  creaditSelect: "[creaditSelect] Action",
  creaditSelectLoad: "[creaditSelectLoad] Action",
  creaditSelectEmpty: "[creaditSelectEmpty] Action",
  creaditSelectAsync: "[creaditSelectAsync] Action",
};

const initialState = {
  data: [],
  size: 20,
  total: 1000,
  isOk: false,
  loading: false,
};

export const Creadit_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.creaditSelect:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total,
        isOk: true,
      };
    case actionTypes.creaditSelectLoad:
      return {
        ...state,
        loading: payload,
      };
    case actionTypes.creaditSelectEmpty:
      return initialState;

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.creaditSelectLoad, payload: true });
  let config = {
    url: "select_request",
  };

  let data = {
    table: "credit",
    method_type: "select",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {
    let res = yield axiosCustom(config, data);
    yield put({ type: actionTypes.creaditSelectLoad, payload: false });
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.creaditSelect,
      payload: res.data.response,
    });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.creaditSelectLoad, payload: false });
  }
}

export function* creaditSelect() {
  yield takeLatest(actionTypes.creaditSelectAsync, handleWorker);
}
