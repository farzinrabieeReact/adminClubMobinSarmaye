
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'



export const actionTypes = {
    selecClubmemberIntroducingMemberId: "[selecClubmemberIntroducingMemberId] Action",
    selecClubmemberIntroducingMemberIdLoading: "[selecClubmemberIntroducingMemberIdLoading] Action",
    selecClubmemberIntroducingMemberIdAsync: "[selecClubmemberIntroducingMemberIdAsync] Action",
};

const initialState = {
    data: [],
    size: 5,
    total: 10000,
    loading: false
};


export const select_clubmember_introducing_member_id_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.selecClubmemberIntroducingMemberId:
            return {
                ...state,
                data: payload.results,
                total: payload.total ? payload.total : 10000,
            }
        case actionTypes.selecClubmemberIntroducingMemberIdLoading:
            return {
                ...state,
                loading: payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    yield put({ type: actionTypes.selecClubmemberIntroducingMemberIdLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select",
        data: payload.data ? payload.data : {},
        from: payload.from ? (payload.from - 1) * payload.size : 0,
        size: payload.size ? payload.size : initialState.size,
        sort_by: payload.sort_by,
    }


    try {

        let res = yield axiosCustom(config, data)
        let isOk = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.selecClubmemberIntroducingMemberIdLoading, payload: false })

        if (!isOk) return

        yield put({ type: actionTypes.selecClubmemberIntroducingMemberId, payload: res.data.response.data })


    } catch  {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.selecClubmemberIntroducingMemberIdLoading, payload: false })
    }


}


export function* selecClubmemberIntroducingMemberId() {

    yield takeLatest(actionTypes.selecClubmemberIntroducingMemberIdAsync, handleWorker)
}