import AxiosCustom from "../../../../app/common/components/apiConfig";

export const stockDataManagement_insert = item => {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "stock",
    method_type: "insert_stock",
    data: item ? item : {}
  };
  return AxiosCustom(config, data);
};
