import AxiosCustom from "./../../../app/common/components/apiConfig"

export const clubmember_deleted_introducing_dispatch = (data) =>{
    let config = { url: "update_request" };

        let _data = {
            table: "clubmember",
            method_type:"change_introducer",
            data: data ? data : {}
        }

        return AxiosCustom(config ,_data)
}



