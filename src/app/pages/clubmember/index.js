import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import Orders from "./Orders";
import SelectClubmember from "./selectClubmember";
import SelectLoginList from "../../pages/clubmember/Loginlist/index";
import ChangeBroker from "./changeBroker";
import General from "../../modules/clubmember/generalStatistics";
import RequestCustomer from "../../modules/clubmember/requestCustomer/RequestCustomer";

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/clubmember/select"}>
          <SelectClubmember />
        </Route>
        <Route path={"/clubmember/requestCustomer"}>
          <RequestCustomer />
        </Route>
        <Route path={"/clubmember/loginlist"}>
          <SelectLoginList />
        </Route>
        <Route path={"/clubmember/changeBroker"}>
          <ChangeBroker />
        </Route>
        <Route path={"/clubmember/all"}>
          <General />
        </Route>

        <Redirect exact from="/clubmember" to="/clubmember/select" />
      </Switch>
    </>
  );
};

export default Index;
