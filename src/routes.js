import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Admin from "./pages/Admin";

export default function useRoutes (isAuth, userId) {
    if (isAuth) {
        if(userId === 42) {
            return (
                <Switch>
                    <Route path={"/admin"} exact>
                        <Admin />
                    </Route>

                    <Redirect to={"/admin"} exact/>
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route path={"/catalog"} exact>
                        <Catalog/>
                    </Route>

                    <Route path={"/cart"} exact>
                        <Cart/>
                    </Route>

                    <Redirect to={"/catalog"} exact/>
                </Switch>
            )
        }
    }

    return (
        <Switch>
            <Route path={"/catalog"} exact>
                <Catalog />
            </Route>

            <Route path={"/login"} exact>
                <Login />
            </Route>

            <Route path={"/reg"} exact>
                <Reg />
            </Route>

            <Redirect to={"/catalog"} exact/>
        </Switch>
    )
}