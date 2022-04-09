import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../app/common/method/handleNotificationAlert";


export const actionTypes = {
  profileSelect: "[profileSelect] Action",
  profileSelectOrder: "[profileSelectOrder] Action",
  profileSelectEmpty: "[profileSelectEmpty] Action",
  profileSelectAsync: "[profileSelectAsync] Action",
};

const initialState = {
  data: [],
  dataOrder: [],
  isOk: false,
};

export const person_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.profileSelect:
      return {
        ...state,
        data: payload.response.data.results,
        isOk: true,
      };
    case actionTypes.profileSelectOrder:
      return {
        ...state,
        dataOrder: payload.response.data.results,
        isOk: state.isOk,
      };
    case actionTypes.profileSelectEmpty:
      return {
        data: [],
        dataOrder: [],
        isOk: false,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };
  let data = {
    table: "clubmember",
    method_type: "select_with_profile_picture",
    data: { national_id: payload },
  };


  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    if (payload?.type === "order") {
      yield put({
        type: actionTypes.profileSelectOrder,
        payload: res.data,
      });
    } else {
      yield put({
        type: actionTypes.profileSelect,
        payload: res.data,
      });
    }
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* personSelect() {
  yield takeLatest(actionTypes.profileSelectAsync, handleWorker);
}
