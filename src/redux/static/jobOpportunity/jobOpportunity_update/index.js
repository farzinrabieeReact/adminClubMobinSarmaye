


import AxiosCustom from "../../../../app/common/components/apiConfig";

export const jobOpportunity_update_action = (data,id) =>{
    let config = { url: "update_request" };
    
    let _data = {
        table: "static",
        method_type: "update",
        data: {
            name: "job_opportunities",
            content:data,
            _id: id
        }
    }

        return AxiosCustom(config ,_data)
}



