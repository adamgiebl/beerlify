/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { formatDate, getBeersSold } from "../utils";
import {
  useSplitData,
  useQueueChart,
  usePrevious,
  useBeerChart,
  useOrderProcessing,
} from "../customHooks";
import _ from "lodash/array";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import Statistic from "./Statistic";

const URL = "https://beerlify.herokuapp.com/";

function Dashboard() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();
  const previousServing = usePrevious(serving);
  const [completedOrders, averageOrderTime] = useOrderProcessing(
    serving,
    previousServing
  );
  const queueChart = useQueueChart(queue);
  const beerChart = useBeerChart(completedOrders);

  useEffect(() => {
    const id = setInterval(
      () =>
        fetch(URL)
          .then((data) => data.json())
          .then((data) => {
            updateData(data);

            setRefreshTime(formatDate(data.timestamp));
          }),
      1000
    );

    return () => clearInterval(id);
  }, [updateData]);

  return (
    <main className="dashboard-wrapper">
      <header>
        Data refreshed at: <b>{refreshTime}</b>
      </header>
      <div className="widgets">
        <div className="widget widget--orders">
          <Statistic
            value={completedOrders.length + serving.length + queue.length}
            title={"Total Orders"}
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
            title="Avg. Order Time"
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
