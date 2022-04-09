import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { profile_v1_action_select } from "./../person_v1_select/action"




export const profile_v1_action_update = (data) => {
    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type: "update",
            data
        }
        
        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data ,profile_v1_action_select , dispatch , data.national_id )
        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}