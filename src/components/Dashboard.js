/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { getBeersSold } from "../utils";
import { useQueueChart, useBeerChart } from "../customHooks";
import _ from "lodash/array";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import Statistic from "./Statistic";

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
      <header>
        Data refreshed at: <b>{refreshTime}</b>
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
      </div>
      <div className="dashboard">
        <section className="queue-chart chart">
          <AreaChart data={queueChart} {...antChartConfig} />
        </section>

        <section className="beer-chart chart">
          <BeerChart data={beerChart} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
