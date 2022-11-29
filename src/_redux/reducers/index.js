import { authReducer } from "./auth.reducer";
import { combineReducers } from "redux";
import { commonReducer } from "./common.reducer";
import { AccountMasterReducer } from "../reducers/Masters/account.reducer";
import { ConfigurationMasterReducer } from "./Masters/configuration.reducer";
import { ProductMasterReducer } from "./Masters/product.reducer";
import { MaterialCodeMasterReducer } from "./Masters/materialcode.reducer";
import { AllReducers } from "./Masters/all.reducer";

const createRootReducer = () =>
  combineReducers({
    auth: authReducer,
    common: commonReducer,
    AccountMaster: AccountMasterReducer,
    ConfigurationMaster: ConfigurationMasterReducer,
    ProductMaster: ProductMasterReducer,
    MaterialCodeMaster: MaterialCodeMasterReducer,
    AllReducersMaster: AllReducers,
  });

export default createRootReducer;
