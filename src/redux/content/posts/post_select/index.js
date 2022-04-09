import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};
export const actionTypes = {
  selectPost: "[selectPost] Action",
  selectPostLoad: "[selectPostLoad] Action",
  selectPostAsync: "[selectPostAsync] Action"
};

export const post_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectPost:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectPostLoad:
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
    table: "post",
    method_type: "select",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };
  yield put({ type: actionTypes.selectPostLoad, payload: true });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectPost,
      payload: res.data.response.data
    });
    yield put({ type: actionTypes.selectPostLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectPostLoad, payload: false });
  }
}
export function* selectPost() {
  yield takeLatest(actionTypes.selectPostAsync, handleWorker);
}
