import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  borchuresStaticSelect: "[borchuresStaticSelect] Action",
  borchuresStaticSelectLoad: "[borchuresStaticSelectLoad] Action",
  borchuresStaticSelectAsync: "[borchuresStaticSelectAsync] Action"
};

const initialState = {
  data: [],
  total: 1000,
  loading: false
};

export const brochures_static_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.borchuresStaticSelect:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total
      };
    case actionTypes.borchuresStaticSelectLoad:
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
    table: "static",
    method_type: "select",
    sort_by: payload.sort_by,
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    data: payload?.data ? payload.data : {}
  };
  yield put({
    type: actionTypes.borchuresStaticSelectLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;

    yield put({
      type: actionTypes.borchuresStaticSelect,
      payload: res.data.response
    });
    yield put({
      type: actionTypes.borchuresStaticSelectLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* brochure_static_select() {
  yield takeLatest(actionTypes.borchuresStaticSelectAsync, handleWorker);
}
