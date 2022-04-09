import { put, takeLatest } from "redux-saga/effects";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect,
  handleNotificationAlertTryUpdate
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  selectSingleDiscountCode: "[selectSingleDiscountCode] Action",
  selectSingleDiscountCodeLoading: "[selectSingleDiscountCodeLoading] Action",
  selectSingleDiscountCodeExcel: "[selectSingleDiscountCodeExcel] Action",
  selectSingleDiscountCodeEmpty: "[selectSingleDiscountCodeEmpty] Action",
  selectSingleDiscountCodeAsync: "[selectSingleDiscountCodeAsync] Action",
  selectSingleDiscountCodeExcelAsync:
    "[selectSingleDiscountCodeExcelAsync] Action"
};

const initialState = {
  data: [],
  excel: [],
  size: 50,
  total: 10000,
  loading: false
};

export const discount_code_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectSingleDiscountCode:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0
      };
    case actionTypes.selectSingleDiscountCodeExcel:
      return {
        ...state,
        excel: payload.result
      };
    case actionTypes.selectSingleDiscountCodeLoading:
      return {
        ...state,
        loading: payload
      };
    case actionTypes.selectSingleDiscountCodeEmpty:
      return {
        ...state,
        excel: []
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({
    type: actionTypes.selectSingleDiscountCodeLoading,
    payload: true
  });
  let config = {
    url: "select_request"
  };
  let data = {
    table: "discountcode",
    method_type: "select_single_discount_code",
    data: payload?.data ? payload.data : {},
    from: payload?.from ? (payload.from - 1) * payload.size : 0,
    size: payload?.size,
    sort_by: payload?.sort_by
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectSingleDiscountCode,
      payload: res.data.response.data
    });
    yield put({
      type: actionTypes.selectSingleDiscountCodeLoading,
      payload: false
    });
  } catch (error) {
    yield put({
      type: actionTypes.selectSingleDiscountCodeLoading,
      payload: false
    });
    handleNotificationAlertCatch();
  }
}

function* handleWorkerExcel({ payload }) {
  let config = {
    url: "insert_request"
  };
  let data = {
    table: "discountcode",
    method_type: "insert_bulk_discount_code",
    data: payload ? payload : {}
  };

  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTryUpdate(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectSingleDiscountCodeExcel,
      payload: res.data.response.data
    });
  } catch (error) {
    handleNotificationAlertCatch();
  }
}

export function* discountSelect() {
  yield takeLatest(actionTypes.selectSingleDiscountCodeAsync, handleWorker);
  yield takeLatest(
    actionTypes.selectSingleDiscountCodeExcelAsync,
    handleWorkerExcel
  );
}
