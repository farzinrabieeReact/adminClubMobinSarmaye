import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { PROFILE_V1_SELECT_ORDER , PROFILE_V1_SELECT } from "../../../typeActions";
import { handleNoAnswarApi , handleAlertMethodSelect} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const profile_v1_action_select = (national_id , type) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select_with_profile_picture",
            data: {
                national_id: national_id
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            if(response.data.response.data.results.length === 0){
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
                return
            }

            if(!type)
                  dispatch({ type: PROFILE_V1_SELECT, payload: response.data })
            if(type === 'order')
                  dispatch({ type: PROFILE_V1_SELECT_ORDER, payload: response.data })

        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}