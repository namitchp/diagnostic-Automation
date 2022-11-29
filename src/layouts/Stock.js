import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import ItemLedgerBrowse from "../pages/Stock/itemLedgerBrowse";
import SerialLedgerBrowse from "../pages/Stock/serialLedgerBrowse";

import StockBrowse from "../pages/Stock/stockBrowse";

const Stock = () => {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/stock/stock-report" component={StockBrowse} />
        <Route exact path="/stock/item-ledger" component={ItemLedgerBrowse} />
        <Route
          exact
          path="/stock/serial-no-traking"
          component={SerialLedgerBrowse}
        />

        <Redirect from="/stock" to="/stock/stock" />
      </Switch>
    </div>
  );
};

export default Stock;
