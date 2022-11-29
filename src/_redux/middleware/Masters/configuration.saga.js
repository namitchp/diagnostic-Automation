import { put, takeLatest } from "redux-saga/effects";
import {  deleteSelectedPincode, deleteSelectedPincodeSuccess, getAccountGroupBrowse, getAccountGroupBrowseSuccess, getCategoryList, getCategoryListSuccess, getPincodeBrowseList, getPincodeBrowseListSuccess, updateAccountGroupInfo, updateAccountGroupInfoSuccess, updatePincodeInfo } from "../../actions/masters/configuration.action";

import { ConfigurationMasterController } from "../../controller/Masters/configuration.controller";

function* getAccountGroupBrowseSaga (action) {
    try {   
        const accountGroupList = yield ConfigurationMasterController.searchAccountGroupBrowse(action.payload.params);
        yield put(getAccountGroupBrowseSuccess(accountGroupList));
    } catch (error) {
        yield null;
        yield put(getAccountGroupBrowseSuccess(error));
    }
}

function* updateAccountGroupInfoSaga (action) {
    try {   
        const updateAccountInfo = yield ConfigurationMasterController.updateAccountGroupInfo(action.payload.params);
        yield put(updateAccountGroupInfoSuccess(updateAccountInfo));
    } catch (error) {
        yield null;
        yield put(updateAccountGroupInfoSuccess(error));
    }
}

function* getPincodeBrowseSaga (action) {
    try {   
        const pincodeList = yield ConfigurationMasterController.searchPincodeBrowse(action.payload.params);
        yield put(getPincodeBrowseListSuccess(pincodeList));
    } catch (error) {
        yield null;
        yield put(getPincodeBrowseListSuccess(error));
    }
}

function* updatePincodeInfoSaga (action) {
    try {   
        const updateAccountInfo = yield ConfigurationMasterController.updatePincodeInfo(action.payload.params);
        yield put(updateAccountGroupInfoSuccess(updateAccountInfo));
    } catch (error) {
        yield null;
        yield put(updateAccountGroupInfoSuccess(error));
    }
}

function* deletePincodeInfoSaga (action) {
    try {   
        const response = yield ConfigurationMasterController.deleteSelectedPincode(action.payload.params);
        yield put(deleteSelectedPincodeSuccess(response));
    } catch (error) {
        yield null;
        yield put(deleteSelectedPincodeSuccess(error));
    }
}



export default function* ConfigurationMasterSaga () {
    try {
        yield takeLatest(getAccountGroupBrowse, getAccountGroupBrowseSaga);
        yield takeLatest(updateAccountGroupInfo, updateAccountGroupInfoSaga);   
        yield takeLatest(getPincodeBrowseList, getPincodeBrowseSaga);   
        yield takeLatest(updatePincodeInfo, updatePincodeInfoSaga);   
        yield takeLatest(deleteSelectedPincode, deletePincodeInfoSaga);   

    }
    catch(e){
        yield null;
    }
}