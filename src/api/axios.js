import Axios from "axios";

const apiAxios = params => {
  return Axios({ ...params, method: params.method || "GET" })
    .then(res => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch(error => {
      console.log("请求出错"+error);
      return {
        code: 0,
        hint: "请求错误"
      };
    });
};
export default apiAxios;
