import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import CustomBreadcrumb from "../components/breadcrumbs";
import Header from "../components/header";
import RouteWithSubRoutes from "../components/RouteWithSubRoutes";
import Sidebar from "../components/sidebar";
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

  const [subMenuList, setSubMenuList] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    main: null,
    subMenu: null,
  });

  useEffect(() => {
    dispatch(getUserRightList());
    // dispatch(getUserFilterList());
  }, []);

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  useEffect(() => {
    if (getuserRightListResponse?.length > 0) {
      const groupedMenu = groupBy(getuserRightListResponse, "group_name");

      setUserRightList(getuserRightListResponse);
    }
  }, [getuserRightListResponse]);

  const handleMenuChange = (id) => {
    var tempMenuIndex = userRightListArr.findIndex((x) => x.menu_id === id);
    if (tempMenuIndex > -1) {
      setSubMenuList(userRightListArr[tempMenuIndex].transaction_lst);
    }
  };

  return (
    <div className="main-frame">
      <Header onHeaderClick={() => setShowSidebar(!showSideBar)} />
      <div className="mt-5">
        <CustomBreadcrumb />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Redirect from="/" to="/dashboard" />
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
