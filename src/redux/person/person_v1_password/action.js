import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_password(data , action , national_id) {

    return async (dispatch) => {

        let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type: "change_password",
            data: {
               ...data
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, action, dispatch , national_id )
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}