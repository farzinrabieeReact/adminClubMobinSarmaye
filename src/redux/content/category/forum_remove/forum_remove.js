import AxiosCustom from "../../../../app/common/components/apiConfig";

export const forum_remove = dataa => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "forum",
    method_type: "remove_forum",
    data: dataa
      ? {
          _id: dataa
        }
      : {}
  };
  return AxiosCustom(config, data);
};
