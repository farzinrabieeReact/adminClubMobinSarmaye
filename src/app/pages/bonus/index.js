import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BonusSelect from "./bonusSelect/index";
import BonusUpdate from "./bonusUpdate/index";
import BonusAggregated from "./bonusAggregated/index";
import BonusComputing from "../../modules/bonus/bonusComputing/BonusComputing";
import BonusMangement from '../../modules/bonus/bonusMangement/index';

const Index = () => {
  return (
    <>
      <Switch>
        <Route path={"/bonus/select"}>
          <BonusSelect />
        </Route>
        <Route path={"/bonus/update"}>
          <BonusUpdate />
        </Route>
        <Route path={"/bonus/aggregated"}>
          <BonusAggregated />
        </Route>
        <Route path={"/bonus/bonusComputing"}>
          <BonusComputing />
        </Route>
        <Route path={"/bonus/bonusMangement"}>
          <BonusMangement />
        </Route>

        <Redirect exact from="/bonus" to="/bonus/select" />
      </Switch>
    </>
  );
};

export default Index;
