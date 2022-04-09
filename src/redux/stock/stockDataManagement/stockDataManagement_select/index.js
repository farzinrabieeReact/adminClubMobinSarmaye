import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectStockDataManagement: "[selectStockDataManagement] Action",
  selectStockDataManagementLoading: "[selectStockDataManagementLoading] Action",
  selectStockDataManagementAsync: "[selectStockDataManagementAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 0,
  loading: false
};

export const stockDataManagement_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectStockDataManagement:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectStockDataManagementLoading:
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
    type: actionTypes.selectStockDataManagementLoading,
    payload: true
  });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "stock",
    method_type: "select",
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
      type: actionTypes.selectStockDataManagement,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.selectStockDataManagementLoading,
      payload: false
    });
  }
}

export function* stockDataManagementSelect() {
  yield takeLatest(actionTypes.selectStockDataManagementAsync, handleWorker);
}
