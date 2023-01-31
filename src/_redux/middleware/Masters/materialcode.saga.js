import { put, takeLatest } from "redux-saga/effects";
import {
  searchMaterialCodeData,
  searchMaterialCodeDataSuccess,
  searchPartyName,
  searchPartyNameSuccess,
} from "../../actions/masters/materialcode.action";
import { MaterialCodeMasterController } from "../../controller/Masters/materialcode.controller";

function* getMaterialCodeBrowseSaga(action) {
  try {
    const listValue = yield MaterialCodeMasterController.getMaterialCodeBrowse(
      action.payload.filters,
      action.payload.params
    );
    yield put(searchMaterialCodeDataSuccess(listValue));
  } catch (error) {
    yield null;
    yield put(searchMaterialCodeDataSuccess(error));
  }
}

function* getPartyNameListSaga(action) {
  try {
    const listValue = yield MaterialCodeMasterController.getPartyNameList(action.payload);
    yield put(searchPartyNameSuccess(listValue));
  } catch (error) {
    yield null;
    yield put(searchPartyNameSuccess(error));
  }
}

export default function* MaterialCodeMasterSaga() {
  try {
    yield takeLatest(searchMaterialCodeData, getMaterialCodeBrowseSaga);
    yield takeLatest(searchPartyName, getPartyNameListSaga);
  } catch (e) {
    yield null;
  }
}
