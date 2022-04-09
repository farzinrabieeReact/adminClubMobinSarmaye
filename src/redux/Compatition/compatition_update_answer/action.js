import ApiConfig from '../../../app/common/components/apiConfig';






export function compatition_v1_actions_update_competition_answer(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "competition",
            method_type: "update_competition_answer",
            data: data
        }
             return await ApiConfig(config, _data)
    }
}