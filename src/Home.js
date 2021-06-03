/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/data/Tables";
import { formatDate, getBeersSold } from "./utils";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import logo from "./images/logo.svg";
import logoSmall from "./images/beer.svg";
import iconDashboard from "./images/icon-dashboard.svg";
import iconPerson from "./images/icon-person.svg";
import iconData from "./images/data.svg";
import Dashboard from "./components/Dashboard";
import Bartenders from "./components/Bartenders";
import RawData from "./components/data/RawData";
import {
  useSplitData,
  useQueueChart,
  useBeerChart,
  useOrderProcessing,
  usePeriodicalFetch,
} from "./customHooks";

const iconMap = {
  Dashboard: iconDashboard,
  Bartenders: iconPerson,
  "Raw Data": iconData,
};

function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [refreshTime, setRefreshTime] = useState(null);
  const [updateData, taps, serving, queue, bartenders, tapMap, storage] =
    useSplitData();
  const [completedOrders, averageOrderTime, newOrders, setNewOrders] =
    useOrderProcessing(serving, queue);
  const queueChart = useQueueChart(queue);
  const beerChart = useBeerChart(completedOrders);
  const beersServed = new Set(Object.values(tapMap));

  usePeriodicalFetch((data) => {
    updateData(data);
    setRefreshTime(formatDate(data.timestamp));
  });

  const dashboardProps = {
    taps,
    serving,
    queue,
    bartenders,
    tapMap,
    completedOrders,
    averageOrderTime,
    queueChart,
    beerChart,
    newOrders,
    setNewOrders,
    beersServed,
    storage,
  };

  return (
    <div className="home-content">
      <aside className="sidebar">
        <div className="sidebar__logo">
          <img src={logo} alt="logo" className="logo-big" />
          <img src={logoSmall} alt="logo" className="logo-small" />
        </div>
        <ul className="sidebar__navigation">
          <li
            className="navigation-item"
            onClick={() => setActiveTab("Dashboard")}
          >
            <img src={iconDashboard} alt="" />
            <span className="navigation-item__text">Dashboard</span>
          </li>
          <li
            className="navigation-item"
            onClick={() => setActiveTab("Bartenders")}
          >
            <img src={iconPerson} alt="" />
            <span className="navigation-item__text">Bartenders</span>
          </li>
          <li
            className="navigation-item navigation-item--grey"
            onClick={() => setActiveTab("Raw Data")}
          >
            <img src={iconData} alt="" />
            <span className="navigation-item__text">Raw Data</span>
          </li>
        </ul>
      </aside>
      <main className="main-wrapper">
        <header className="header">
          <div className="label">
            <img src={iconMap[activeTab]} alt="" /> {activeTab}
          </div>
          <div className="time">
            Data refreshed at: <b>{refreshTime}</b>
          </div>
        </header>
        <TransitionGroup component={null}>
          {activeTab === "Dashboard" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <Dashboard {...dashboardProps} />
            </CSSTransition>
          )}
          {activeTab === "Bartenders" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <Bartenders {...dashboardProps} />
            </CSSTransition>
          )}
          {activeTab === "Raw Data" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <RawData {...dashboardProps} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </main>
    </div>
  );
}

export default Home;
