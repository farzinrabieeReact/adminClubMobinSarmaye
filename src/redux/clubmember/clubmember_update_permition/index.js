import AxiosCustom from "./../../../app/common/components/apiConfig"

export const clubmember_update_permission_dispatch = (data) => {
    let config = { url: "update_request" };

    let _data = {
        table: "clubmember",
        method_type: "update",
        data
    }

    return AxiosCustom(config, _data)
}



