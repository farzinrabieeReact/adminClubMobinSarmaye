import AxiosCustom from "../../../../app/common/components/apiConfig";

export const contactUs_update = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "contactus",
    method_type: "update",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
