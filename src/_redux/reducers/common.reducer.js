import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions/common.action";
const initialState = {
  userRightResponse:null,
  updateFilterData:null,
  getFilterData:null,
  userRightListSecond:null,
  userRightListThird:null,
  userRightList:null,
  menuId: null,
  subMenuId: null,
  filterList: null,
};

export const commonReducer = createReducer(initialState, {
  [actions.userRight.toString()]:(state,action)=>
produce(state,draft=>{
  draft.userRightResponse=action.payload
}),
[actions.getFilterDataResponse.toString()]:(state,action)=>
produce(state,draft=>{
  draft.getFilterData=action.payload
})
,
[actions.updateFilterDataResponse.toString()]:(state,action)=>
produce(state,draft=>{
  draft.updateFilterData=action.payload
})
,

  [actions.getUserRightListSecondResponse.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.userRightListSecond = action.payload;
    }),
  [actions.getUserRightListThirdResponse.toString()]: (state, action) =>
  produce(state,(draft)=>{
    draft.userRightListThird=action.payload;
  })
  ,
  [actions.getUserRightListResponse.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.userRightList = action.payload;
    }),
  [actions.selectedMenuResponse.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.menuId = action.payload;
    }),
  [actions.selectedSubMenuResponse.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.subMenuId = action.payload;
    }),
  [actions.getUserFilterList.toString()]: (state, action) =>
    produce(state, (draft) => {}),
  [actions.getUserFilterListSuccess.toString()]: (state, action) =>
    produce(state, (draft) => {
      draft.filterList = action.payload;
    }),
});
