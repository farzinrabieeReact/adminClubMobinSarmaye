import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Payment from "./../../modules/payments";

export const Payments = () => {
  return (
    <>
      <Switch>
        <Route path={"/payments/select"}>
          <Payment />
        </Route>
        <Redirect exact from="/payments" to="/payments/select" />
      </Switch>
    </>
  );
};
