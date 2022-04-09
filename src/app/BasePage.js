import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import Education from "./pages/education/index";
import Compatition from "./pages/Compatitions";
import Bonus from "./pages/bonus";
import Content from "./pages/content/index";
import ChangeList from "./pages/changeList/index";

// import UpdateBonus from "./pages/bonus/bonusUpdate/index";
import Orders from "./pages/order/index";

import Notify from "./pages/notify";
// import NewCompatitions from "./pages/Compatitions/newCompatitions";
import Clubmember from "./pages/clubmember";
import Stock from "./pages/clubmember/selectStock";
import IpoList from "./pages/ipoList";
import { Gift } from "./pages/gift";
import Connect from "./pages/connect";
import Stocks from "./pages/stocks/index";
import CreaditPerson from "./pages/CreaditPerson/index";
import { Static } from "./pages/static/index";

import Dashboard from "./pages/dashboard";
import FormManager from "./pages/formManager/index";
import { Payments } from "./pages/payments/index";
import HADAFHAFEZ from "./pages/signalHafez/index";
import LivenessAuthentication from "./pages/authenticationLiveness";
import Lottery from "./pages/lottery";
import Feedback from "./pages/feedback/index";
import Permitions from "./pages/permition/permition/index";

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/" exact component={DashboardPage} />
        <ContentRoute path="/Compatitions" component={Compatition} />
        <ContentRoute path="/education" component={Education} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/bonus" component={Bonus} />
        <ContentRoute path="/gift" component={Gift} />
        <ContentRoute path="/stocks" component={Stocks} />
        <ContentRoute path="/static" component={Static} />
        <ContentRoute path="/order" component={Orders} />
        <ContentRoute path="/notify" component={Notify} />
        <ContentRoute path="/clubmember" component={Clubmember} />
        <ContentRoute path="/stock/select" component={Stock} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/creaditPerson" component={CreaditPerson} />
        <Route path="/user-profile" component={UserProfilepage} />

        <ContentRoute path="/ipoList" component={IpoList} />
        <ContentRoute path="/feedback" component={Feedback} />
        <ContentRoute path="/connect" component={Connect} />
        <ContentRoute path="/content" component={Content} />
        <ContentRoute path="/dashboard" component={Dashboard} />
        <ContentRoute path="/formManger" component={FormManager} />
        <ContentRoute path="/changeList" component={ChangeList} />
        <ContentRoute path="/payments" component={Payments} />
        <ContentRoute path="/HADAFHAFEZ" component={HADAFHAFEZ} />
        <ContentRoute path="/Lottery" component={Lottery} />
        <ContentRoute path="/permitions" component={Permitions} />
        <ContentRoute
          path="/AuthenticationLiveness"
          component={LivenessAuthentication}
        />

        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
