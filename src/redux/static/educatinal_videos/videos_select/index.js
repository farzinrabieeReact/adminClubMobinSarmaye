import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "./../../../../app/common/method/handleNotificationAlert/index";

export const actionTypes = {
  educationalVideoSelect: "[educationalVideoSelect] Action",
  educationalVideoAsync: "[educationalVideoAsync] Action",
};

const initialState = {
  data: "",
  loading: false,
};

export const educationalVideo_select_static_Reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.educationalVideoSelect:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};
function* handleWorker({ payload }) {
  let config = { url: "select_request" };
  let _data = {
    table: "static",
    method_type: "select",
    data: {
      name: "education_video",
    },
  };
  try {
    let res = yield AxiosCustom(config, _data);
    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;
    yield put({
      type: actionTypes.educationalVideoSelect,
      payload: res.data.response.data.results,
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* educationalVideoStatic() {
  yield takeLatest(actionTypes.educationalVideoAsync, handleWorker);
}
