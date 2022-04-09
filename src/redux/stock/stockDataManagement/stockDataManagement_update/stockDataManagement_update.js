import AxiosCustom from "../../../../app/common/components/apiConfig";

export const stockDataManagement_update = (item, id) => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "stock",
    method_type: "update_stock",
    data: item ? item : {}
  };
  return AxiosCustom(config, data);
};
