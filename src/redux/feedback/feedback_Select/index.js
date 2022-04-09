import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

// o

export const actionTypes = {
  feedback: "[feedback] Action",
  feedback2: "[feedback2] Action",
  feedbackAsync: "[feedbackAsync] Action",
  feedbackAsync2: "[feedbackAsync2] Action",
  feedbackRemoveReducer: "[feedbackRemoveReducer] Action"
};

const initialState = {
  data: [],
  data2: [],
  total: 20,
  size: 3
};

export const reducerFeedbackSelectList = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.feedback:
      return {
        ...state,
        data: payload.results
        // data2: payload.results,
      };
    case actionTypes.feedback2:
      return {
        ...state,
        data: payload.results
      };

    case actionTypes.feedbackRemoveReducer:
      return initialState;

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "feedback",
    method_type: "select_chat_list",
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: 50,
    data: payload.after_key
      ? {
          after_key: payload.after_key
        }
      : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.feedback,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
function* handleWorker2({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "feedback",
    method_type: "select_chat_list",
    from: payload.from ? (payload.from - 1) * payload.size : "0",
    size: payload.size,
    data: payload.after_key
      ? {
          after_key: payload.after_key
        }
      : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.feedback2,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* watcherFeedbackSelectList() {
  yield takeLatest(actionTypes.feedbackAsync, handleWorker);
  yield takeLatest(actionTypes.feedbackAsync2, handleWorker2);
}
