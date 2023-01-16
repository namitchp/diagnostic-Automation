import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import AccountsMaster from "../pages/Master/Accounts_Master/index";
import ComboMLFBIndex from "../pages/Master/combomlfb";
import ConfigurationMaster from "../pages/Master/Configuration";
import EmployeeIndex from "../pages/Master/employee";
import GodownIndex from "../pages/Master/godown";
import ItemGroupIndex from "../pages/Master/item Group";
import MaterialCodeIndex from "../pages/Master/Material Code";
import ProductMasterIndex from "../pages/Master/Product";
import UserRightList from "../pages/Master/user rights/browse";
import { getAccountMasterFiltersList } from "../_redux/actions/masters/account.action";
const Masters = () => {
  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(getAccountMasterFiltersList());
  // },[])
  const [menuList, setmenuList] = useState({
    firstMenu: [],
    secondMenu: [],
    thirdMenu: [],
  });
  const selectedSubMenu = window.location.pathname
    .split("/")
    .filter((val) => val !== "")[2];
  const menuLength = window.location.pathname.split("/").length;
  console.log(menuLength)
  // const firstMenu = useSelector((state) => state.common.userRightList);
  // const secondMenu = useSelector((state) => state.common.userRightListSecond);
  // const thirdMenu = useSelector((state) => state.common.userRightListThird);
  // useEffect(() => {
  //   setmenuList({
  //     firstMenu: firstMenu.data,
  //     secondMenu: secondMenu.data,
  //     thirdMenu: thirdMenu.data,
  //   });
  // }, [firstMenu, secondMenu, thirdMenu]);

  // const [data]=firstMenu.data.map((val)=>{return `${val.display_name.toLowerCase()}/${btoa(val.transaction_id)}`})
  // console.log(data)
  // console.log(...firstMenu.data.map((val)=>{return `${val.transaction_name.toLowerCase()}/${btoa(val.transaction_id)}`})+"/")
  // console.log(...secondMenu.data.map((val)=>{return `${val.transaction_name.toLowerCase()}/${btoa(val.transaction_id)}`}))
  // console.log(thirdMenu.data.map((val)=>{return `${val.transaction_name.toLowerCase()}/${btoa(val.transaction_id)}`}))
  // console.log(atob("OQ=="))
  return (
    <div className="container-fluid">
      {/* {thirdMenu.status===200&& */}
      <Switch>
        <Route path="/masters/1/account-master/9/customer/15" strict>
          <AccountsMaster accountType="Customer" browse_id={1}/>
        </Route>
        <Route path="/masters/1/account-master/9/supplier/16" strict>
          {" "}
          <AccountsMaster accountType="Supplier"browse_id={2} />
        </Route>
        <Route
          path="/masters/1/configuration-master/12"
          exact
          component={ConfigurationMaster}
        />
        <Route
          path="/masters/1/product-master/10/sl/17"
          exact
          component={ProductMasterIndex}
        />
        <Route
          path="/masters/1/product-master/10/non-sl/18"
          exact
          component={ProductMasterIndex}
        />
        <Route
          path="/masters/1/material-code/13/customer/19"
          exact
          component={MaterialCodeIndex}
        />
        <Route
          path="/masters/1/material-code/13/supplier/20"
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
        <Route path="/masters/1/user-right/14" exact component={UserRightList} />
        <Route
          path="/masters/1/employee-master/11/employee/21"
          exact
          component={EmployeeIndex}
        />
        <Route
          path="/masters/1/employee-master/11/user-rights/22"
          exact
          component={UserRightList}
        />
        {/* {(menuLength<=3||selectedSubMenu==="account-master")&&<Redirect to="/masters/1/account-master/9/customer/15" from="/masters" />}  */}
        {(selectedSubMenu==="account-master")&&<Redirect to="/masters/1/account-master/9/customer/15" from="/masters" />} 
       {selectedSubMenu==="product-master"&&<Redirect to="/masters/1/product-master/10/sl/17" from="/masters" />} 
       {selectedSubMenu==="employee-master"&&<Redirect to="/masters/1/employee-master/11/employee/21" from="/masters" />} 
       {selectedSubMenu==="configuration-master"&&<Redirect to="/masters/1/configuration-master/12" from="/masters" />} 
       {selectedSubMenu==="material-code"&&<Redirect to="/masters/1/material-code/13/customer/19" from="/masters" />} 
       {selectedSubMenu==="user-right"&&<Redirect to="/masters/1/user-right/14" from="/masters" />} 
      </Switch>
      {/* } */}
    </div>
  );
};
export default Masters;
