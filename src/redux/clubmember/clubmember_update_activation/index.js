import AxiosCustom from "./../../../app/common/components/apiConfig"

export const clubmember_update_activation_dispatch = (method_type, id) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type:method_type,
            data:{
                _id: id
            }
        }

        return AxiosCustom(config ,_data)
}



