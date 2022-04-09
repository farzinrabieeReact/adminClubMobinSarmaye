import AxiosCustom from "../../../../app/common/components/apiConfig";

export const forum_update = dataa => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "forum",
    method_type: "update",
    data: dataa
      ? {
          ...dataa
        }
      : {}
  };
  return AxiosCustom(config, data);
};
