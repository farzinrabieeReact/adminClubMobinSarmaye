import AxiosCustom from "../../../../app/common/components/apiConfig";

export const faq_insert = item => {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "faq",
    method_type: "insert",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
