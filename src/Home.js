/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate, getBeersSold } from "./utils";
import {
  useSplitData,
  useOrderProcessing,
  usePeriodicalFetch,
} from "./customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import TapAnimation from "./components/TapAnimation";

function Home() {
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
      <div className="widgets">
        <div className="widget widget--orders">
          <Statistic
            title="Total orders"
            value={completedOrders.length + serving.length + queue.length}
          />
        </div>
        <div className="widget widget--revenue">
          <Statistic title="Beers sold" value={getBeersSold(completedOrders)} />
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
      {true && <TapAnimation />}
      {false && (
        <div className="bartenders">
          {true &&
            bartenders.map((bartender) => (
              <Bartender {...bartender} serving={serving} tapMap={tapMap} />
            ))}
        </div>
      )}
      {false && (
        <div className="home">
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

export default Home;
