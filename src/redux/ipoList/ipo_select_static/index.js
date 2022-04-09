import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  ipoSelect: "[ipoSelect Action]",
  ipoSelectAsync: "[ipoSelectAsync Action]",
};

const initialState = {
  data: [],
};

export const ipo_select_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ipoSelect:
      return { data: payload };
    default:
      return state;
  }
};

function* handleWorker() {
  let config = { url: "select_request" };
  let _data = {
    table: "static",
    method_type: "select",
    data: {
      name: "ipo",
    },
  };

  try {
    let response = yield AxiosCustom(config, _data);
    let isOk = handleNotificationAlertTrySelect(response);
    if (!isOk) {
      return;
    }
    yield put({ type: actionTypes.ipoSelect, payload: response.data.response.data.results });
  } catch (err) {
    handleNotificationAlertCatch();
  }
}
export function* ipoSelect() {
  yield takeLatest(actionTypes.ipoSelectAsync, handleWorker);
}
