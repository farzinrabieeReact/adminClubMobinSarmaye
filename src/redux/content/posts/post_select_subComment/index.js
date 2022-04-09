import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypes as actionTypesNotif } from "../../../notificationAlert";
import store from "../../../store";

const initialState = {
  data: [],
  size: 50,
  total: 10000
};
export const actionTypes = {
  selectPostSubComment: "[selectPostSubComment] Action",
  selectPostAsyncSubComment: "[selectPostAsyncSubComment] Action"
};

export const post_select_subComment_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectPostSubComment:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    default:
      return state;
  }
};
function* handleWorker({ payload, flag }) {
  const dispatch = store.dispatch;
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

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;
    if (res.data.response.data.results.length === 0) {
      if (!flag) {
        dispatch({
          type: actionTypesNotif.info,
          textAlert: "پاسخی برای نمایش وجود ندارد"
        });
      }
    }
    yield put({
      type: actionTypes.selectPostSubComment,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* selectPostSubComments() {
  yield takeLatest(actionTypes.selectPostAsyncSubComment, handleWorker);
}
