import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selecOerdersAggregated: "[selec_OerdersAggregated] Action",
  selecOerdersAggregatedLoading: "[selec_OerdersAggregated_loding] Action",
  selecOerdersAggregatedAsync: "[selec_OerdersAggregatedAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_OerdersAggregated_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selecOerdersAggregated:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selecOerdersAggregatedLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selecOerdersAggregatedLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "order",
    method_type: "select_aggregates",
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
      type: actionTypes.selecOerdersAggregated,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.selecOerdersAggregatedLoading,
      payload: false
    });
  }
}

export function* selecOerdersAggregated() {
  yield takeLatest(actionTypes.selecOerdersAggregatedAsync, handleWorker);
}
