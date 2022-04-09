import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selecOerdersDetailes: "[selec_OerdersDetailes] Action",
  selecOerdersDetailesLoading: "[selec_OerdersDetailes_loding] Action",
  selecOerdersDetailesAsync: "[selec_OerdersDetailesAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_OerdersDetailes_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selecOerdersDetailes:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selecOerdersDetailesLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selecOerdersDetailesLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "order",
    method_type: "select_details",
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
      type: actionTypes.selecOerdersDetailes,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.selecOerdersDetailesLoading,
      payload: false
    });
  }
}

export function* selecOerdersDetailes() {
  yield takeLatest(actionTypes.selecOerdersDetailesAsync, handleWorker);
}
