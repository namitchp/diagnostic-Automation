import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../../actions/masters/materialcode.action";

const initialState = {
  isLoading: false,
  browseListData: null,
  partyNameList: [],
  selectedMaterialId: null,
};

export const MaterialCodeMasterReducer = createReducer(initialState, {
  [actions.searchMaterialCodeData.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  [actions.searchMaterialCodeDataSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.browseListData = action.payload;
      draft.isLoading = false;
    }),
  [actions.searchPartyNameSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.partyNameList = action.payload;
    }),
  [actions.materialCodeEditId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.selectedMaterialId = action.payload;
    }),
  [actions.clearMaterialCodeEditId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.selectedMaterialId = null;
    }),
});
