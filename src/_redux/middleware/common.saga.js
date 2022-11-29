import { put, takeLatest } from "redux-saga/effects";
import { getUserRightList , getUserRightListResponse, setSelectedMenu, selectedMenuResponse, setSelectedSubMenu, selectedSubMenuResponse, getUserFilterListSuccess, getUserFilterList } from '../actions/common.action';
import { CommonController } from "../controller/common.controller";


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
        yield takeLatest(getUserRightList, fetchUserRightListSaga);
        yield takeLatest(setSelectedMenu, setSelectedMenuSaga);
        yield takeLatest(setSelectedSubMenu, setSelectedSubMenuSaga);
        yield takeLatest(getUserFilterList, getCurrentUserFiltersSaga);
    }
    catch(e){
        yield null;
    }
}