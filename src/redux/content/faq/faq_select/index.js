import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selectFaq: "[selectFaq] Action",
  selectFaqLoad: "[selectFaqLoad] Action",
  selectFaqAsync: "[selectFaqAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 0,
  loading: false
};

export const faq_select_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.selectFaq:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectFaqLoad:
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
    table: "faq",
    method_type: "select",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };
  yield put({ type: actionTypes.selectFaqLoad, payload: true });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({ type: actionTypes.selectFaq, payload: res.data.response.data });
    yield put({ type: actionTypes.selectFaqLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectFaqLoad, payload: false });
  }
}
export function* selectFaq() {
  yield takeLatest(actionTypes.selectFaqAsync, handleWorker);
}
