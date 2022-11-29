import { createAction } from "@reduxjs/toolkit";

export const searchAccountMasterData = createAction(
    "SEARCH_ACCOUNT_MASTER_DATA",
    (filters,params) => ({
        payload: {filters, params},
    }),
);

export const searchAccountMasterDataSuccess = createAction(
    "SEARCH_ACCOUNT_MASTER_DATA_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const getAccountMasterFiltersList = createAction(
    "ACCOUNT_FILTER_LIST"
);

export const getAccountMasterFiltersListSuccess = createAction(
    "ACCOUNT_FILTER_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);


export const previewSelectedAccount = createAction(
    "ACCOUNT_MASTER_PREVIEW",
    (data) => ({
        payload: data
    })
);

export const previewSelectedAccountSuccess = createAction(
    "ACCOUNT_MASTER_PREVIEW_SUCCESS",
    (data) => ({
        payload: data,
    }),
);

export const clearSelectedAccount = createAction(
    "CLEAR_SELECTED_ACCOUNT"
);

export const setAccountHide = createAction(
    "ACCOUNT_MASTER_HIDE",
    (data) => ({
        payload: data
    })
);

export const setAccountVerified = createAction(
    "ACCOUNT_MASTER_VERIFIED",
    (data) => ({
        payload: data
    })
);

 


