import AxiosCustom from "../../../../app/common/components/apiConfig";

export const news_delete = id => {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "news",
    method_type: "update",
    data: {
      ...id
    }
  };
  return AxiosCustom(config, data);
};
