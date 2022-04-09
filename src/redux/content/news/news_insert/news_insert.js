import AxiosCustom from "../../../../app/common/components/apiConfig";

export const news_insert = item => {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "news",
    method_type: "insert_news",
    data: {
      ...item
    }
  };
  return AxiosCustom(config, data);
};
