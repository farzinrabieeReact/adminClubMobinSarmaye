


   
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../../app/common/method/handleNotificationAlert";


export const actionTypes = {
    jobOpportunitySelect: "[jobOpportunity_Select] Action ",
    jobOpportunitySelectAsync: "[jobOpportunity_SelectAsync] Action",
};

const initialState = {
    data: "",
};


export const jobOpportunity_select_static_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.jobOpportunitySelect:
            return {
                // ...state,
                data:payload,
            }
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "static",
        method_type: "select",
        data: {
            name: "job_opportunities"
        }
    }

    try {
        let res = yield AxiosCustom(config, _data)
        let isOk = handleNotificationAlertTrySelect(res)
        if (!isOk) return

        yield put({ type: actionTypes.jobOpportunitySelect, payload: res.data})


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* jobOpportunitySelectStatic() {
    yield takeLatest(actionTypes.jobOpportunitySelectAsync, handleWorker)
}