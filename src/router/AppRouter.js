import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import { RouterPage } from '../pages/RouterPage';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />
                    <Route path="/" component={RouterPage} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
