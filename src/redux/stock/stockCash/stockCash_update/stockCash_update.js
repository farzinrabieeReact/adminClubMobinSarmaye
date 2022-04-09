import AxiosCustom from "../../../../app/common/components/apiConfig";

export const stockCash_update = item => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "codal",
    method_type: "update_codal_participation",
    data: item ? item : {}
  };
  return AxiosCustom(config, data);
};
