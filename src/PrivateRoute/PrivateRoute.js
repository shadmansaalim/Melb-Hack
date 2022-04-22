import React from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import useAuth from '../hooks/useAuth';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    const history = useHistory();
    if (isLoading) {
        return (
            <div class="spinner d-flex align-items-center justify-content-center">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        );
    }
    if (!user.email) {
        history.replace('/login');
        window.location.reload();
        return;
    }
    else {
        return (
            <Route
                {...rest}
                render={() => children}
            >

            </Route>
        );
    }

};

export default PrivateRoute;