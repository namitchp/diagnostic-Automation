import { createAction } from "@reduxjs/toolkit";

export const getAccountGroupBrowse = createAction(
    "GET_ACCOUNT_GROUP_BROWSE",
    (params) => ({
        payload: {params},
    }),
);

export const getAccountGroupBrowseSuccess = createAction(
    "GET_ACCOUNT_GROUP_BROWSE_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const insertAccountMaster = createAction(
    "INSERT_ACCOUNT_MASTER",
    (params) => ({
        payload: {params},
    }),
);


export const selectedConfigGroup = createAction(
    "SET_CONFIG_GROUP_INFO",
    (data) => ({
        payload: data,
    }),
);

export const clearSelectedConfigGroup = createAction(
    "CLEAR_CONFIG_GROUP_INFO"
);

export const updateAccountGroupInfo = createAction(
    "UPDATE_ACCOUNT_GROUP_INFO",
    (params) => ({
        payload: {params},
    }),
);

export const updateAccountGroupInfoSuccess = createAction(
    "UPDATE_ACCOUNT_GROUP_INFO_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const clearAccountGroupInfoResponse = createAction(
    "CLEAR_ACCOUNT_INFO_RESPONSE"
);

export const getPincodeBrowseList = createAction(
    "GET_PINCODE_BROWSE_LIST",
    (params) => ({
        payload: {params},
    }),
);

export const getPincodeBrowseListSuccess = createAction(
    "GET_PINCODE_BROWSE_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const selectedPincodeInfo = createAction(
    "SET_SELECTED_PINCODE",
    (data) => ({
        payload: data,
    }),
);

export const clearSelectedPincode = createAction(
    "CLEAR_PINCODE_INFO"
);

export const updatePincodeInfo = createAction(
    "UPDATE_PINCODE_INFO",
    (params) => ({
        payload: {params},
    }),
);

export const updatePincodeInfoSuccess = createAction(
    "UPDATE_PINCODE_INFO_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const clearPincodeInfoResponse = createAction(
    "CLEAR_PINCODE_INFO_RESPONSE"
);

export const deleteSelectedPincode = createAction(
    "DELETE_CONFIG_PINCODE",
    (params) => ({
        payload: {params},
    }),
);

export const deleteSelectedPincodeSuccess = createAction(
    "DELETE_CONFIG_PINCODE_SUCCESS",
    (params) => ({
        payload: {params},
    }),
);


export const getConfigRegionList = createAction(
    "FETCH_CONFIG_REGION_LIST",
    (params) => ({
        payload: {params},
    }),
);

export const getConfigRegionListSuccess = createAction(
    "FETCH_CONFIG_REGION_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);


