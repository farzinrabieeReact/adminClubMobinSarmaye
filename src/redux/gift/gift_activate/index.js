import AxiosCustom from "./../../../app/common/components/apiConfig"

export const gift_activate_dispatch = (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "activate_gift",
            data
        }

        return AxiosCustom(config ,_data)
}



