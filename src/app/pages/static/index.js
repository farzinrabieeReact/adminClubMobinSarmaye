import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Accounts from './accounts';
import Systems from './systems'
// import JobOpportunity from './jobOpportunity'



export const Static = () => {
  return (
    <>
      <Switch>
        <Route path={"/static/accounts"}>
          <Accounts />
        </Route>
        <Route path={"/static/systems"}>
          <Systems />
        </Route>
        {/* <Route path={"/static/jobOpportunity"}>
          <JobOpportunity />
        </Route> */}
       
        <Redirect exact from="/static" to="/static/accounts" />
      </Switch>
    </>
  );
};


