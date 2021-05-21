/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate } from "./utils";
import { useSplitData, usePrevious } from "./customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import TapAnimation from "./components/TapAnimation";

const URL = "https://beerlify.herokuapp.com/";

function Home() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [avgTime, setAvgTime] = useState(0);

  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();

  const previousQueue = usePrevious(queue);
  const previousServing = usePrevious(serving);

  const getBeersSold = () => {
    if (completedOrders.length > 0) {
      return completedOrders.reduce((acc, curr) => acc + curr.order.length, 0);
    } else {
      return 0;
    }
  };

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

  useEffect(() => {
    if (serving && serving.length > 0) {
      const diff = _.differenceBy(
        previousServing,
        serving,
        (item) => item.id
      ).map((order) => ({
        ...order,
        finishedIn: Math.floor((Date.now() - order.startTime) / 1000),
        endTime: Date.now(),
      }));

      setCompletedOrders((prevCompletedOrders) => {
        const newOrders = [...diff, ...prevCompletedOrders].sort(
          (a, b) => b.id - a.id
        );
        const totalTime = newOrders.reduce(
          (acc, curr) => acc + curr.finishedIn,
          0
        );
        const avgTime = totalTime / newOrders.length;
        setAvgTime(Math.floor(avgTime));
        return newOrders;
      });
    }
  }, [serving, previousServing]);

  return (
    <>
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
          <Statistic title="Beers sold" value={getBeersSold()} />
        </div>
        <div className="widget widget--revenue">
          <Statistic
            title="Total revenue"
            value={getBeersSold() * 45}
            suffix={",-"}
          />
        </div>
        <div className="widget widget--order-time">
          <Statistic
            title="Avg. time to complete an order"
            value={avgTime}
            suffix={"s"}
          />
        </div>
      </div>
      {false && <TapAnimation />}
      {false && (
        <div className="bartenders">
          {true &&
            bartenders.map((bartender) => (
              <Bartender {...bartender} serving={serving} tapMap={tapMap} />
            ))}
        </div>
      )}
      {true && (
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
    </>
  );
}

export default Home;
