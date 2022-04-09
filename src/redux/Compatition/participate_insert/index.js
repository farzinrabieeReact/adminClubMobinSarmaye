import axiosCustom from '../../../app/common/components/apiConfig';






export function participate_v1_actions_insert(data) {

    return async (dispatch) => {
        let config = { url: "insert_request" };

        let _data = {
            table: "competition",
            method_type: "participate",
            data: data
        }
             return await axiosCustom(config, _data)
    }
}