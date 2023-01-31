import { createAction } from "@reduxjs/toolkit";

export const searchMaterialCodeData = createAction(
  "SEARCH_MATERIALCODE_MASTER_DATA",
  (filters, params) => ({
    payload: { filters, params },
  })
);

export const searchMaterialCodeDataSuccess = createAction(
  "SEARCH_MATERIALCODE_MASTER_DATA_SUCCESS",
  (data) => ({
    payload: data,
  })
);

export const searchPartyName = createAction(
  "SEARCH_PARTY_NAME_LIST",
  (filters) => ({
    payload:filters ,
  })
);

export const searchPartyNameSuccess = createAction(
  "SEARCH_PARTY_NAME_LIST_SUCCESS",
  (data) => ({
    payload: data,
  })
);

export const materialCodeEditId = createAction(
  "MATERIAL_CODE_EDIT_ID",
  (id) => ({
    payload: id,
  })
);

export const clearMaterialCodeEditId = createAction(
  "CLEAR_MATERIAL_CODE_EDIT_ID"
);
