import ApiConfig from '../../../app/common/components/apiConfig';



export function request_gift_v1_change_postal_tracking_code(data) {

        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "change_postal_tracking_code",
            data: {     
                ...data
            }
        }

       return ApiConfig(config, _data)
}