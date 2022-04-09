import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { PROFILE_V1_SELECT_INTRODUCING } from "../../../typeActions";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const profile_v1_action_select_introducing = (national_id,size,from) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select",
            from: from ? (from - 1) * size : 0,
            size: size,
            data: {
                introducing_member_id: national_id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
           

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }


            dispatch({ type: PROFILE_V1_SELECT_INTRODUCING, payload: response.data })


        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}