import AxiosCustom from "../../../../app/common/components/apiConfig";

export const post_remove = id => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "post",
    method_type: "remove_post",
    data: id
      ? {
          _id: id
        }
      : {}
  };
  return AxiosCustom(config, data);
};
