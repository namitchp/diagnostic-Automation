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
    let apiEndpoint = `/Dropdown/GetListCompanyMaterialCode`;
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

async function insertMaterialCode(filters) {
  try {
    let apiEndpoint = `/MaterialCode/MaterialCodeInsert`;
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

async function getMaterialDetailById(payload) {
  try {
    let apiEndpoint = `/MaterialCode/MaterialCodePreview`;
    let response = await userService.post(apiEndpoint, payload);

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
    let apiEndpoint = `/MaterialCode/MaterialCodeDelete`;
    let response = await userService.post(apiEndpoint, payload);

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
