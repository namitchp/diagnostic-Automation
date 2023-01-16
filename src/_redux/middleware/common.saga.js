import { put, takeLatest } from "redux-saga/effects";
import { getUserRightList , getUserRightListResponse, setSelectedMenu, 
    selectedMenuResponse, setSelectedSubMenu, selectedSubMenuResponse, getUserFilterListSuccess,
     getUserFilterList, getUserRightListSecond, getUserRightListThird, getUserRightListSecondResponse,
      getUserRightListThirdResponse, 
      getFilterData,
      getFilterDataResponse,
      updateFilterData,
      updateFilterDataResponse} from '../actions/common.action';
import { CommonController } from "../controller/common.controller";

function* updateFilterDataSaga(action){
    try {   
      const updateFilterData=  yield CommonController.updateFilterData(action.payload);
        yield put(updateFilterDataResponse(updateFilterData));
    } catch (error) {
        yield null;
        yield put(updateFilterDataResponse(error));
    }
}
function* getfilterDataSaga(action){
    try {   
      const filterData=  yield CommonController.getFilterData(action.payload);
        yield put(getFilterDataResponse(filterData));
    } catch (error) {
        yield null;
        yield put(getFilterDataResponse(error));
    }
}
function* fetchUserRightListSecond(action){
    try {   
      const second=  yield CommonController.getUserRightsListSecond(action.payload);
        yield put(getUserRightListSecondResponse(second));
    } catch (error) {
        yield null;
        yield put(getUserRightListSecondResponse(error));
    }
}

function* fetchUserRightListThird(action){
    try {   
     const third=yield CommonController.getUserRightsListThird(action.payload);
     yield put(getUserRightListThirdResponse(third));
    } catch (error) {
        yield null;
        yield put(getUserRightListThirdResponse(error));
    }
}
function* fetchUserRightListSaga () {

    try {   
        const _checkUserCred = yield CommonController.getUserRightsList();
        yield put(getUserRightListResponse(_checkUserCred));
    } catch (error) {
        yield null;
        yield put(getUserRightListResponse(error));
    }
}

function* setSelectedMenuSaga (action) {
    try {
        yield put(selectedMenuResponse(action.payload));
    } catch (error) {
        yield null;
        yield put(selectedMenuResponse(error));
    }
}

function* setSelectedSubMenuSaga (action) {
    try {
        yield put(selectedSubMenuResponse(action.payload));
    } catch (error) {
        yield null;
        yield put(selectedSubMenuResponse(error));
    }
}

function* getCurrentUserFiltersSaga (action) {
    try {
        const response = yield CommonController.getUserFilterList();
        yield put(getUserFilterListSuccess(response));
    } catch (error) {
        yield null;
        yield put(getUserFilterListSuccess(error));
    }
}
export default function* CommonSaga () {
    try {
        yield takeLatest(updateFilterData, updateFilterDataSaga);
        yield takeLatest(getFilterData, getfilterDataSaga);
        yield takeLatest(getUserRightList, fetchUserRightListSaga);
        yield takeLatest(getUserRightListSecond, fetchUserRightListSecond);
        yield takeLatest(getUserRightListThird, fetchUserRightListThird);
        yield takeLatest(setSelectedMenu, setSelectedMenuSaga);
        yield takeLatest(setSelectedSubMenu, setSelectedSubMenuSaga);
        yield takeLatest(getUserFilterList, getCurrentUserFiltersSaga);
    }
    catch(e){
        yield null;
    }
}