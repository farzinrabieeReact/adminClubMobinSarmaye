
export const actionTypes = {
    GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION: "[GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION] Action",
    GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY: "[GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY] Action",
};

const initState = {
    data: [],
}


export const request_gift_v1_select_bulk_registration_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case actionTypes.GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION:
            return {
                data: payload
            }
        case actionTypes.GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY:
            return initState
        default:
            return state;
    }
}
