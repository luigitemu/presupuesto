import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'
import { RouterPage } from './RouterPage';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth'
import { startLoadingProjects } from '../actions/proyecto';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Row, Spin } from 'antd';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                dispatch(startLoadingProjects());
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return <Row justify="center"> <Spin style={{ marginTop: 200 }} size="large" /> </Row>
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isLoggedIn={isLoggedIn}
                    />
                    <PrivateRoute
                        path="/"
                        component={RouterPage}
                        isLoggedIn={isLoggedIn}
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
