import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import AttendanceBrowse from "../pages/Profile/attendance";
import ChangePassword from "../pages/Profile/changePassword";
import Profile from "../pages/Profile/profile";

const ProfileLayout = () => {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/profile/profile" component={Profile} />
        <Route
          exact
          path="/profile/change-password"
          component={ChangePassword}
        />
        <Route exact path="/profile/attendance" component={AttendanceBrowse} />

        <Redirect from="/profile" to="/profile/profile" />
      </Switch>
    </div>
  );
};

export default ProfileLayout;
