import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import SelectLottery from './../../modules/lottery/selectLottery/index';





const IpoList = () => {
    return (
        <>
            <Switch>
                <Route exact path={"/lottery/select"}>
                    <SelectLottery />
                </Route>
                <Redirect to={'/lottery/select'} />
            </Switch>
        </>
    );
}

export default IpoList;
