import React from "react";
import { Route, Switch } from "react-router-dom";
import { StockManagementModule } from "../../modules/stocks/stockManagement";
import StockCash from "../stocks/stockCash/index";
import StockDataManagement from "../stocks/stockDataManagement/index";
const index = () => {
  return (
    <>
      <Switch>
        <Route path="/stocks/stockManagement">
          <StockManagementModule />
        </Route>
        <Route path="/stocks/stockCash">
          <StockCash />
        </Route>
        <Route path="/stocks/stockDataManagement">
          <StockDataManagement />
        </Route>
      </Switch>
    </>
  );
};

export default index;
