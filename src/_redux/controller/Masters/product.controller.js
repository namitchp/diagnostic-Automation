import { userService } from "../../../services";

export const ProductMasterController = {
     getProductBrowse,
     getCategoryList,
     dropdownTechInformation,
     getGGNameList,
     updateProductVerifyStatus,
     updateProductListPrice,
     updateProductLpRef,
     updateProductMovingNonMoving
}


async function getProductBrowse(params , filters) {
    try {
        let apiEndpoint = `master/browse_product_master?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
        let response = await userService.post(apiEndpoint , filters,"node");
        
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

async function getCategoryList() {
    try {   
        let apiEndpoint = `master/dropdown_product`;
        let response = await userService.post(apiEndpoint,"","node");
        
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


async function dropdownTechInformation() {
    try {   
        let apiEndpoint = `master/dropdown_techenical`;
        let response = await userService.post(apiEndpoint,"","node");
        
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

async function getGGNameList() {
    try {   
        let apiEndpoint = `Dropdown/GetGGList`;
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



async function updateProductVerifyStatus(param) {
    try {   
        let apiEndpoint = `master/update_product_edit`;
        let response = await userService.post(apiEndpoint,param,"node");
        
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


async function updateProductListPrice(param) {
    try {   
        let apiEndpoint = `master/update_product_list_price`;
        let response = await userService.post(apiEndpoint,param,"node");
        
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


async function updateProductLpRef(param) {
    try {   
        let apiEndpoint = `master/update_product_lpf`;
        let response = await userService.post(apiEndpoint,param,"node");
        
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
async function updateProductMovingNonMoving(param) {
    try {   
        let apiEndpoint = `master/update_product_moving`;
        let response = await userService.post(apiEndpoint,param,"node");
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
