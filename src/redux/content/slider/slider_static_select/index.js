import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../../src/app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  sliderStaticSelect: "[sliderStaticSelect] Action",
  sliderStaticSelectLoad: "[sliderStaticSelectLoad] Action",

  sliderStaticSelectAsync: "[sliderStaticSelectAsync] Action"
};

const initialState = {
  data: [],
  total: 1000,
  loading: false
};

export const slider_static_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.sliderStaticSelect:
      return {
        ...state,
        data: payload.data.results,
        total: payload.data.total ? payload.data.total : state.total
      };
    case actionTypes.sliderStaticSelectLoad:
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
    type: actionTypes.sliderStaticSelectLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;

    yield put({
      type: actionTypes.sliderStaticSelect,
      payload: res.data.response
    });
    yield put({
      type: actionTypes.sliderStaticSelectLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* sliderStaticSelect() {
  yield takeLatest(actionTypes.sliderStaticSelectAsync, handleWorker);
}
