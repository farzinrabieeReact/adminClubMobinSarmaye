import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectTotalBonus: "[selectTotalBonus] Action",
  selectTotalBonusAsync: "[selectTotalBonusAsync] Action",
};

const initState = {
    data:{
        total:0,
        results:[]
    }
}

export const clubmember_total_bonus_reducer = (
  state = initState,
  { type, payload }
) => {
    switch (type) {
        case actionTypes.selectTotalBonus:
            return { data: payload }
        default:
            return state;
    }
};

function* handleWorker({payload}) {
  let config = {
    url: "select_request",
  };
  let data = {
    table: "CLUBMEMBER",
    method_type: "select_total_bonus",
    data: payload?.data ? payload.data : {},
  };
  
  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    
    yield put({
      type: actionTypes.selectTotalBonus,
      payload: res.data.response.data,
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* clubmemberTotalBonus() {
  yield takeLatest(actionTypes.selectTotalBonusAsync, handleWorker);
}
