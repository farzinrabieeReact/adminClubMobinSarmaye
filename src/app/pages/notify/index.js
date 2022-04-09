 import React from 'react'
import { Redirect , Route, Switch } from "react-router-dom";

import SelectNotify from './selectNotify/index';
import InsertNotify from './insertNotify/index';

export default function Index() {
    return (
        <div>
            <Switch>
                <Route exact path={"/notify/insert"}>
                    <InsertNotify />
                </Route>
                <Route  path={"/notify/select"}>
                    <SelectNotify />
                </Route>
                <Redirect exact from="/notify" to="/notify/select" />
            </Switch>
        </div >
    )
}
