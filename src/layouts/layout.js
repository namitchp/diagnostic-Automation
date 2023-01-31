import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import CustomBreadcrumb from "../components/breadcrumbs";
import Header from "../components/header";
import RouteWithSubRoutes from "../components/RouteWithSubRoutes";
import routes from "../routes";
import {
  getUserFilterList,
  getUserRightList,
} from "../_redux/actions/common.action";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [showSideBar, setShowSidebar] = useState(false);
  const [pinSidebar, setPinSidebar] = useState(false);
  const [userRightListArr, setUserRightList] = useState([]);
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );
  return (
    <div className="main-frame">
      <Header onHeaderClick={() => setShowSidebar(!showSideBar)} />
      <div className="mt-1">
        {/* <CustomBreadcrumb /> */}
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          {/* <Redirect from="/" to="/dashboard" /> */}
        </Switch>
      </div>
      {/* <div className="container-fluid p-0">
        <div className="row">
          <div className={pinSidebar ? "col-md-2" : "sidebar-fixed"}>
            <Sidebar menuList={userRightListArr} show={showSideBar} />
          </div>
          <div className={pinSidebar ? "col-md-10" : "col-md-12"}>
            <Header onHeaderClick={() => setShowSidebar(!showSideBar)} />
            <CustomBreadcrumb />
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default MainLayout;

