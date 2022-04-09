import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { profile_v1_action_select } from "../person_v1_select/action";




export function post_v1_actions_activation(method_type, id, national_id) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type: method_type,
            data: {
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            
            handleAlertAndSelectApi(response.data, profile_v1_action_select, dispatch, national_id)
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}