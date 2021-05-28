import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import Home from "./Home";
import Dash from "./components/Dashboard";
import DataDump from "./components/DataDump";
import { Router } from "@reach/router";
import Form from "./form/Form";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Home path="/" />
      <DataDump path="data" />
      <Dash path="dashboard" />
      <Form path="form" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
