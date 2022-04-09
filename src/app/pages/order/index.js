import React from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "./Orders";
import NewOrders from "./../../modules/orders/selectOrders/index";
import StepByStepDiscount from "./../../modules/orders/selectStepByStepDiscount";
import AutomationLog from "./automationLog/index";

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/order/orders"}>
          <Orders />
        </Route>
        <Route path={"/order/Order"}>
          <NewOrders />
        </Route>
        <Route path={"/order/stepByStepDiscount"}>
          <StepByStepDiscount />
        </Route>
        <Route path={"/order/automationLog"}>
          <AutomationLog />
        </Route>
      </Switch>
    </>
  );
};

export default Index;
