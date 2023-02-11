import { userService } from "../../../services";

export const MaterialCodeMasterController = {
  getMaterialCodeBrowse,
  getPartyNameList,
  insertMaterialCode,
  getMaterialDetailById,
  deleteMaterialCode,
};

async function getMaterialCodeBrowse(filters, params) {
  try {
    let apiEndpoint = `MaterialCode/BrowseMaterialCode?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
    let response = await userService.post(apiEndpoint, filters);

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
async function getPartyNameList(filters) {
  try {
    let apiEndpoint = `master/party_name_list`;
    let response = await userService.post(apiEndpoint, {customer_type:filters},"node");
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

async function insertMaterialCode(filters) {
  try {
    let apiEndpoint = `master/insert_material_code`;
    let response = await userService.post(apiEndpoint, filters,"node");

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

async function getMaterialDetailById(payload) {
  try {
    let apiEndpoint = `master/preview_material_code`;
    let response = await userService.post(apiEndpoint,{tran_id:payload},"node");

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

async function deleteMaterialCode(payload) {
  try {
    let apiEndpoint = `master/delete_material_code`;
    let response = await userService.post(apiEndpoint, payload,"node");
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
