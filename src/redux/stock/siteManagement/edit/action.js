import ApiConfig from './../../../../app/common/components/apiConfig';





export function siteManagementEdit_actions(data) {

    let config = { url: "update_request" };

    let _data = {
        table: "stock",
        method_type: "update_summery",
        data: data
    }

    return ApiConfig(config, _data)
}