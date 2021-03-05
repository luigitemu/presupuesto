


import { Route, Switch } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'

export const AuthRouter = () => {
    return (
        <Switch>
            <Route path="/auth/login" component={LoginPage} />
        </Switch>
    )
}
