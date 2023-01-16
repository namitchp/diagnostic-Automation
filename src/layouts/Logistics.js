import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DCIndex from "../pages/DC";
import CcrInIndex from "../pages/logistics/ccr";
import CcrIndex from "../pages/logistics/ccr";
import CcrOutIndex from "../pages/logistics/ccr/ccrOut";
import CourierInIndex from "../pages/logistics/courier";
import CourierIndex from "../pages/logistics/courier";
import CourierOutIndex from "../pages/logistics/courier/courierOut";
import CourierInvoiceIndex from "../pages/logistics/courier/invoice";
// import DeliveryChallanIndex from "../pages/logistics/delivery-challan";
// import DeliveryChallanBrowse from "../pages/logistics/delivery-challan/browse";
import ChallanIndexMdc from "../pages/logistics/delivery-challan/mdc";
import SlWipIndex from "../pages/logistics/delivery-challan/slwip/index";
import ChallanIndex from "../pages/logistics/delivery-challan/index";
import JobWorkIndex from "../pages/logistics/job-work";
import JobWorkOutIndex from "../pages/logistics/job-work/jobWorkOut";
import MrnDcIndex from "../pages/logistics/material-receipt-note";
import MrnPoIndex from "../pages/logistics/material-receipt-note/mrn-po";
import ReturnableIndex from "../pages/logistics/returnable-gate-pass";
import RrgpIndex from "../pages/logistics/returnable-gate-pass/rrgp";
const Logistics = () => {
  const selectedSubMenu = window.location.pathname.split("/")[2];
  const menuLength=window.location.pathname.split('/').length;
  // console.log(window.location.pathname.split('/').length)
  // console.log(window.location.pathname.split('/'))
  

  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/logistics/out/sl-dc" exact ><ChallanIndex slType={"SL"}/></Route>
        <Route path="/logistics/out/non-sl-dc" exact><ChallanIndex slType={"Non SL"}/></Route>
        <Route path="/logistics/out/mdc" exact component={ChallanIndexMdc} />
        <Route path="/logistics/out/sl-wip"exact><SlWipIndex slType={"SL"}/></Route>
        <Route path="/logistics/out/non-sl-wip" exact><SlWipIndex slType={"Non SL"}/></Route>
        <Route path="/logistics/out/dc-packaging" exact component={DCIndex} />
        <Route path="/logistics/in/mrn-dc" exact component={MrnDcIndex} />
        <Route path="/logistics/in/mrn-po" exact component={MrnPoIndex} />
        <Route path="/logistics/in/mrn-wip" exact component={MrnDcIndex} />
        <Route path="/logistics/rgp/rgp" exact component={ReturnableIndex} />
        <Route path="/logistics/rgp/rrgp" exact component={RrgpIndex} />
        <Route path="/logistics/jw/jwin" exact component={JobWorkIndex} />
        <Route path="/logistics/jw/jwo" exact component={JobWorkOutIndex} />
        <Route path="/logistics/ccr/ccr-in" exact component={CcrInIndex} />
        <Route path="/logistics/ccr/ccr-out" exact component={CcrOutIndex} />
        <Route path="/logistics/courier/in" exact component={CourierInIndex} />
        <Route path="/logistics/courier/out" exact component={CourierOutIndex} />
        <Route path="/logistics/courier/invoice" exact component={CourierInvoiceIndex} />
        {/* <Route
          path="/logistics/delivery-challan"
          exact
          component={DeliveryChallanIndex}
        /> */}
        {(menuLength<=2||selectedSubMenu==="in")&&<Redirect to="/logistics/in/mrn-dc" from="/logistics" />}
        {selectedSubMenu==="out"&&<Redirect to="/logistics/out/sl-dc" from="/logistics" />}
        {selectedSubMenu==="rgp"&&<Redirect to="/logistics/rgp/rgp" from="/logistics" />}
        {selectedSubMenu==="jw"&&<Redirect to="/logistics/jw/jwin" from="/logistics" />}
        {selectedSubMenu==="ccr"&&<Redirect to="/logistics/ccr/ccr-in" from="/logistics" />}
        {selectedSubMenu==="courier"&&<Redirect to="/logistics/courier/in" from="/logistics" />}
      </Switch>
    </div>
  );
};
export default Logistics;
