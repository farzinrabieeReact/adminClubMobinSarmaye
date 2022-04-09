import AxiosCustom from "./../../../app/common/components/apiConfig"

export const remove_notify_dispatch = (data) =>{
    
    let config = { url: "delete_request" };

    let _data = {
        table: "notification",
        method_type: "delete",
        data: data
    }

        return AxiosCustom(config ,_data)
}



