import ApiConfig from "../../../app/common/components/apiConfig";

export function export_excel_anbar_actions(payload) {
    let config = { url: "select_request" };

    let { data, sort_by } = payload

    let _data = {
        table: "gift",
        method_type: "select_registrations",
        data: data ? data : {},
        from:0,
        size: 10000,
        sort_by: sort_by
    }

    return ApiConfig(config, _data);
}
