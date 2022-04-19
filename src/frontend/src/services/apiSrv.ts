import axios from "axios";

class ApiSrv {
  API_URL = "http://localhost:5000/";
  path: string;

  constructor(path = "") {
    this.path = path;
  }

  async get() {
    try {
      const res = await axios({
        method: "GET",
        url: this.API_URL + this.path,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async post(props: Object) {
    try {
      const res = await axios({
        method: "POST",
        url: this.API_URL + this.path,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        data: props,
        responseType: "json",
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(error);
      return error;
    }
  }
}

export default ApiSrv;
