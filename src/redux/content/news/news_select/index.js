import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  NewsSelect: "[NewsSelect] Action",
  NewsSelectLoading: "[NewsSelectLoading] Action",
  NewsSelectAsync: "[NewsSelectAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const news_select_Reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.NewsSelect:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.NewsSelectLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.NewsSelectLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "news",
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
      type: actionTypes.NewsSelect,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.NewsSelectLoading, payload: false });
  }
}

export function* NewsSelect() {
  yield takeLatest(actionTypes.NewsSelectAsync, handleWorker);
}
