import AxiosCustom from "../../../../app/common/components/apiConfig";

export const post_inset = dataa => {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "post",
    method_type: "insert",
    data: dataa
      ? {
          ...dataa
        }
      : {}
  };
  return AxiosCustom(config, data);
};
