import React from "react";
import {  useSelector } from "react-redux";
import { Redirect, Route, Switch,} from "react-router-dom";
import AccountsMaster from "../pages/Master/Accounts_Master/index";
import ComboMLFBIndex from "../pages/Master/combomlfb";
import ConfigurationMaster from "../pages/Master/Configuration";
import EmployeeIndex from "../pages/Master/employee";
import GodownIndex from "../pages/Master/godown";
import ItemGroupIndex from "../pages/Master/item Group";
import MaterialCodeIndex from "../pages/Master/Material Code";
import ProductMasterIndex from "../pages/Master/Product";
import UserRightList from "../pages/Master/user rights/browse";

const Masters = () => {
  const componentValue = {
    15: (
      <Route path="/masters/1/account-master/9/customer/15" exact>
        <AccountsMaster accountType="Customer" browse_id={1} />
      </Route>
    ),
    16: (
      <Route path="/masters/1/account-master/9/supplier/16" exact>
        {""}
        <AccountsMaster accountType="Supplier" browse_id={2} />
      </Route>
    ),

    12: (
      <Route
        path="/masters/1/configuration-master/12"
        exact
        component={ConfigurationMaster}
      />
    ),

    17: (
      <Route path="/masters/1/product-master/10/sl/17" strict>
        <ProductMasterIndex siemens={"Siemens"} browse_id={3} />
      </Route>
    ),
    18: (
      <Route path="/masters/1/product-master/10/non-sl/18" strict>
        {""}
        <ProductMasterIndex siemens={"Non-Siemens"} browse_id={4} />
      </Route>
    ),
    19: (
      <Route path="/masters/1/material-code/13/customer/19" exact>
        <MaterialCodeIndex type={"Customer"} browse_id={"5"} />
      </Route>
    ),

    20: (
      <Route path="/masters/1/material-code/13/supplier/20" exact>
        {""}
        <MaterialCodeIndex type={"Supplier"} browse_id={"6"} />
      </Route>
    ),
    // <Route
    //   path="/masters/item-group-master"
    //   exact
    //   component={ItemGroupIndex}
    // />
    // <Route path="/masters/combined-mlfb" exact component={ComboMLFBIndex} />

    // <Route path="/masters/godown-master" exact component={GodownIndex} />
    // <Route
    //   path="/masters/1/user-right/14"
    //   exact
    //   component={UserRightList}
    // />
    21: (
      <Route
        path="/masters/1/employee-master/11/employee/21"
        exact
        component={EmployeeIndex}
      />
    ),
    22: (
      <Route
        path="/masters/1/employee-master/11/user-rights/22"
        exact
        component={UserRightList}
      />
    ),
  };
  const selectedSubMenu = window.location.pathname
    .split("/")
    .filter((val) => val !== "")[2];
  const menuLength = window.location.pathname.split("/").length;
  const userRight = useSelector((state) => state.common.userRightResponse);
  return (
    <div className="">
      {/* {thirdMenu.status===200&& */}
      <Switch>
        {userRight?componentValue[userRight.transaction_id]:""}
        {/* {(menuLength<=3||selectedSubMenu==="account-master")&&<Redirect to="/masters/1/account-master/9/customer/15" from="/masters" />}  */}
        {/* {selectedSubMenu === "account-master" && (
          <Redirect
            to="/masters/1/account-master/9/customer/15"
            from="/masters"
          />
        )}
        {selectedSubMenu === "product-master" && (
          <Redirect to="/masters/1/product-master/10/sl/17" from="/masters" />
        )}
        {selectedSubMenu === "employee-master" && (
          <Redirect
            to="/masters/1/employee-master/11/employee/21"
            from="/masters"
          />
        )}
        {selectedSubMenu === "configuration-master" && (
          <Redirect to="/masters/1/configuration-master/12" from="/masters" />
        )}
        {selectedSubMenu === "material-code" && (
          <Redirect
            to="/masters/1/material-code/13/customer/19"
            from="/masters"
          />
        )}
        {selectedSubMenu === "user-right" && (
          <Redirect to="/masters/1/user-right/14" from="/masters" />
        )} */}
      </Switch>
      {/* } */}
    </div>
  );
};
export default Masters;
