import axiosCustom from "../../../../app/common/components/apiConfig";
import AxiosCustom from "../../../../app/common/components/apiConfig";

export const faq_delete = id => {
  let config = {
    url: "delete_request"
  };

  let data = {
    table: "faq",
    method_type: "delete",
    data: id
      ? {
          _id: id
        }
      : {}
  };
  return AxiosCustom(config, data);
};
