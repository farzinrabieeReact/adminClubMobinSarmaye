import AxiosCustom from "./../../../app/common/components/apiConfig"

export const clubmember_update_changePassword_dispatch = (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type:"change_password",
            data:data ? data : {}
        }

        return AxiosCustom(config ,_data)
}



