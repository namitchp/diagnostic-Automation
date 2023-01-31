import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../../actions/masters/product.action";

const initialState = {
    isLoading:false,
    productList:null,
    categoryList:null,
    dropdownTech:null,
    ggNameList:null
}


export const ProductMasterReducer = createReducer(initialState, {
    [actions.getProductListBrowse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.getProductListBrowseSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.productList = action.payload;
            draft.isLoading = false;
    }),
    [actions.getCategoryList.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.getCategoryListSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.categoryList = action.payload;
            draft.isLoading = false;
    }),
    [actions.dropdownTechInformation.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.dropdownTechInformationSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = false;
            draft.dropdownTech = action.payload;
    }),
    [actions.getGGNameList.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.getGGNameListSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = false;
            draft.ggNameList = action.payload;
    }),
    [actions.updateProductVerifiedStatus.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.updateProductVerifiedStatusSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.ggNameList = action.payload;
            draft.isLoading = false;
    }),
    [actions.updateProductListPrice.toString()]: (state, action) =>
        produce (state, (draft) => {
            // draft.isLoading = true;
    }),
    [actions.updateProductLPRef.toString()]: (state, action) =>
        produce (state, (draft) => {
            // draft.isLoading = true;
    }),
    [actions.updateProductMovingNonMoving.toString()]: (state, action) =>
        produce (state, (draft) => {
            // draft.isLoading = true;
    })
}); 