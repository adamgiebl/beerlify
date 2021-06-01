/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import { getBeersSold, getImage, getTopSelling, formatDate } from "../utils";
import { useQueueChart, useBeerChart } from "../customHooks";
import { Table } from "antd";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import _ from "lodash";
import Statistic from "./Statistic";
import timeIcon from "../images/time.svg";
import beerIcon from "../images/beer.svg";
import moneyIcon from "../images/money.svg";
import MonitoringChart from "./MonitoringChart";
import CompletedOrdersChart from "./CompletedOrdersChart";

const { Column } = Table;

function Dashboard({
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
}) {
  const removeFromNewOrders = useCallback(
    (id) => {
      setNewOrders((prev) => {
        return _.filter(prev, (order) => order.id !== id);
      });
    },
    [setNewOrders]
  );
  return (
    <main className="dashboard-wrapper">
      <div className="widgets">
        <Statistic
          value={completedOrders.length + serving.length + queue.length}
          title={"Orders"}
        />
        <Statistic
          value={getBeersSold(completedOrders)}
          title={"Beers sold"}
          icon={<img src={beerIcon} alt="" style={{ width: "auto" }} />}
        />
        <Statistic
          value={getBeersSold(completedOrders) * 45}
          title="Total revenue"
          suffix={",-"}
          icon={<img src={moneyIcon} alt="" />}
        />
        <Statistic
          value={averageOrderTime}
          title="Time to complete an order"
          suffix={"s"}
          icon={<img src={timeIcon} alt="" />}
        />
        <Statistic
          value={getTopSelling(beerChart)}
          title="Top selling beer"
          icon={
            <img
              src={getImage(getTopSelling(beerChart))}
              alt=""
              className="label-image"
            />
          }
        />
      </div>
      <div className="main-widgets">
        <section className="chart queue-chart">
          <h4 className="chart__label">Customers in queue</h4>
          <AreaChart
            data={queueChart}
            {...antChartConfig}
            autoFit={true}
            width={400}
            height={250}
          />
        </section>
        <section className="chart taps-chart"></section>
        <section className="chart beer-chart">
          <h4 className="chart__label">Beers sold</h4>
          <BeerChart data={beerChart} beersServed={beersServed} />
        </section>
        {false && (
          <section className="chart monitoring-chart">
            <MonitoringChart
              newOrders={newOrders}
              removeFromNewOrders={removeFromNewOrders}
            />
          </section>
        )}
        <section className="chart completed-orders-chart">
          <h4 className="chart__label">Completed Orders</h4>
          <CompletedOrdersChart completedOrders={completedOrders} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
