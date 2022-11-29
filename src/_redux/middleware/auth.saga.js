import { put, takeLatest } from "redux-saga/effects";
import { checkAuthCred , requestStatus , checkAuthCredResponse, checkAuthOTP , checkAuthOTPResponse, getDecryptUserIdResponse, getDecryptUserId } from '../actions/auth.action';
import { AuthController } from "../controller/auth.controller";


function* CheckUserCredSaga (action) {
    try {   
        yield put(requestStatus(true));
        const _checkUserCred = yield AuthController.checkUserCred(action.payload);
        yield put(checkAuthCredResponse(_checkUserCred));
        yield put(requestStatus(false));
    } catch (error) {
        yield null;
        yield put(checkAuthCredResponse(error));
    }
}

function* CheckUserCredOTP (action) {
    try {
        const _checkUserOtp = yield AuthController.checkAuthOTP(action.payload);
        yield put(checkAuthOTPResponse(_checkUserOtp));
    } catch (error) {
        yield null;
        yield put(checkAuthOTPResponse(error));
    }
}

function* getDecryptUserIdSaga (action) {
    try {
        const decryptUserDetails = yield AuthController.getDecryptUserDetails(action.payload);
        yield put(getDecryptUserIdResponse(decryptUserDetails));
    } catch (error) {
        yield null;
        yield put(getDecryptUserIdResponse(error));
    }
}


export default function* AuthSaga () {
    try {
        yield takeLatest(checkAuthCred, CheckUserCredSaga);
        yield takeLatest(checkAuthOTP, CheckUserCredOTP);
        yield takeLatest(getDecryptUserId, getDecryptUserIdSaga);
    }
    catch(e){
        yield null;
    }
}