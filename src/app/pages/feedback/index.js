import React from "react";
import Feedback from "../../modules/feedback/feedback/Feedback";
import { Route, Switch } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/feedback/feedback"}>
          <Feedback />
        </Route>
      </Switch>
    </>
  );
};

export default Index;
