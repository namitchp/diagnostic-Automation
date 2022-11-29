import React, { useEffect } from 'react';
import MainLayout from '../layouts/layout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthOTP, getDecryptUserId } from '../_redux/actions/auth.action';




const SwitchApp = (props) => {
const isAuthorisedByUrl = new URLSearchParams(props.location.search).get("token");
const dispatch = useDispatch();
const getDecryptUserDetailsResponse = useSelector((state) => state.auth.decryptUserDetails);
const checkAuthOtpResponse = useSelector((state) => state.auth.getOtpResponse);

useEffect(() => {
    if(isAuthorisedByUrl){
        const param = {
            encrypt_user_id:isAuthorisedByUrl
        }
        dispatch(getDecryptUserId(param));
    }
    else{
        window.location = "/";
    }
},[isAuthorisedByUrl]);


useEffect(() => {
    if(getDecryptUserDetailsResponse){
        console.log(getDecryptUserDetailsResponse);
        var login = `grant_type=password&username=${getDecryptUserDetailsResponse.user_name}&password=${getDecryptUserDetailsResponse.password}`;
        dispatch(checkAuthOTP(login));
    }
},[getDecryptUserDetailsResponse]);

useEffect(() => {
    if(!(Object.keys(checkAuthOtpResponse).length === 0 && checkAuthOtpResponse.constructor === Object)){
        if(checkAuthOtpResponse.valid){
            localStorage.setItem("token",checkAuthOtpResponse.access_token);
            localStorage.setItem("login",checkAuthOtpResponse.valid);
            localStorage.setItem("userName",checkAuthOtpResponse.userName);
            localStorage.setItem("userId",checkAuthOtpResponse.userId);
            localStorage.setItem("code",checkAuthOtpResponse.code);
            localStorage.setItem("encrypt_userId",checkAuthOtpResponse.encrypt_userId);
            window.location = "/";
        }
    }
},[checkAuthOtpResponse])


    return  <div className="switch_loader">
            <div>
                <CircularProgress />
                <h4>Please wait....</h4>
            </div>
    </div>

}

export default SwitchApp;