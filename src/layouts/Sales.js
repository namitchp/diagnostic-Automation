import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import SalesIssueIndex from "../pages/Sales/issues";
import SalesMarketingIndex from "../pages/Sales/marketingVisit";
import SalesQuotationIndex from "../pages/Sales/quotation";
import SalesCostingIndex from "../pages/Sales/Sales Costing";
import SalesIndex from "../pages/Sales/Sales Enquiry";
import SalesSiDiIndex from "../pages/Sales/salesOrder/slDI";
import SalesSlSoPosIndex from "../pages/Sales/salesOrder/slSoPos";
import SalesSlSoPosSummariseIndex from "../pages/Sales/salesOrder/slSoPosSummarise";
import SoDetail from "../pages/Sales/salesOrder/soDetail";
import SalesSoAmdIndex from "../pages/Sales/soAmedment";
import { ErrorPage } from "../components/errorPage";
import { useSelector } from "react-redux";

const Sales = () => {
  const selectedSubMenu = window.location.pathname;
  const userRight = useSelector((state) => state.common.userRightResponse);
  const salesRoute = {
    23: <Route exact path="/sales/2/enquiry/23" component={SalesIndex} />,
    24: (
      <Route exact path="/sales/2/costing/24" component={SalesCostingIndex} />
    ),
    30:<Switch>
    <Route exact path="/sales/2/sales-order/26/so-details/30" component={SoDetail} />
    <Redirect
      to="/sales/2/sales-order/26/so-details/30"
      from={selectedSubMenu}
    />
  </Switch>,
  31:<Switch>
  <Route exact path="/sales/2/sales-order/26/sl-so-pos/31" component={SalesSlSoPosIndex} />
  <Redirect
    to="/sales/2/sales-order/26/sl-so-pos/31"
    from={selectedSubMenu}
  />
</Switch>,
  };
  return (
    <div className="container-fluid">
      <Switch>
      {userRight?salesRoute[userRight.transaction_id]:""}
        {/* <Route exact path="/sales/enquiry" component={SalesIndex} />
        <Route exact path="/sales/costing" component={SalesCostingIndex} />
        <Route exact path="/sales/quotation" component={SalesQuotationIndex} />
        <Route exact path="/sales/sales-order-amendment" component={SalesSoAmdIndex} />
        <Route exact path="/sales/marketing-visit" component={SalesMarketingIndex} />
        <Route exact path="/sales/issues" component={SalesIssueIndex} />
        <Route exact path="/sales/sales-order/so-details" component={SoDetail} />
        <Route exact path="/sales/sales-order/sl-so-pos" component={SalesSlSoPosIndex} />
        <Route exact path="/sales/sales-order/non-sl-so-pos" component={SalesSlSoPosIndex} />
        <Route exact path="/sales/sales-order/so-pos-summarize" component={SalesSlSoPosSummariseIndex} />
        <Route exact path="/sales/sales-order/sl-di" component={SalesSiDiIndex} />
        <Route exact path="/sales/sales-order/non-sl-di" component={SalesSiDiIndex} />
       
       {(menuLength<=2||selectedSubMenu==="enquiry")&& <Redirect from="/sales" to="/sales/enquiry" />}
       {(selectedSubMenu==="costing")&& <Redirect from="/sales" to="/sales/costing" />}
       {(selectedSubMenu==="quotation")&& <Redirect from="/sales" to="/sales/quotation" />}
       {(selectedSubMenu==="sales-order-amendment")&& <Redirect from="/sales" to="/sales/sales-order-amendment" />}
       {(selectedSubMenu==="marketing-visit")&& <Redirect from="/sales" to="/sales/marketing-visit" />}
       {(selectedSubMenu==="issues")&& <Redirect from="/sales" to="/sales/issues" />}
       {(selectedSubMenu==="sales-order")&& <Redirect from="/sales" to="/sales/sales-order/so-details" />} */}
      </Switch>
    </div>
  );
};

export default Sales;
