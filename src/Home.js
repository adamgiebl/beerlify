/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate } from "./utils";
import { useSplitData } from "./customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import TapAnimation from "./components/TapAnimation";

const URL = "https://beerlify.herokuapp.com/";

function Home() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [beersSold, setBeersSold] = useState(0);

  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();

  /*const addToCompleted = (order) => {
    if (!completedOrders.some((currOrder) => currOrder.id === order.id)) {
      setCompletedOrders((prevOrders) =>
        [order, ...prevOrders].sort((a, b) => b.id - a.id)
      );
    }
  };*/

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
    if (queue.length > 0) {
      setAllOrders((allOrders) => {
        // adding the difference between current allOrders and queue into the new allOrders array
        const temp = [
          ...allOrders,
          ..._.differenceBy([...queue, ...serving], allOrders, (x) => x.id),
        ];

        const completed = _.differenceBy(
          temp,
          [...serving, ...queue],
          (x) => x.id
        );

        setCompletedOrders(completed.sort((a, b) => b.id - a.id));
        return temp;
      });
    }
  }, [queue, serving]);

  return (
    <>
      <header>
        Data refreshed at: <b>{refreshTime}</b>
      </header>
      <div className="widgets">
        <div className="widget widget--orders">
          <Statistic title="Total orders" value={allOrders.length} />
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
