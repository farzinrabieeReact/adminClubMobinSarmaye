import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Signals from "./signals/index";
import SubscriptionPlans from "./SubscriptionPlans";
import MemberSubscriptions from "./memberSubscriptions";

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/HADAFHAFEZ/signals"}>
          <Signals />
        </Route>
        <Route path={"/HADAFHAFEZ/subscriptionPlans"}>
          <SubscriptionPlans />
        </Route>
        <Route path={"/HADAFHAFEZ/memberSubscriptions"}>
          <MemberSubscriptions />
        </Route>
        <Redirect exact from="/HADAFHAFEZ" to="/HADAFHAFEZ/signals" />
      </Switch>
    </>
  );
};

export default Index;
