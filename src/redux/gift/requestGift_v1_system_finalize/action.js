import ApiConfig from '../../../app/common/components/apiConfig';



export function request_gift_v1_system_finalize(data) {

    let config = { url: "update_request" };

    let _data = {
        table: "gift",
        method_type: "system_finalize",
        data: {
            ...data
        }
    }

    return ApiConfig(config, _data)

}