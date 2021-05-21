/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { formatDate } from "../utils";
import { useSplitData } from "../customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import { antChartConfig } from "../constants";
import { Area as AreaChart } from "@ant-design/charts";
import BeerChart from "./BeerChart";

const URL = "https://beerlify.herokuapp.com/";

function Dashboard() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [beersSold, setBeersSold] = useState(0);
  const [queueChart, setQueueChart] = useState([]);
  const [queueUpdate, setQueueUpdate] = useState();
  const [beerChart, setBeerChart] = useState();

  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();

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

        const red = completed.reduce((acc, curr) => {
          curr.order.forEach((beer) => {
            if (acc[beer]) {
              acc[beer] += 1;
            } else {
              acc[beer] = 1;
            }
          });
          return acc;
        }, {});

        setBeerChart(red);

        return temp;
      });
    }
    /*setQueueChart((prevChart) => {
      console.log(prevChart);
      return [
        ...prevChart,
        { number: queue.length, timestamp: formatDate(Date.now()) },
      ];
    });*/
  }, [queue, serving]);

  useEffect(() => {
    const id = setInterval(() => {
      setQueueUpdate(Date.now());
    }, 10000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setQueueChart((prevChart) => {
      const copy = prevChart;
      if (copy.length > 20) {
        copy.shift();
      }
      return [
        ...copy,
        { number: queue.length, timestamp: formatDate(Date.now()) },
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueUpdate]);

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
            value={getBeersSold() * 3}
            suffix={"$"}
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
    </>
  );
}

export default Dashboard;
