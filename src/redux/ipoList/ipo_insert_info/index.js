import AxiosCustom from "../../../app/common/components/apiConfig";




export async function  ipo_insert_action(data) {
 
    let config = { url: "insert_request" };

    let _data = {
      table: "ipo",
      method_type: "register_ipo",
      data: data ? data : {}
    };

    
      return await AxiosCustom(config, _data);
  };

