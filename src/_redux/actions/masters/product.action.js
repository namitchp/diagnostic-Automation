import { createAction } from "@reduxjs/toolkit";


export const getProductListBrowse = createAction(
    "GET_PRODUCT_BROWSE_LIST",
    (params,filters) => ({
        payload: {params,filters},
    }),
);

export const getProductListBrowseSuccess = createAction(
    "GET_PRODUCT_BROWSE_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const getCategoryList = createAction(
    "GET_CATEGORY_LIST"
);

export const getCategoryListSuccess = createAction(
    "GET_CATEGORY_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);


export const dropdownTechInformation = createAction(
    "GET_LP_REF_LIST"
);

export const dropdownTechInformationSuccess= createAction(
    "DROPDOWN_TECH_INFORMATION_SUCCESS",
    (data) => ({
        payload: data,
    }),
);


export const getGGNameList = createAction(
    "GET_GG_NAME_LIST"
);

export const getGGNameListSuccess = createAction(
    "GET_GG_NAME_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const updateProductVerifiedStatus = createAction(
    "UPDATE_PRODUCT_VERIFIED_STATUS",
    (param) => ({
        payload: {param},
    }),
);

export const updateProductVerifiedStatusSuccess = createAction(
    "UPDATE_PRODUCT_VERIFIED_STATUS_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const updateProductListPrice = createAction(
    "UPDATE_PRODUCT_LIST_PRICE",
    (param) => ({
        payload: {param},
    }),
);

export const updateProductLPRef = createAction(
    "UPDATE_PRODUCT_LP_REF",
    (param) => ({
        payload: {param},
    }),
);

export const updateProductMovingNonMoving = createAction(
    "UPDATE_PRODUCT_MOVING_NON",
    (param) => ({
        payload: {param},
    }),
);

