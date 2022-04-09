import AxiosCustom from "../../../../app/common/components/apiConfig";

export const stockCash_delete = item => {
  let config = {
    url: "delete_request"
  };

  let data = {
    table: "codal",
    method_type: "delete_codal_participation",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
