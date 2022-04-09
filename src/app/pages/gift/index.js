import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GiftSelect from "./selectGift";
import GiftInsert from "./insertGift";
import { RequestsGift } from "./requestsGift";
import GiftCashAggregated from "./selectCashAggregated";
import GiftAggregated from "./giftAggregated";
import Discount from "../../pages/gift/discountCode";
import GiftCash from "../../pages/gift/giftCash/index";

export const Gift = () => {
  return (
    <>
      <Switch>
        <Route path={"/gift/select"}>
          <GiftSelect />
        </Route>
        <Route path={"/gift/requests"}>
          <RequestsGift />
        </Route>
        <Route path={"/gift/insert"}>
          <GiftInsert />
        </Route>
        <Route path={"/gift/Aggregated"}>
          <GiftAggregated />
        </Route>
        <Route path={"/gift/CashAggregated"}>
          <GiftCashAggregated />
        </Route>
        <Route path={"/gift/dicountCode"}>
          <Discount />
        </Route>
        <Route path={"/gift/giftCash"}>
          <GiftCash />
        </Route>
        <Redirect exact from="/gift" to="/gift/select" />
      </Switch>
    </>
  );
};
