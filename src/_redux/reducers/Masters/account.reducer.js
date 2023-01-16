import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";

import * as actions from "../../actions/masters/account.action";

const initialState = {
  isLoading: false,
  searchAccountMasterData:[],
  accountFilterList:null,
  selectedAccountDetails: null,
};
export const AccountMasterReducer = createReducer(initialState, {
  [actions.searchAccountMasterData.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  [actions.searchAccountMasterDataSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.searchAccountMasterData = action.payload;
      draft.isLoading = false;
    }),
  [actions.getAccountMasterFiltersList.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  [actions.getAccountMasterFiltersListSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.accountFilterList = action.payload;
      draft.isLoading = false;
    }),
  [actions.previewSelectedAccount.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.isLoading = true;
    }),
  [actions.previewSelectedAccountSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.selectedAccountDetails = action.payload;
      draft.isLoading = false;
    }),
  [actions.clearSelectedAccount.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.selectedAccountDetails = null;
    }),
  [actions.setAccountHide.toString()]: (state, action) =>
    produce(state, (draft) => {}),
  [actions.setAccountVerified.toString()]: (state, action) =>
    produce(state, (draft) => {}),
});
