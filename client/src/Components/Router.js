import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../routes/HomePage/HomePage";
import LoginPage from "../routes/LoginPage/LoginPage";
import RegsiterPage from "../routes/RegisterPage/RegisterPage";
import DetailPage from "../routes/DetailPage/DetailPage";
import SearchPage from "../routes/SearchPage/SearchPage";
import CategoryPage from "../routes/CategoryPage/CategoryPage";
import Auth from "../hoc/auth";

import Header from "./Header";

export default () => (
    <BrowserRouter>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Auth(HomePage, null)} />
                <Route path="/auth/login" exact component={Auth(LoginPage, false)} />
                <Route path="/auth/register" exact component={Auth(RegsiterPage, false)} />
                <Route path="/search/:term" exact component={Auth(SearchPage, null)} />
                <Route path="/search" exact component={Auth(SearchPage, null)} />
                <Route
                    path="/book/category/:categoryId"
                    exact
                    component={Auth(CategoryPage, null)}
                />
                <Route path="/book/:bookId" exact component={Auth(DetailPage, null)} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </BrowserRouter>
);
