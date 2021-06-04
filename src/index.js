import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import Home from "./Home";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Form from "./form/Form";

ReactDOM.render(
  <Router basename="/beerlify">
    <Switch>
      <Route exact path="/form">
        <Form />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
