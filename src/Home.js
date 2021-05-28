/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate, getBeersSold } from "./utils";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import TapAnimation from "./components/TapAnimation";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import logo from "./images/logo.svg";
import iconDashboard from "./images/icon-dashboard.svg";
import iconPerson from "./images/icon-person.svg";
import iconData from "./images/data.svg";
import Dashboard from "./components/Dashboard";
import DataDump from "./components/DataDump";
import {
  useSplitData,
  useQueueChart,
  useBeerChart,
  useOrderProcessing,
  usePeriodicalFetch,
} from "./customHooks";

function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [refreshTime, setRefreshTime] = useState(null);
  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();
  const [completedOrders, averageOrderTime, newOrders, setNewOrders] =
    useOrderProcessing(serving, queue);
  const queueChart = useQueueChart(queue);
  const beerChart = useBeerChart(completedOrders);

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
  };

  return (
    <div className="home-content">
      <aside className="sidebar">
        <div className="sidebar__logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="sidebar__navigation">
          <li
            className="navigation-item"
            onClick={() => setActiveTab("Dashboard")}
          >
            <img src={iconDashboard} alt="" />
            Dashboard
          </li>
          <li
            className="navigation-item"
            onClick={() => setActiveTab("Bartenders")}
          >
            <img src={iconPerson} alt="" />
            Bartenders
          </li>
          <li
            className="navigation-item navigation-item--grey"
            onClick={() => setActiveTab("Raw Data")}
          >
            <img src={iconData} alt="" />
            Raw Data
          </li>
        </ul>
      </aside>
      <main className="main-wrapper">
        <header className="header">
          <div className="label">
            <img src={iconDashboard} alt="" /> {activeTab}
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
              <main className="dashboard-wrapper">
                <div className="bartenders">
                  {/* {bartenders.map((bartender) => (
                    <Bartender
                      {...bartender}
                      serving={serving}
                      tapMap={tapMap}
                    />
                  ))} */}
                  <Bartender
                    {...bartenders[0]}
                    serving={serving}
                    tapMap={tapMap}
                  />
                </div>
              </main>
            </CSSTransition>
          )}
          {activeTab === "Raw Data" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <DataDump {...dashboardProps} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </main>
    </div>
  );
}

export default Home;
