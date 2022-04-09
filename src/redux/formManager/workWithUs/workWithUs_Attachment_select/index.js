import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectWorkWithUSAttachment: "[selectWorkWithUSAttachment] Action",
  selectWorkWithUsAttachmentLoading:
    "[selectWorkWithUsAttachmentLoading] Action",
  selectWotkWithUsAttachmentAsync: "[selectWotkWithUsAttachmentAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const workWithUs_AttachmentSelect_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectWorkWithUSAttachment:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selectWorkWithUsAttachmentLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({
    type: actionTypes.selectWorkWithUsAttachmentLoading,
    payload: true
  });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "workwithus",
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
      type: actionTypes.selectWorkWithUSAttachment,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.selectWorkWithUsAttachmentLoading,
      payload: false
    });
  }
}

export function* workWithUsAttachmentSelect() {
  yield takeLatest(actionTypes.selectWotkWithUsAttachmentAsync, handleWorker);
}
