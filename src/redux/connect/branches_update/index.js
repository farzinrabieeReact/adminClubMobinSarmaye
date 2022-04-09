import AxiosCustom from "../../../app/common/components/apiConfig";

export const branches_update=(data)=>{
 
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "shoab",
            method_type: "update",
            data: {
                ...data
            }
        }
        return AxiosCustom(config,_data)

   
}