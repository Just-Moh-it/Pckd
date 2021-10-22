import React from "react";
import { Route } from "react-router-dom";
import Ping from "../Ping";

const Hello = () => {
  return <h1>Hello wrold</h1>;
};

const Admin = (props) => {
  return (
    <div>
      <Route exact path={props.match.path} component={Hello} />
      <Route exact path={`${props.match.path}/ping`} component={Ping} />x
    </div>
  );
};

export default Admin;
