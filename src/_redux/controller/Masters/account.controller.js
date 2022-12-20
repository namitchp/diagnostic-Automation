import { userService } from "../../../services";

export const AccountMasterController = {
    browseAccountData,
    getAccountMasterFilters,
    getSelectedAccountDetails,
    accountHideUpdate,
    updateAccountVerified
}
async function browseAccountData(filters,params) {
    try {
        let apiEndpoint = `Account/AccountMasterBrowse?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;

        let response = await userService.post(apiEndpoint,filters);
        
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
 

async function getAccountMasterFilters() {
    try {
        let apiEndpoint = `Dropdown/AccountMasterDropdown`;

        let response = await userService.post(apiEndpoint,{});
        
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
 
async function getSelectedAccountDetails(payload) {
    try {
        let apiEndpoint = `Account/AccountMasterPreview`;

        let response = await userService.post(apiEndpoint,payload);
        
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
async function accountHideUpdate(payload) {
    try {
        let apiEndpoint = `Account/UpdateAccountHide`;
        let response = await userService.post(apiEndpoint,payload);
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

async function updateAccountVerified(payload) {
    try {
        let apiEndpoint = `Account/UpdateAccountEdit`;

        let response = await userService.post(apiEndpoint,payload);
        
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
 