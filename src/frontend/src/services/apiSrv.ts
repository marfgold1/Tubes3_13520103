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
      return { res, error: null };
    } catch (error) {
      console.log(error);
      return { res: null, error: this._formatError(error) };
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
      return { res, error: null };
    } catch (error: any) {
      console.log(error);
      return { res: null, error: this._formatError(error) };
    }
  }

  _formatError(error: any) {
    console.log("JSON ERROR");
    console.log(error.toJSON());
    if (error.response) {
      console.log("RESPONSE ERROR");
      console.log(error.response);
      return [
        "Got an error from server:",
        `- Message: "${error.response.data.message}`,
        `- Status: ${error.response.status}`,
      ];
    } else if (error.request) {
      console.log("REQUEST ERROR");
      console.log(error.request);
      return [
        "Got an error when trying to connect to server:",
        `- Message: "${error.request}"`,
      ];
    } else {
      console.log("Error", error.message);
      return ["Got an unknown error with message: " + error.message];
    }
  }
}

export default ApiSrv;
