/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { getBeersSold, getTopSelling } from "../utils";
import { useQueueChart, useBeerChart } from "../customHooks";
import _ from "lodash";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import Statistic from "./Statistic";
import iconDashboard from "../images/icon-dashboard.svg";

function Dashboard({
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
}) {
  return (
    <main className="dashboard-wrapper">
      <header className="header">
        <div className="label">
          <img src={iconDashboard} alt="" /> Dashboard
        </div>
        <div className="time">
          Data refreshed at: <b>{refreshTime}</b>
        </div>
      </header>
      <div className="widgets">
        <div className="widget widget--orders">
          <Statistic
            value={completedOrders.length + serving.length + queue.length}
            title={"Orders"}
          />
        </div>
        <div className="widget widget--revenue">
          <Statistic
            value={getBeersSold(completedOrders)}
            title={"Beers sold"}
          />
        </div>
        <div className="widget widget--revenue">
          <Statistic
            value={getBeersSold(completedOrders) * 45}
            title="Total revenue"
            suffix={",-"}
          />
        </div>
        <div className="widget widget--time">
          <Statistic
            value={averageOrderTime}
            title="Avg. time to complete an order"
            suffix={"s"}
          />
        </div>
        <div className="widget widget--time">
          <Statistic
            value={getTopSelling(beerChart)}
            title="Top selling beer"
          />
        </div>
      </div>
      <div className="main-widgets">
        <section className="queue-chart chart">
          <h4 className="chart__label">Customers in queue</h4>
          <AreaChart
            data={queueChart}
            {...antChartConfig}
            autoFit={true}
            width={400}
          />
        </section>

        <section className="beer-chart chart">
          <h4 className="chart__label">Beers sold</h4>
          <BeerChart data={beerChart} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
