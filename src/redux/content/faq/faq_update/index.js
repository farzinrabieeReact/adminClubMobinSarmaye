import AxiosCustom from "../../../../app/common/components/apiConfig";

export const faq_update = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "faq",
    method_type: "update",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
