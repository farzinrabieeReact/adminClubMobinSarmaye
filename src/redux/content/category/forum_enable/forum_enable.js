import AxiosCustom from "../../../../app/common/components/apiConfig";

export const forum_enable = dataa => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "forum",
    method_type: "enable_forum",
    data: dataa
      ? {
          _id: dataa
        }
      : {}
  };
  return AxiosCustom(config, data);
};
