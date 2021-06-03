/* eslint-disable no-unused-vars */
import "../styles/Dashboard.scss";
import { getBeersSold, getImage, getTopSelling } from "../utils";
import { useWindowDimensions } from "../customHooks";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";
import _ from "lodash";
import Statistic from "./Statistic";
import timeIcon from "../images/time.svg";
import beerIcon from "../images/beer.svg";
import moneyIcon from "../images/money.svg";
import TapsOverview from "./TapsOverview";
import StorageOverview from "./StorageOverview";
import CompletedOrdersChart from "./CompletedOrdersChart";

function Dashboard({
  taps,
  serving,
  queue,
  completedOrders,
  averageOrderTime,
  queueChart,
  beerChart,
  beersServed,
  storage,
}) {
  const { width } = useWindowDimensions();
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
        <section className="chart taps-chart">
          <h4 className="chart__label">Barrels on tap</h4>
          <h4 className="chart__label chart__label--storage">Storage</h4>
          <TapsOverview taps={taps} />
          <StorageOverview storage={storage} />
        </section>
        <div className="dashboard-sidebar">
          <section className="chart beer-chart">
            <h4 className="chart__label">Beers sold</h4>
            <BeerChart data={beerChart} beersServed={beersServed} />
          </section>
          <section className="chart queue-chart">
            <h4 className="chart__label">Customers in queue</h4>
            <AreaChart
              data={queueChart}
              {...antChartConfig}
              width={width < 1520 ? (width < 490 ? 300 : 355) : 430}
              autoFit={false}
              height={width < 1278 ? 300 : 250}
            />
          </section>
        </div>
        <section className="chart completed-orders-chart">
          <h4 className="chart__label">Completed Orders</h4>
          <CompletedOrdersChart completedOrders={completedOrders} />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
