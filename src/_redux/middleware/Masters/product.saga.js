import { put, takeLatest } from "redux-saga/effects";
import { getCategoryList, getCategoryListSuccess, getGGNameList, getGGNameListSuccess, getLPRefList, getLPRefListSuccess, getProductListBrowse, getProductListBrowseSuccess, updateProductListPrice, updateProductListPriceSuccess, updateProductLPRef, updateProductMovingNonMoving, updateProductVerifiedStatus } from "../../actions/masters/product.action";
import { ProductMasterController } from "../../controller/Masters/product.controller";

function* getProductBrowseSaga (action) {
    try {   
        const listValue = yield ProductMasterController.getProductBrowse(action.payload.params, action.payload.filters);
        yield put(getProductListBrowseSuccess(listValue));
    } catch (error) {
        yield null;
        yield put(getProductListBrowseSuccess(error));
    }
}

function* getCategoryListSaga (action) {
    try {   
        const response = yield ProductMasterController.getCategoryList();
        yield put(getCategoryListSuccess(response));
    } catch (error) {
        yield null;
        yield put(getCategoryListSuccess(error));
    }
}

function* getLPRefListSaga (action) {
    try {   
        const response = yield ProductMasterController.getLPRefList();
        yield put(getLPRefListSuccess(response));
    } catch (error) {
        yield null;
        yield put(getLPRefListSuccess(error));
    }
}

function* getGGNameListSaga (action) {
    try {   
        const response = yield ProductMasterController.getGGNameList();
        yield put(getGGNameListSuccess(response));
    } catch (error) {
        yield null;
        yield put(getGGNameListSuccess(error));
    }
}

function* updateProductVerifiedStatusSaga (action) {
    try {   
        const response = yield ProductMasterController.updateProductVerifyStatus(action.payload.param);
        yield put(getGGNameListSuccess(response));
    } catch (error) {
        yield null;
        yield put(getGGNameListSuccess(error));
    }
}

function* updateProductListPriceSaga (action) {
    try {   
        const response = yield ProductMasterController.updateProductListPrice(action.payload.param);
        yield null;
    } catch (error) {
        yield null;
        // yield put(updateProductListPriceSuccess(error));
    }
}


function* updateProductLPRefSaga (action) {
    try {   
        const response = yield ProductMasterController.updateProductLpRef(action.payload.param);
        yield null;
    } catch (error) {
        yield null;
        // yield put(updateProductListPriceSuccess(error));
    }
}

function* updateProductMovingSaga (action) {
    try {   
        const response = yield ProductMasterController.updateProductMovingNonMoving(action.payload.param);
        yield null;
    } catch (error) {
        yield null;
        // yield put(updateProductListPriceSuccess(error));
    }
}


export default function* ProductMasterSaga () {
    try {
        yield takeLatest(getProductListBrowse, getProductBrowseSaga);
        yield takeLatest(getCategoryList, getCategoryListSaga);   
        yield takeLatest(getLPRefList, getLPRefListSaga);   
        yield takeLatest(getGGNameList, getGGNameListSaga);   
        yield takeLatest(updateProductVerifiedStatus, updateProductVerifiedStatusSaga);   
        yield takeLatest(updateProductListPrice, updateProductListPriceSaga);   
        yield takeLatest(updateProductLPRef, updateProductLPRefSaga);   
        yield takeLatest(updateProductMovingNonMoving, updateProductMovingSaga);   
    }
    catch(e){
        yield null;
    }
}