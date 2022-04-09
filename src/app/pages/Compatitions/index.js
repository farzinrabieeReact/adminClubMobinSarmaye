import { Route, Switch } from "react-router-dom";
import React from "react";
import NewCompatition from "./newCompatitions";
import CompatitionList from "./CompatitionList"

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/Compatitions/NewCompatitions"}>
          <NewCompatition />
        </Route>
        <Route path={"/Compatitions/CompatitionsList"}>
          <CompatitionList/>
        </Route>
      </Switch>
    </>
  );
};

export default Index;
