import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  insertCodal: "[insertCodal] Action",
  insertCodalLoading: "[insertCodalLoading] Action",
  insertCodalAsync: "[insertCodalAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const stockCash_insert_Reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.insertCodal:
      return {
        ...state,
        data: payload.result,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.insertCodalLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.insertCodalLoading, payload: true });

  let config = {
    url: "insert_request"
  };

  let data = {
    table: "codal",
    method_type: "insert_bulk_codal_participation",
    data: payload ? payload : {}
    // from: payload.from ? (payload.from - 1) * payload.size : 0,
    // size: payload.size,
    // sort_by: payload.sort_by
  };

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTryUpdate(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.insertCodal,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.insertCodalLoading, payload: false });
  }
}

export function* stockCashInsert() {
  yield takeLatest(actionTypes.insertCodalAsync, handleWorker);
}
