import React from "react";
import { Route, Switch } from "react-router-dom";
import ContactUs from "./contactUs/index";
import Marketer from "./marketer";
import WorkWithUs from "./workWithUs";

const Index = () => {
  return (
    <Switch>
      <Route exact path={"/formManger/contactUs"}>
        <ContactUs />
      </Route>
      <Route exact path={"/formManger/marketer"}>
        <Marketer />
      </Route>
      <Route exact path={"/formManger/workWithUS"}>
        <WorkWithUs />
      </Route>
    </Switch>
  );
};

export default Index;
