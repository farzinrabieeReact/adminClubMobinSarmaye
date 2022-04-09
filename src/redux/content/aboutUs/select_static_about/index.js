import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selectStaticAbout: "[selectStaticAbout] Action",
  selectStaticAboutLoad: "[selectStaticAboutLoad] Action",
  selectStaticAboutAsync: "[selectStaticAboutAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const aboutUs_select_static_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectStaticAbout:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectStaticAboutLoad:
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
    data: payload?.data ? payload.data : {},
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    sort_by: payload?.sort_by
  };
  yield put({
    type: actionTypes.selectStaticAboutLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectStaticAbout,
      payload: res.data.response.data
    });
    yield put({
      type: actionTypes.selectStaticAboutLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
    yield put({
      type: actionTypes.selectStaticAboutLoad,
      payload: false
    });
  }
}
export function* selectStaticAboutUs() {
  yield takeLatest(actionTypes.selectStaticAboutAsync, handleWorker);
}
