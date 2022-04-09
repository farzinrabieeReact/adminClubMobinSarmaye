



import React from 'react';
import {Route, Switch } from "react-router-dom";
import Goverment from '../../modules/Goverments/index'
import Branches from './../../modules/branches';
import TelegramLink from '../../modules/Goverments/TelegramLink'





const Index = () => {
  
    return ( 
        <Switch>
            <Route exact path={"/connect/goverment"}>
                <Goverment/>
            </Route>
            <Route exact path={"/connect/branches"}>
                <Branches/>
            </Route>
            <Route exact path={"/connect/telegramLink"}>
                <TelegramLink/>
            </Route>
        </Switch>
     );
}
 
export default Index;