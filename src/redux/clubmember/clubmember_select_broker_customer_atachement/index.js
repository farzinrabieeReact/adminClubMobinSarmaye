import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selecClubmemberAttachment: "[selecClubmemberAttachment] Action",
  selecClubmemberAttachmentEmpty: "[selecClubmemberAttachmentEmpty] Action",
  selecClubmemberAttachmentLoad: "[selecClubmemberAttachmentLoad] Action",
  selecClubmemberAttachmentAsync: "[selecClubmemberAttachmentAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_clubmember_attachment_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selecClubmemberAttachment:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selecClubmemberAttachmentEmpty:
      return initialState;
    case actionTypes.selecClubmemberAttachmentLoad:
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
    table: "brokercustomer",
    method_type: "select_broker_customers",
    data: payload.data ? payload.data : {},
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    sort_by: payload.sort_by
  };
  yield put({
    type: actionTypes.selecClubmemberAttachmentLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selecClubmemberAttachment,
      payload: res.data.response.data
    });
    yield put({
      type: actionTypes.selecClubmemberAttachmentLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* selecClubmemberAttachment() {
  yield takeLatest(actionTypes.selecClubmemberAttachmentAsync, handleWorker);
}
