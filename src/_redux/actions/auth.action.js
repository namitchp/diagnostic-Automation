import { createAction } from "@reduxjs/toolkit";

export const requestStatus = createAction(
    "REQUEST_STATUS",
    (data) => ({
        payload: data,
    }),
);

export const checkAuthCred = createAction(
    "CHECK_AUTH_CRED",
    (data) => ({
        payload: data,
    }),
);

export const checkAuthCredResponse = createAction(
    "CHECK_AUTH_CRED_RESPONSE",
    (data) => ({
        payload: data,
    }),
);

export const checkAuthOTP = createAction(
    "CHECK_LOGIN_OTP",
    (data) => ({
        payload: data,
    }),
);

export const checkAuthOTPResponse = createAction(
    "CHECK_AUTH_OTP_RESPONSE",
    (data) => ({
        payload: data,
    }),
);

export const getDecryptUserId = createAction(
    "GET_DECRYPT_USER_ID",
    (data) => ({
        payload: data,
    }),
);

export const getDecryptUserIdResponse = createAction(
    "GET_DECRYPT_USER_ID_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

