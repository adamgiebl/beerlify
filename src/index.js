import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import Home from "./Home";
import Dash from "./components/Dashboard";
import RawData from "./components/data/RawData";
import { Router } from "@reach/router";
import Form from "./form/Form";

ReactDOM.render(
  <Router basepath="/beerlify">
    <Home path="/" />
    <RawData path="data" />
    <Dash path="dashboard" />
    <Form path="form" />
  </Router>,
  document.getElementById("root")
);
