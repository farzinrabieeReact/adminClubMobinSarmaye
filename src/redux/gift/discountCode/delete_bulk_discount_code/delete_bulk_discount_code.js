import AxiosCustom from "../../../../app/common/components/apiConfig";

export const delete_bulk_discount_code = item => {
  let config = {
    url: "delete_request"
  };

  let data = {
    table: "discountcode",
    method_type: "delete_bulk_discount_code",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
