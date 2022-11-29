import { userService } from "../../../services";

export const ConfigurationMasterController = {
    searchAccountGroupBrowse,
    updateAccountGroupInfo,
    searchPincodeBrowse,
    updatePincodeInfo,
    deleteSelectedPincode
}


async function searchAccountGroupBrowse(params) {
    try {
        let apiEndpoint = `Configuration/ConfigurationMasterBrowse?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
        let response = await userService.post(apiEndpoint);
        
        if (response) {
            return (response.data);
        }
        else {
            if (response.data.status !== 500) {
                alert(response.data);
            }
            return null;
        }
    }
    catch (error) {
        console.log("error", error);
        return null;
    }
}

async function updateAccountGroupInfo(params) {
    try {
        let apiEndpoint = `Configuration/ConfigurationGroupInsert`;
        let response = await userService.post(apiEndpoint,params);
        
        if (response) {
            return (response.data);
        }
        else {
            if (response.data.status !== 500) {
                alert(response.data);
            }
            return null;
        }
    }
    catch (error) {
        console.log("error", error);
        return null;
    }
}


async function searchPincodeBrowse(params) {
    try {
        let apiEndpoint = `Configuration/ConfigurationPincodeBrowse?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
        let response = await userService.post(apiEndpoint);
        
        if (response) {
            return (response.data);
        }
        else {
            if (response.data.status !== 500) {
                alert(response.data);
            }
            return null;
        }
    }
    catch (error) {
        console.log("error", error);
        return null;
    }
}
 

async function updatePincodeInfo(params) {
    try {
        let apiEndpoint = `Configuration/ConfigurationPincodeInsert`;
        let response = await userService.post(apiEndpoint,params);
        
        if (response) {
            return (response.data);
        }
        else {
            if (response.data.status !== 500) {
                alert(response.data);
            }
            return null;
        }
    }
    catch (error) {
        console.log("error", error);
        return null;
    }
}


async function deleteSelectedPincode(params) {
    try {
        let apiEndpoint = `Configuration/ConfigurationPincodeDelete`;
        let response = await userService.post(apiEndpoint,params);
        
        if (response) {
            return (response.data);
        }
        else {
            if (response.data.status !== 500) {
                alert(response.data);
            }
            return null;
        }
    }
    catch (error) {
        console.log("error", error);
        return null;
    }
}

