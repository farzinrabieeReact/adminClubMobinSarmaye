import ApiConfig from '../../../app/common/components/apiConfig';



export function request_gift_v1_system_unregister(data) {
        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "system_unregister",
            data: data
        }

        return ApiConfig(config, _data)

}