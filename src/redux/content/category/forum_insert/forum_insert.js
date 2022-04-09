import AxiosCustom from "../../../../app/common/components/apiConfig";

export const forum_insert = dataa => {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "forum",
    method_type: "insert",
    data: dataa
      ? {
          ...dataa
        }
      : {}
  };
  return AxiosCustom(config, data);
};
