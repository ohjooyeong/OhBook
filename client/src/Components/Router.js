import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../routes/HomePage/HomePage";
import LoginPage from "../routes/LoginPage/LoginPage";
import RegsiterPage from "../routes/RegisterPage/RegisterPage";
import DetailPage from "../routes/DetailPage/DetailPage";
import SearchPage from "../routes/SearchPage/SearchPage";
import Header from "./Header";
import styled from "styled-components";

export default () => (
    <BrowserRouter>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegsiterPage} />
                {/* <Route path="/search" exact component={SearchPage} />
                <Route path="/book/:bookId" exact component={DetailPage} /> */}
            </Switch>
        </>
    </BrowserRouter>
);
