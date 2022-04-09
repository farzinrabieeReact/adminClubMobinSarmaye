
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'
import store from '../../../redux/store';

export const actionTypes = {
    selecClubmemberPermittedRole: "[selecClubmemberPermittedRole] Action",
    selecClubmemberpermittedRoleAsync: "[selecClubmemberpermittedRoleAsync] Action",
    selecClubmemberPermittedRoleLoading: "[selecClubmemberPermittedRoleLoading] Action",
};

const initialState = {
    data: [],
    size: 50,
    loading: false
};


export const select_clubmember_permitted_role_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selecClubmemberPermittedRole:
            return {
                ...state,
                data: payload.results,
                loading: true,
            }
        case actionTypes.selecClubmemberPermittedRoleLoading:
            return {
                ...state,
                loading: payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {
    yield put({ type: actionTypes.selecClubmemberPermittedRoleLoading, payload: true })
    let { dispatch } = store
    let config = {
        url: "select_request",
    }

    let data = {
        table: "role",
        method_type: "select_role",
        data: payload.data ? payload.data : {},
        from: 0,
    }


    try {
        let res = yield axiosCustom(config, data)

        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.selecClubmemberPermittedRole, payload: res.data.response.data })

    } catch {
        handleNotificationAlertCatch()
    }finally{
        yield put({ type: actionTypes.selecClubmemberPermittedRoleLoading, payload: false })
    }
}


export function* selecClubmemberPermittedRole() {

    yield takeLatest(actionTypes.selecClubmemberpermittedRoleAsync, handleWorker)
}