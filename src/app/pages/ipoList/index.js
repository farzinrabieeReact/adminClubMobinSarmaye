import React from 'react';
import { Redirect , Route, Switch } from "react-router-dom";
import IpoListInsert from '../../modules/ipoList/ipoListInsert';
import IpoListSelect from '../../modules/ipoList/IpoListSelect'
import Ipo from '../../modules/ipoList/Ipo'





const IpoList = () => {
    return ( 
        <>
        <Switch>
            <Route exact path={"/ipoList/list"}>
                <IpoListSelect/>
            </Route>
            <Route exact path={"/ipoList/add"}>
                <IpoListInsert/>
            </Route>
            <Route exact path={"/ipoList/ipo"}>
                <Ipo/>
            </Route>
        </Switch>
        </>
     );
}
 
export default IpoList;
