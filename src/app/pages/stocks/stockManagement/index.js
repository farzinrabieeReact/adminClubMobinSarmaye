import React from 'react'
import { Redirect, Route  ,Switch} from 'react-router-dom'
import { StockManagementModule } from '../../../modules/stocks/stockManagement'

export default function stockManagement() {
    return (
        <Switch>
            <Route path="/stocks/stockManagement">
                <StockManagementModule />
            </Route>

            <Redirect exact from="/stocks" to="/stocks/stockManagement" />

        </Switch>
    )
}