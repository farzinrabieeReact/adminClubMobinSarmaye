
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    clubmemberKycProfileSelect: "[clubmemberKycProfileSelect] Action",
    clubmemberKycProfileSelectAsync: "[clubmemberKycProfileSelectAsync] Action",
    clubmemberKycProfileRemove: "[clubmemberKycProfileRemove] Action",
};

const initialState = {
    data: [],
    isOk: false
};


export const reducer_get_kyc_profile = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.clubmemberKycProfileSelect:
            return {
                data: payload,
                isOk: true
            }
            case actionTypes.clubmemberKycProfileRemove:
                return initialState
            default:
                return state
    }
}

function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "get_kyc_profile",
        data: payload ? payload : {}
    } 


    try {
        let res = yield axiosCustom(config, data)

        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.clubmemberKycProfileSelect, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* workerclubmember_with_profile_picture_reducer
() {

    yield takeLatest(actionTypes.clubmemberKycProfileSelectAsync, handleWorker)
}