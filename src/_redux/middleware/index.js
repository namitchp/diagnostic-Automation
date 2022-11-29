import AuthSaga from "../middleware/auth.saga";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import CommonSaga from "./common.saga";
import AccountMasterSaga from "./Masters/account.saga";
import ConfigurationMasterSaga from "./Masters/configuration.saga";
import ProductMasterSaga from "./Masters/product.saga";
import MaterialCodeMasterSaga from "./Masters/materialcode.saga";

export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga () {
    yield all([
        AuthSaga(),
        CommonSaga(),
        AccountMasterSaga(),
        ConfigurationMasterSaga(),
        ProductMasterSaga(),
        MaterialCodeMasterSaga()
    ]);
}
    