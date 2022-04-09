import AxiosCustom from "../../../app/common/components/apiConfig";

export const branches_insert=(data)=>{
 
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "insert_request" };

        let _data = {
            table: "shoab",
            method_type: "insert",
            data: data
        }
        return AxiosCustom(config,_data)

   
}