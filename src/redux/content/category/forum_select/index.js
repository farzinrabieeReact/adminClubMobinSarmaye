import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selectForum: "[selectForum] Action",
  selectForumAsync: "[selectForumAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000
};

export const forum_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectForum:
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
function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "forum",
    method_type: "select",
    data: payload?.data ? payload.data : {},
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    sort_by: payload?.sort_by
  };

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectForum,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* selectForum() {
  yield takeLatest(actionTypes.selectForumAsync, handleWorker);
}
