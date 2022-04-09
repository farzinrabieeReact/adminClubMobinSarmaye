import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selectFaqCategory: "[selectFaqCategory] Action",
  selectFaqCategoryAsync: "[selectFaqCategoryAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 0
};

export const faq_select_category_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectFaqCategory:
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
function* handleWorker() {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "faq",
    method_type: "select",
    data: {},
    from: 0
  };

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selectFaqCategory,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* selectFaqCategory() {
  yield takeLatest(actionTypes.selectFaqCategoryAsync, handleWorker);
}
