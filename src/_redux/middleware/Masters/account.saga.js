import { put, takeLatest } from "redux-saga/effects";
import { AccountMasterController } from "../../controller/Masters/account.controller";
import { getAccountMasterFiltersList, getAccountMasterFiltersListSuccess, previewSelectedAccount, previewSelectedAccountSuccess, searchAccountMasterData, searchAccountMasterDataSuccess, setAccountHide, setAccountVerified } from '../../actions/masters/account.action';
function* searchAccountMasterSaga (action) {
    try {   
        const browseAccountMaster = yield AccountMasterController.browseAccountData(action.payload.filters, action.payload.params);
        yield put(searchAccountMasterDataSuccess(browseAccountMaster));
    } catch (error) {
        yield null;
        yield put(searchAccountMasterDataSuccess(error));
    }
}
function* getAccountFilterSaga (action) {
    try {   
        const filterList = yield AccountMasterController.getAccountMasterFilters();
        yield put(getAccountMasterFiltersListSuccess(filterList));
    } catch (error) {
        yield null;
        yield put(getAccountMasterFiltersListSuccess(error));
    }
}
function* previewSelectedAccountSaga (action) {
    try {   
        const accountDetails = yield AccountMasterController.getSelectedAccountDetails(action.payload);
        yield put(previewSelectedAccountSuccess(accountDetails));
    } catch (error) {
        yield null;
        yield put(previewSelectedAccountSuccess(error));
    }
}
function* setAccountHideSaga (action) {
    try {   
        const accountEdit = yield AccountMasterController.accountHideUpdate(action.payload);
    } catch (error) {
        yield null;
        yield put(previewSelectedAccountSuccess(error));
    }
}
function* setAccountVerifiedSaga (action) {
    try {   
        const accountEdit = yield AccountMasterController.updateAccountVerified(action.payload);
        if(!accountEdit.valid){
            alert("something went wrong");
        }
    } catch (error) {
        yield null;
        yield put(previewSelectedAccountSuccess(error));
    }
}
export default function* AccountMasterSaga () {
    try {
        yield takeLatest(searchAccountMasterData, searchAccountMasterSaga);
        yield takeLatest(getAccountMasterFiltersList, getAccountFilterSaga);
        yield takeLatest(previewSelectedAccount, previewSelectedAccountSaga);
        yield takeLatest(setAccountHide, setAccountHideSaga);
        yield takeLatest(setAccountVerified, setAccountVerifiedSaga);
    }
    catch(e){
        yield null;
    }
}