import React from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import Manage from "./pages/Manage/Manage";
import Home from "./pages/Home";
import RedirectHandler from "./pages/RedirectHandler";
import Ping from "./pages/Ping";
import Nav from "./components/Nav";

const RouterComponent = () => {
  return (
    <>
      <Nav></Nav>
      <Switch>
        {/* Ping Rout */}
        <Route exact path="/ping" component={Ping} />

        {/* Manage Router */}
        <Route exact path="/manage" component={Manage}></Route>

        {/* Root Router */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Navigation Router */}
        <Route path="/">
          <RedirectHandler />
        </Route>
      </Switch>
    </>
  );
};

export default RouterComponent;
