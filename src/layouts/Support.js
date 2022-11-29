import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import SupportTicketIndex from "../pages/support/ticket";
import SupportTicketApprovalIndex from "../pages/support/ticketApproval";
import SupportTicketCommercialIndex from "../pages/support/ticketCommercial";

const Support = () => {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/support/ticket" component={SupportTicketIndex} />
        <Route
          exact
          path="/support/ticket-approval"
          component={SupportTicketApprovalIndex}
        />
        <Route
          exact
          path="/support/ticket-commercial"
          component={SupportTicketCommercialIndex}
        />

        <Redirect from="/support" to="/support/ticket" />
      </Switch>
    </div>
  );
};

export default Support;
