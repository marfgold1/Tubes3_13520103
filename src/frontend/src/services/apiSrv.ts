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
      return null;
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
    } catch (error: any) {
      console.log("JSON ERROR");
      console.log(error.toJSON());
      if (error.response) {
        console.log("RESPONSE ERROR");
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          `Got an error from server:\n
          - Message: "${error.response.data.message}" 
          - Status: ${error.response.status}`
        );
      } else if (error.request) {
        console.log("REQUEST ERROR");
        alert(
          `Got an error when trying to connect to server:\n
          - Message: "${error.request}"\n
          `
        );
        console.log(error.request);
      } else {
        alert("Got an unknown error with message: " + error.message);
        console.log("Error", error.message);
      }
      return null;
    }
  }
}

export default ApiSrv;
