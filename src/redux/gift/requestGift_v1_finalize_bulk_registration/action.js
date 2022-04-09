import ApiConfig from './../../../app/common/components/apiConfig';




export function request_gift_v1_actions_finalize_bulk_registration(data) {

    let config = { url: "update_request" };

    let _data = {
        table: "gift",
        method_type: "finalize_bulk_registration",
        data: {
            "list_data": data
        }
    }

    return ApiConfig(config, _data)

}