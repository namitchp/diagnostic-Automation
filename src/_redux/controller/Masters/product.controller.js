import { userService } from "../../../services";

export const ProductMasterController = {
     getProductBrowse,
     getCategoryList,
     getLPRefList,
     getGGNameList,
     updateProductVerifyStatus,
     updateProductListPrice,
     updateProductLpRef,
     updateProductMovingNonMoving
}


async function getProductBrowse(params , filters) {
    try {
        let apiEndpoint = `Product/ProductMasterBrowse?filter_value=${params.filter_value}&page_number=${params.pageNo}&page_size=${params.pageSize}&sort_column=${params.sort_column}&sort_order=${params.sort_order}`;
        let response = await userService.post(apiEndpoint , filters);
        
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
        let apiEndpoint = `Dropdown/GetCategoryList`;
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


async function getLPRefList() {
    try {   
        let apiEndpoint = `Dropdown/GetLpRefList`;
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
        let apiEndpoint = `Product/UpdateProductEdit`;
        let response = await userService.post(apiEndpoint,param);
        
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
        let apiEndpoint = `Product/UpdateProductListPrice`;
        let response = await userService.post(apiEndpoint,param);
        
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
        let apiEndpoint = `Product/UpdateProductLPRef`;
        let response = await userService.post(apiEndpoint,param);
        
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
        let apiEndpoint = `Product/UpdateProductMovingNonMoving`;
        let response = await userService.post(apiEndpoint,param);
        
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
