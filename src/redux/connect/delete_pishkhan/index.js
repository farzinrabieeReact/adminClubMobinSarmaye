


export const delete_pishkhan = ()=>{
    let config = { url: "delete_request" };

    let _data = {
        table: "pishkhan",
        method_type: "delete",
        data: {
            _id: id
        }
    }

    return ApiConfig(config, _data)
}