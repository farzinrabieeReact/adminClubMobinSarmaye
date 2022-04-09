import AxiosCustom from "../../../../app/common/components/apiConfig";

export const discountCode_delete = item => {
  let config = {
    url: "delete_request"
  };

  let data = {
    table: "discountcode",
    method_type: "delete",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
