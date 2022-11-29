import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../../actions/masters/configuration.action";

const initialState = {
    isLoading:false,
    groupList:null,
    groupInfo:null,
    groupResponse:null,
    pincodeList:null,
    pincodeInfo:null,
    pincodeResponse:null
   
}


export const ConfigurationMasterReducer = createReducer(initialState, {
    [actions.getAccountGroupBrowse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.getAccountGroupBrowseSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupList = action.payload;
            draft.isLoading = false;
    }),
    [actions.selectedConfigGroup.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupInfo = action.payload;
    }),
    [actions.clearSelectedConfigGroup.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupInfo = null;
    }),
    [actions.updateAccountGroupInfo.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.updateAccountGroupInfoSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupResponse = action.payload;
            draft.isLoading = false;
    }),
    [actions.clearAccountGroupInfoResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupResponse = null;
    }),
    [actions.getPincodeBrowseList.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.getPincodeBrowseListSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeList = action.payload;
            draft.isLoading = false;
    }),
    [actions.clearSelectedConfigGroup.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.groupInfo = null;
    }),
    [actions.selectedPincodeInfo.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeInfo = action.payload;
    }),
    [actions.updatePincodeInfo.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.updateAccountGroupInfoSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeResponse = action.payload;
            draft.isLoading = false;
    }),
    [actions.clearSelectedPincode.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeInfo = null;
    }),
    [actions.clearPincodeInfoResponse.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeResponse = null;
    }),
    [actions.deleteSelectedPincode.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.isLoading = true;
    }),
    [actions.deleteSelectedPincodeSuccess.toString()]: (state, action) =>
        produce (state, (draft) => {
            draft.pincodeResponse = action.payload;
            draft.isLoading = false;
    }),
    
}); 