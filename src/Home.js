/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate, getBeersSold } from "./utils";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender2 from "./components/Bartender2";
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refreshTime, setRefreshTime] = useState(null);
  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();
  const [completedOrders, averageOrderTime] = useOrderProcessing(serving);
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
    refreshTime,
    queueChart,
    beerChart,
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
            onClick={() => setActiveTab("dashboard")}
          >
            <img src={iconDashboard} alt="" />
            Dashboard
          </li>
          <li
            className="navigation-item"
            onClick={() => setActiveTab("bartenders")}
          >
            <img src={iconPerson} alt="" />
            Bartenders
          </li>
          <li
            className="navigation-item navigation-item--grey"
            onClick={() => setActiveTab("data")}
          >
            <img src={iconData} alt="" />
            Raw Data
          </li>
        </ul>
      </aside>
      <main className="main-wrapper">
        <TransitionGroup component={null}>
          {activeTab === "dashboard" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <Dashboard {...dashboardProps} />
            </CSSTransition>
          )}
          {activeTab === "bartenders" && (
            <CSSTransition classNames="dialog" timeout={300}>
              <main className="dashboard-wrapper">
                <header className="header">
                  <div className="label">
                    <img src={iconPerson} alt="" /> Bartenders
                  </div>
                  <div className="time">
                    Data refreshed at: <b>{refreshTime}</b>
                  </div>
                </header>
                <div className="bartenders">
                  {bartenders.map((bartender) => (
                    <Bartender2
                      {...bartender}
                      serving={serving}
                      tapMap={tapMap}
                    />
                  ))}
                </div>
              </main>
            </CSSTransition>
          )}
          {activeTab === "data" && (
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
