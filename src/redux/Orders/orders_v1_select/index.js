import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert";
// import AxiosCustom from "../../../app/common/components/apiConfig";

// import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  ordersSelect: "[ordersSelect] Action",
  ordersSelectAsync: "[ordersSelectAsync] Action",
};

const initialState = {
  data: [],
  isOk: false,
  from: 0,
  size: 20,
  total: 10000,
};

export const orders_v1_select = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ordersSelect:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total
          ? payload.response.data.total > 10000
            ? 10000
            : payload.response.data.total
          : 10000,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };

  let data = {
    table: "order",
    method_type: payload.method ? payload.method : "select_aggregates",
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    data: payload.obj ? payload.obj : {},
    sort_by: payload.sort_by ? payload.sort_by : {},
  };



  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({ type: actionTypes.ordersSelect, payload: res.data });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* ordersSelect() {
  yield takeLatest(actionTypes.ordersSelectAsync, handleWorker);
}
