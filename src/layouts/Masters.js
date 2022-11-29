import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AccountsMaster from "../pages/Master/Accounts_Master/index";
import ComboMLFBIndex from "../pages/Master/combomlfb";
import ConfigurationMaster from "../pages/Master/Configuration";
import EmployeeIndex from "../pages/Master/employee";
import GodownIndex from "../pages/Master/godown";
import GodownBrowse from "../pages/Master/godown/browse";
import ItemGroupIndex from "../pages/Master/item Group";
import MaterialCodeIndex from "../pages/Master/Material Code";
import ProductMasterIndex from "../pages/Master/Product";
import UserRightList from "../pages/Master/user rights/browse";

const Masters = () => {
  const selectedSubMenu = window.location.pathname.split("/")[2];
  const menuLength=window.location.pathname.split('/').length;
  // console.log(window.location.pathname.split('/').length)
  
  return (
    <div className="container-fluid">
      <Switch>
        <Route
          path="/masters/account-master/customer"
          exact><AccountsMaster accountType="Customer"/></Route>
         <Route
          path="/masters/account-master/supplier"
          exact
       
        > <AccountsMaster accountType="Supplier"/></Route>
        <Route
          path="/masters/configuration-master"
          exact
          component={ConfigurationMaster}
        />
        <Route
          path="/masters/product-master/sl"
          exact
          component={ProductMasterIndex}
        />
         <Route
          path="/masters/product-master/non-sl"
          exact
          component={ProductMasterIndex}
        />
        <Route
          path="/masters/material-code/customer"
          exact
          component={MaterialCodeIndex}
        />
          <Route
          path="/masters/material-code/supplier"
          exact
          component={MaterialCodeIndex}
        />
        <Route
          path="/masters/item-group-master"
          exact
          component={ItemGroupIndex}
        />
        <Route path="/masters/combined-mlfb" exact component={ComboMLFBIndex} />
        <Route path="/masters/godown-master" exact component={GodownIndex} />
        <Route path="/masters/user-right" exact component={UserRightList} />
        <Route
          path="/masters/employee-master/employee"
          exact
          component={EmployeeIndex}
        />
         <Route
          path="/masters/employee-master/user-rights"
          exact
          component={EmployeeIndex}
        />
       {(menuLength<=2||selectedSubMenu==="account-master")&&<Redirect to="/masters/account-master/customer" from="/masters" />} 
       {selectedSubMenu==="product-master"&&<Redirect to="/masters/product-master/sl" from="/masters" />} 
       {selectedSubMenu==="employee-master"&&<Redirect to="/masters/employee-master/employee" from="/masters" />} 
       {selectedSubMenu==="configuration-master"&&<Redirect to="/masters/configuration-master" from="/masters" />} 
       {selectedSubMenu==="material-code"&&<Redirect to="/masters/material-code/customer" from="/masters" />} 
       {selectedSubMenu==="user-right"&&<Redirect to="/masters/user-right" from="/masters" />} 
      </Switch>
    </div>
  );
};

export default Masters;
