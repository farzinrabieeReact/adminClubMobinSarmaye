import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selecClubmemberBrokerCustomer: "[selecClubmemberBrokerCustomer] Action",
  selecClubmemberBrokerCustomerLoad:
    "[selecClubmemberBrokerCustomerLoad] Action",
  selecClubmemberBrokerCustomerAsync:
    "[selecClubmemberBrokerCustomerAsync] Action"
};

const initialState = {
  data: [],
  size: 50,
  total: 10000,
  loading: false
};

export const select_clubmember_brokerCustomer_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selecClubmemberBrokerCustomer:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selecClubmemberBrokerCustomerLoad:
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
    type: actionTypes.selecClubmemberBrokerCustomerLoad,
    payload: true
  });

  try {
    let res = yield axiosCustom(config, data);

    let isOk = handleNotificationAlertTrySelect(res);
    if (!isOk) return;

    yield put({
      type: actionTypes.selecClubmemberBrokerCustomer,
      payload: res.data.response.data
    });
    yield put({
      type: actionTypes.selecClubmemberBrokerCustomerLoad,
      payload: false
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* selecClubmemberBrokerCustomer() {
  yield takeLatest(
    actionTypes.selecClubmemberBrokerCustomerAsync,
    handleWorker
  );
}
