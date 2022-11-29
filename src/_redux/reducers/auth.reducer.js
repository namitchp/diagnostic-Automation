import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions/auth.action";

const initialState = {
    isAuthenticated:false,
    token:null,
    loadingStatus:false,
    responseMessage:'',
    isValidCred:false,
    getOtpResponse:{},
    decryptUserDetails:null
}


export const authReducer = createReducer(initialState, {
    [actions.requestStatus.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.loadingStatus = action.payload;
    }),

    [actions.checkAuthCredResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isValidCred = action.payload.valid;
            draft.responseMessage = action.payload.valid ? "" : "Username or Password is not correct"
    }),
    [actions.checkAuthOTPResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            console.log(action.payload)
             if(action.payload.access_token){
                 draft.getOtpResponse.valid = true;
                 draft.getOtpResponse.access_token = action.payload.access_token;
                 draft.getOtpResponse.expires_in = action.payload.expires_in;
                 draft.getOtpResponse['.issued'] = action.payload['.issued'];
                 draft.getOtpResponse['.expires'] = action.payload['.expires'];
                 draft.getOtpResponse.userId = action.payload.userId;
                 draft.getOtpResponse.userName = action.payload.userName;
                 draft.getOtpResponse.code = action.payload.code;
                 draft.getOtpResponse.encrypt_userId = action.payload.encrypt_userId;
             }
             else{
                draft.getOtpResponse.valid = false;
                draft.getOtpResponse.message = "OTP is incorrect";
             }
    }),
    [actions.getDecryptUserId.toString()]: (state, action) =>
    produce (state, (draft) => {}),
    [actions.getDecryptUserIdResponse.toString()]: (state, action) =>
    produce (state, (draft) => {
        draft.decryptUserDetails = action.payload;
    }),
});