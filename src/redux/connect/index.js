import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  govermentSelect: "[govermentSelect Action]",
  govermentSelectLoading: "[govermentSelectLoading Action]",
  govermentSelectAsync: "[govermentAsync Action]",
};
const initialState = {
  data: [],
  size: 20,
  total: 10000,
  loading: false,
};

export const goverment_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.govermentSelect:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total,
      };
    case actionTypes.govermentSelectLoading:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.govermentSelectLoading, payload: true });
  let config = {
    url: "select_request",
  };

  let data = {
    table: "pishkhan",
    method_type: "select",
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    data: payload?.data ? payload.data : {},
    sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;

    yield put({
      type: actionTypes.govermentSelect,
      payload: res.data.response.data,
    });

    yield put({ type: actionTypes.govermentSelectLoading, payload: false });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.govermentSelectLoading, payload: false });
  }
}

export function* govermentSelect() {
  yield takeLatest(actionTypes.govermentSelectAsync, handleWorker);
}
