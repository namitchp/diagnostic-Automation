import { userService } from "../services";
 

export const AuthController = () => {
    getCustomerList
}

async function getCustomerList(payload) {
    try {
        let apiEndpoint = `admin/get_customerlist`;

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