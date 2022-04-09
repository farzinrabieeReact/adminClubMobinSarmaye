import React from "react";
import { Route, Switch } from "react-router-dom";
import Details from './details/index'
import Condition from './condition'

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/creaditPerson/details"}>
        <Details/>
        </Route>
        <Route path={"/creaditPerson/condition"}>
          <Condition/>
        </Route>
        
      </Switch>
    </>
  );
};

export default Index;
