/* eslint-disable no-unused-vars */
import "../../styles/data/RawData.scss";
import Tables from "./Tables";
import { getBeersSold } from "../../utils";
import _ from "lodash/array";
import { Statistic, Alert } from "antd";
import BartenderRaw from "./BartenderRaw";

function RawData({
  taps,
  serving,
  queue,
  bartenders,
  tapMap,
  completedOrders,
  averageOrderTime,
}) {
  return (
    <main className="dashboard-wrapper dashboard-wrapper--raw">
      <Alert
        message="This page is for the admins only! Not suitable for smaller screens."
        type="warning"
        className="alert"
        showIcon
      />
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
      {true && (
        <div className="bartenders bartenders--raw">
          {bartenders.map((bartender) => (
            <BartenderRaw
              {...bartender}
              serving={serving}
              tapMap={tapMap}
              key={bartender.name}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default RawData;
