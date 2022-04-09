import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selecClubmember: "[selec_Clubmember] Action",
  selecClubmemberLoading: "[selec_Clubmember_loding] Action",
  selecClubmemberAsync: "[selec_ClubmemberAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_clubmember_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selecClubmember:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.selecClubmemberLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selecClubmemberLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "clubmember",
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
      type: actionTypes.selecClubmember,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.selecClubmemberLoading, payload: false });
  }
}

export function* selecClubmember() {
  yield takeLatest(actionTypes.selecClubmemberAsync, handleWorker);
}
