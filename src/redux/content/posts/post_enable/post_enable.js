import AxiosCustom from "../../../../app/common/components/apiConfig";

export const post_enable = id => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "post",
    method_type: "enable_post",
    data: id
      ? {
          _id: id
        }
      : {}
  };
  return AxiosCustom(config, data);
};
