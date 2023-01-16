import config from "./config";
import axios from "axios";
const token = localStorage.getItem("token");

export const userService = {
  post,
  login,
  get,
  localpost,
  localget,
  jsonpost,
  image,
  uploadImage
  // getStatus
};

function post(apiEndpoint, payload, domain) {
  return axios
    .post(
      `${domain === "node" ? config.nodeUrl : config.apiUrl}` + apiEndpoint,
      payload,
      getOptions()
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function uploadImage(apiEndpoint, payload) {
  return axios
    .post(config.nodeUrl + apiEndpoint, payload, getOptionImage())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function image(apiEndpoint, payload) {
  return axios
    .post(config.apiUrl + apiEndpoint, payload, getOptionImage())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function jsonpost(apiEndpoint, payload) {
  return axios
    .post(config.jsonUrl + apiEndpoint, payload, getOptions())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function localpost(apiEndpoint, payload) {
  return axios
    .post(config.nodeUrl + apiEndpoint, payload, getOptions())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function localget(apiEndpoint) {
  return axios
    .get(config.nodeUrl + apiEndpoint, getOptions())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function get(apiEndpoint, domain) {
  return axios
    .get(
      `${domain === "node" ? config.nodeUrl : config.apiUrl}` + apiEndpoint,
      getOptions()
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function login(apiEndpoint, payload) {
  return axios
    .post(config.baseUrl + apiEndpoint, payload, getOptionsLogin())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined && err.response.status === 401) {
        // window.open('/','_self');
      } else {
        //alert('operation not able to perform');
      }
      return err;
    });
}

function getOptions() {
  var options = {};
  options.headers = {
    Authorization: "Bearer " + token, //the token is a variable which holds the token
    "Access-Control-Allow-Origin": "*",
  };
}

function getOptionsLogin() {
  var options = {};
  options.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  };
}

function getOptionImage() {
  var options = {};
  options.headers = {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  };
}
