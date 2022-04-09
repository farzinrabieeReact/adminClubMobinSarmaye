import AxiosCustom from "./../../../app/common/components/apiConfig"

export const insert_newIpo = (data) =>{
    let config = { url: "insert_request" };
    let _data = {
      table: "ipo",
      method_type: "insert_ipo",
      data: {
        ...data,
      },
    };

        return AxiosCustom(config ,_data)
        
}
