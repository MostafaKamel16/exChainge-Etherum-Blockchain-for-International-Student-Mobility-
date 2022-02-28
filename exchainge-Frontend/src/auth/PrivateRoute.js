import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "./auth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Example :- https://reactrouter.com/web/example/auth-workflow

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;