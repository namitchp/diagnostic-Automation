import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AccountsMaster from "../pages/Master/Accounts_Master/index";
import ComboMLFBIndex from "../pages/Master/combomlfb";
import ConfigurationMaster from "../pages/Master/Configuration";
import EmployeeIndex from "../pages/Master/employee";
import GodownIndex from "../pages/Master/godown";
import ItemGroupIndex from "../pages/Master/item Group";
import MaterialCodeIndex from "../pages/Master/Material Code";
import ProductMasterIndex from "../pages/Master/Product";
import UserRightList from "../pages/Master/user rights/browse";
import Employe from "../pages/Master/user rights/browseEmoloye";

const Masters = () => {
  const selectedSubMenu = window.location.pathname;

  console.log(selectedSubMenu);
const menuLength = window.location.pathname.split("/").length;
const userRight = useSelector((state) => state.common.userRightResponse);
const getredirectMenu = useSelector((state) => state.common.redirectMenu);



  const componentValue = {
    15: (
      <Switch>
        <Route path="/masters/1/account-master/9/customer/15" exact>
          <AccountsMaster accountType="Customer" browse_id={1} />
        </Route>
        <Redirect
          to="/masters/1/account-master/9/customer/15"
          from={selectedSubMenu}
        />
      </Switch>
    ),
    16: (
      <Switch>
 <Route path="/masters/1/account-master/9/supplier/16" exact>
        {""}
        <AccountsMaster accountType="Supplier" browse_id={2} />
      </Route>
      <Redirect
          to="/masters/1/account-master/9/supplier/16"
          from={selectedSubMenu}
        />
      </Switch>
     
    ),

    12: (
      <Switch>
         <Route
        path="/masters/1/configuration-master/12"
        exact
        component={ConfigurationMaster}
      />
        <Redirect
          to="/masters/1/configuration-master/12"
          from="/masters/1"
        />
      </Switch>
     
    ),

    17: (
      <Switch>
          <Route path="/masters/1/product-master/10/sl/17" strict>
        <ProductMasterIndex siemens={"Siemens"} browse_id={3} />
      </Route>
        <Redirect
          to="/masters/1/product-master/10/sl/17"
          from="/masters/1"
        />

      </Switch>
    
    ),
    18: (
      <Switch>
         <Route path="/masters/1/product-master/10/non-sl/18" strict>
        {""}
        <ProductMasterIndex siemens={"Non-Siemens"} browse_id={4} />
      </Route>
        <Redirect
          to="/masters/1/product-master/10/non-sl/18"
          from="/masters/1"
        />
      </Switch>
     
    ),
    19: (
      <Switch>
         <Route path="/masters/1/material-code/13/customer/19" exact>
        <MaterialCodeIndex type={"Customer"} browse_id={"5"} />
      </Route>
        <Redirect
          to="/masters/1/material-code/13/customer/19"
          from="/masters/1"
        />
      </Switch>
     
    ),

    20: (
      <Switch>
        <Route path="/masters/1/material-code/13/supplier/20" exact>
        {""}
        <MaterialCodeIndex type={"Supplier"} browse_id={"6"} />
      </Route>
        <Redirect
          to="/masters/1/material-code/13/supplier/20"
          from="/masters/1"
        />
      </Switch>
      
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
      <Switch>
           <Route
        path="/masters/1/employee-master/11/employee/21"
        exact
        component={EmployeeIndex}
      />
        <Redirect
          to="/masters/1/employee-master/11/employee/21"
          from="/masters/1"
        />
      </Switch>
   
    ),
    22: (
      <Switch>
           <Route
        path="/masters/1/employee-master/11/user-rights/22"
        exact
        component={UserRightList}
      />
        <Redirect
          to="/masters/1/employee-master/11/user-rights/22"
          from="/masters/1"
        />
      </Switch>
   
    ),
    146: (
      <Route
        path="/masters/1/employee-master/11/menu-rights/146"
        exact
        component={Employe}
      />
    ),
  };
  return (
    <div className="">
      {/* {thirdMenu.status===200&& */}
      {/* <Switch> */}
      {userRight ? componentValue[userRight.transaction_id] : ""}

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
      {/* </Switch> */}
      {/* } */}

    </div>
  );
};
export default Masters;
