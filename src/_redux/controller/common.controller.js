import { userService } from "../../services";

export const CommonController = {
  getUserRightsList,
  currenyMasking,
  getUserFilterList,
  tablePickerController, 
  commonApiCall,
  commonApiCallFilter,
  commonJsonUpdate,
  commonApiFile,
};

async function getUserRightsList() {
  try {
    let apiEndpoint = `menu/menu_list_level1?user_id=${localStorage.getItem(
      "userId"
    )}`;

    let response = await userService.get(apiEndpoint,"node");

    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function getUserFilterList() {
  try {
    let apiEndpoint = `user/get_user_filter?user_id=${localStorage.getItem(
      "userId"
    )}`;

    let response = await userService.localget(apiEndpoint);

    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) { 
    console.log("error", error);
    return null;
  }
}

export function currenyMasking(val) {
  var format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  // var x = val.toString();
  // var lastThree = x.substring(x.length-3);
  // var otherNumbers = x.substring(0,x.length-3);
  // if(otherNumbers != '')
  //     lastThree = ',' + lastThree;
  // var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return format.format(parseFloat(val).toFixed(2));
}

async function tablePickerController(url, params, domain = "") {
  console.log(domain);
  try {
    let apiEndpoint = `${url}?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
    let response = await userService.post(apiEndpoint, {}, domain);

    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function commonApiCall(url, params, body, domain) {
  try {
    let apiEndpoint = `${url}?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
    let response = await userService.post(apiEndpoint, body, domain);
    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function commonApiFile(url, body) {
  try {
    let apiEndpoint = url;
    let response = await userService.image(apiEndpoint, body);
    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function commonApiCallFilter(url, body, type = "post", domain = "") {
  
  try {
    let apiEndpoint = `${url}`;
    let response;
    if (type === "post") {
      response = await userService.post(apiEndpoint, body, domain);
    } else {
      let queryString = Object.keys(body)
        .map((key) => key + "=" + body[key])
        .join("&");
      let _url = url + "?" + queryString;
      response = await userService.get(_url, domain);
    }

    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function commonJsonUpdate(url, body) {
  try {
    let apiEndpoint = `${url}`;
    let response = await userService.jsonpost(apiEndpoint, body);

    if (response) {
      return response.data;
    } else {
      if (response.data.status !== 500) {
        alert(response.data);
      }
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
