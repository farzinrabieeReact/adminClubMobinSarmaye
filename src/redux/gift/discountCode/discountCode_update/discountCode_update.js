import AxiosCustom from "../../../../app/common/components/apiConfig";

export const discountCode_update = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "discountcode",
    method_type: "update_discount_code",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
