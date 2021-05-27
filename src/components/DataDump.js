/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./DataDump.scss";
import Tables from "./Tables";
import { getBeersSold } from "../utils";
import _ from "lodash/array";
import { Statistic } from "antd";
import BartenderRaw from "./BartenderRaw";
import TapAnimation from "./TapAnimation";

function DataDump({
  taps,
  serving,
  queue,
  bartenders,
  tapMap,
  completedOrders,
  averageOrderTime,
  refreshTime,
}) {
  return (
    <main className="dashboard-wrapper">
      {true && (
        <div className="widgets">
          <div className="widget widget--orders">
            <Statistic
              title="Total orders"
              value={completedOrders.length + serving.length + queue.length}
            />
          </div>
          <div className="widget widget--revenue">
            <Statistic
              title="Beers sold"
              value={getBeersSold(completedOrders)}
            />
          </div>
          <div className="widget widget--revenue">
            <Statistic
              title="Total revenue"
              value={getBeersSold(completedOrders) * 45}
              suffix={",-"}
            />
          </div>
          <div className="widget widget--order-time">
            <Statistic
              title="Avg. time to complete an order"
              value={averageOrderTime}
              suffix={"s"}
            />
          </div>
        </div>
      )}

      {true && (
        <div className="data-tables">
          <Tables
            {...{
              taps,
              serving,
              queue,
              bartenders,
              tapMap,
              completedOrders,
            }}
          />
        </div>
      )}
      {false && (
        <div className="bartenders">
          {bartenders.map((bartender) => (
            <BartenderRaw {...bartender} serving={serving} tapMap={tapMap} />
          ))}
        </div>
      )}
    </main>
  );
}

export default DataDump;
