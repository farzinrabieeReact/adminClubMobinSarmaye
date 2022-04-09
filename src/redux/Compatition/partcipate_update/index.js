import axiosCustom from '../../../app/common/components/apiConfig'






export function participate_v1_actions_update(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "competition",
            method_type: "update_participation_answer",
            data: data
        }


         return await axiosCustom(config, _data)

           

    

    }
}