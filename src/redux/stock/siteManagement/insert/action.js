import ApiConfig from './../../../../app/common/components/apiConfig';





export function siteManagementInsert_actions(data) {

    let config = { url: "insert_request" };

    let _data = {
        table: "stock",
        method_type: "insert_summery",
        data: data
    }

    return ApiConfig(config, _data)
}