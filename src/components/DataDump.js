/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./DataDump.scss";
import Tables from "./Tables";
import { formatDate, getBeersSold } from "../utils";
import {
  useSplitData,
  useOrderProcessing,
  usePeriodicalFetch,
} from "../customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender2 from "./Bartender2";
import TapAnimation from "./TapAnimation";

function DataDump() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();
  const [completedOrders, averageOrderTime] = useOrderProcessing(serving);

  usePeriodicalFetch((data) => {
    updateData(data);
    setRefreshTime(formatDate(data.timestamp));
  });

  return (
    <main className="dashboard-wrapper">
      <header>
        Data refreshed at: <b>{refreshTime}</b>
      </header>
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
      {false && (
        <div className="bartenders">
          {bartenders.map((bartender) => (
            <Bartender2 {...bartender} serving={serving} tapMap={tapMap} />
          ))}
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
    </main>
  );
}

export default DataDump;
