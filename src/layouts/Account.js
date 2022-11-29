import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Account = () => {
    return(
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Redirect from="/main" to="/main/dashboard" />
                </Switch>
            </BrowserRouter>
    )
}

export default Account;