import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectChatBody: "[selectChatBody] Action",
  selectChatBodyAsync: "[selectChatBodyAsync] Action",
  feedbackRemove: "[feedbackRemove] Action",
  feedbackchatLoading: "[feedbackchatLoading] Action"
};

const initialState = {
  data: [],
  loading: false
};

export const feedBack_Select_ChatBody = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectChatBody:
      return {
        data: payload
      };
    case actionTypes.feedbackchatLoading:
      return {
        ...state,
        loading: payload
      };

    case actionTypes.feedbackRemove:
      return initialState;

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.feedbackchatLoading, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "feedback",
    method_type: "select_chat_body",
    from: payload.from ? (payload.from - 1) * payload.size : "0",
    size: payload.size ? payload.size : "50",
    data: payload.data ? payload.data : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.selectChatBody,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.feedbackchatLoading, payload: false });
  }
}

export function* feedbackSelectChatBody() {
  yield takeLatest(actionTypes.selectChatBodyAsync, handleWorker);
}
