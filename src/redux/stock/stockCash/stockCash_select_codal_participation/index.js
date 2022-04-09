import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectCodal: "[selectCodal] Action",
  selectCodalLoading: "[selectCodalLoading] Action",
  selectCodalAsync: "[selectCodalAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 0,
  loading: false
};

export const stockCash_Select_codal_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectCodal:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectCodalLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selectCodalLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "codal",
    method_type: "select_codal_participation",
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
      type: actionTypes.selectCodal,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.selectCodalLoading, payload: false });
  }
}

export function* stockCashSelectCodal() {
  yield takeLatest(actionTypes.selectCodalAsync, handleWorker);
}
