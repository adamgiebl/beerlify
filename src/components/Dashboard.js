/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import { getBeersSold, getImage, getTopSelling, formatDate } from "../utils";
import { useQueueChart, useBeerChart } from "../customHooks";
import { Table } from "antd";
import _ from "lodash";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import Statistic from "./Statistic";
import timeIcon from "../images/time.svg";
import beerIcon from "../images/beer.svg";
import moneyIcon from "../images/money.svg";

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
}) {
  const onAnimationEnd = (id) => {
    //console.log(id, "ontransitionend");
    setNewOrders((prev) => {
      return _.filter(prev, (order) => order.id !== id);
    });
  };
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
        <section className="monitoring-chart chart">
          <h4 className="chart__label">New orders</h4>
          <div className="new-orders">
            {newOrders &&
              newOrders.map((item) => (
                <div
                  className="order"
                  key={item.id}
                  onAnimationEnd={() => onAnimationEnd(item.id)}
                >
                  Order: {item.id}
                </div>
              ))}
          </div>
        </section>
        {false && (
          <section className="orders-table">
            <Table dataSource={queue} pagination={{ pageSize: 5 }} rowKey="id">
              <Column title="Customer ID" dataIndex="id" key="id" />
              <Column
                title="Order Time"
                dataIndex="startTime"
                key="startTime"
                render={(timestamp) => formatDate(timestamp)}
              />
            </Table>
          </section>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
