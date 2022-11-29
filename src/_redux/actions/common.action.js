import { createAction } from "@reduxjs/toolkit";

export const getUserRightList = createAction("USER_RIGHTS_LIST");
export const getUserFilterList = createAction("USER_FILTER_LIST");

export const getUserRightListResponse = createAction("USER_RIGHTS_LIST_RESPONSE",
    (data) => ({
        payload: data,
    }),
);

export const setSelectedMenu = createAction("SELECTED_MENU",
    (data) => ({
        payload: data,
    }),
);

export const selectedMenuResponse = createAction("SELECTED_MENU_RESPONSE",
    (data) => ({
        payload: data,
    }),
);

export const setSelectedSubMenu = createAction("SELECTED_SUB_MENU",
    (data) => ({
        payload: data,
    }),
);

export const selectedSubMenuResponse = createAction("SELECTED_SUB_MENU_RESPONSE",
    (data) => ({
        payload: data,
    }),
);

export const getUserFilterListSuccess = createAction("USER_FILTER_LIST_SUCCESS",
    (data) => ({
        payload: data,
    }),
);