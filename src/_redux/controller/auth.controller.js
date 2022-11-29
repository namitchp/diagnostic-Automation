import { userService } from "../../services";

export const AuthController = {
    checkUserCred,
    checkAuthOTP,
    getDecryptUserDetails
}


async function checkUserCred(payload) {
    try {
        let apiEndpoint = `Login/CheckLoging`;

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

async function checkAuthOTP(payload) {
    try {
        let apiEndpoint = `Auth/token`;

        let response = await userService.login(apiEndpoint,payload);
        
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

async function getDecryptUserDetails(payload) {
    try {
        let apiEndpoint = `Login/UserLoginByEncryptUserId`;

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

 