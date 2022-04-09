import AxiosCustom from "../../../../app/common/components/apiConfig";

export const marketer_details = (_id) => {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "marketer",
    method_type: "select",
    data: { _id }
  };

  
  return AxiosCustom(config, data);
};
