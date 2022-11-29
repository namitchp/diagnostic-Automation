import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../../actions/masters/all.action";

const initialState = {
  comboMLFBId: null,
  godownId: null,
  itemGroupId: null,
  employeeId: null,
  productId: null,
  accountId: null,
};

export const AllReducers = createReducer(initialState, {
  [actions.selectedComboMLFBId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.comboMLFBId = action.payload;
    }),
  [actions.clearSelectedComboId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.comboMLFBId = null;
    }),
  [actions.selectedGodownId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.godownId = action.payload;
    }),
  [actions.clearSelectedGodownId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.godownId = null;
    }),
  [actions.selectedItemGroupId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.itemGroupId = action.payload;
    }),
  [actions.clearSelectedItemGroupId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.itemGroupId = null;
    }),
  [actions.selectedEmployeeId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.employeeId = action.payload;
    }),
  [actions.clearSelectedEmployeeId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.employeeId = null;
    }),
  [actions.selectedProductId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.productId = action.payload;
    }),
  [actions.clearSelectedProductId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.productId = null;
    }),
  [actions.selectedAccountId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.accountId = action.payload;
    }),
  [actions.clearSelectedAccountId.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.accountId = null;
    }),
});
