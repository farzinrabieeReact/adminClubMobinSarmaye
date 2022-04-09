import AxiosCustom from "../../../app/common/components/apiConfig";

export const branches_delete=(data)=>{
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "delete_request" };

        let _data = {
            table: "shoab",
            method_type: "delete",
            data: {
                _id:data
            }
        }
        return AxiosCustom(config,_data)

   
}