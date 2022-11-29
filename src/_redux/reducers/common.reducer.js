import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions/common.action";

const initialState = {
    userRightList:[],
    menuId:null,
    subMenuId:null,
    filterList:null
}

export const commonReducer = createReducer(initialState, {
    [actions.getUserRightListResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.userRightList = action.payload;
    }),
    [actions.selectedMenuResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.menuId = action.payload;
    }),
    [actions.selectedSubMenuResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.subMenuId = action.payload;
    }),
    [actions.getUserFilterList.toString()]: (state, action) =>
        produce (state, (draft) => {}),
    [actions.getUserFilterListSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.filterList = action.payload;
    }),
});