import { createAction } from "@reduxjs/toolkit";
export const getUserRightList = createAction("USER_RIGHTS_LIST");

export const userRight=createAction("USER_RIGHT",(data)=>({payload:data}))
export const getFilterData = createAction("GET_FILTER_DATA",(data)=>({
  payload:data
}));
export const getFilterDataResponse = createAction("GET_FILTER_DATA_RESPOPNSE",(data)=>({
  payload:data
}));
export const updateFilterData = createAction("UPDATE_FILTER_DATA",(data)=>({
  payload:data
}));
export const updateFilterDataResponse = createAction("Update_FILTER_DATA_RESPOPNSE",(data)=>({
  payload:data
}));
export const getUserRightListSecondResponse = createAction(
    "USER_RIGHTS_LIST_SECOND_RESPONSE",
    (data) => ({ payload: data })
  );
  export const getUserRightListThirdResponse = createAction(
    "USER_RIGHTS_LIST_THIRD_RESPONSE",
    (data) => 
      ({ payload: data })
  );
export const getUserRightListSecond = createAction(
  "USER_RIGHTS_LIST_SECOND",
  (data) => ({ payload: data })
);
export const getUserRightListThird = createAction(
  "USER_RIGHTS_LIST_THIRD",
  (data) => ({ payload: data })
);
export const getUserFilterList = createAction("USER_FILTER_LIST");
export const getUserRightListResponse = createAction(
  "USER_RIGHTS_LIST_RESPONSE",
  (data) => ({
      payload: data,
    })
);
export const setSelectedMenu = createAction("SELECTED_MENU", (data) => ({
  payload: data,
}));

export const selectedMenuResponse = createAction(
  "SELECTED_MENU_RESPONSE",
  (data) => ({
    payload: data,
  })
);

export const setSelectedSubMenu = createAction("SELECTED_SUB_MENU", (data) => ({
  payload: data,
}));

export const selectedSubMenuResponse = createAction(
  "SELECTED_SUB_MENU_RESPONSE",
  (data) => ({
    payload: data,
  })
);

export const getUserFilterListSuccess = createAction(
  "USER_FILTER_LIST_SUCCESS",
  (data) => ({
    payload: data,
  })
);
