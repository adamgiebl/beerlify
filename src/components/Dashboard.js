import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { formatDate } from "../utils";
import { useSplitData } from "../customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import { Area } from "@ant-design/charts";
import { getImage } from "../utils";

const URL = "https://beerlify.herokuapp.com/";

function Dashboard() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [beersSold, setBeersSold] = useState(0);
  const [queueChart, setQueueChart] = useState([]);
  const [queueUpdate, setQueueUpdate] = useState();
  const [beerChart, setBeerChart] = useState({
    "Ruined Childhood": 29,
    "Fairy Tale Ale": 27,
    "Hollaback Lager": 37,
    Mowintime: 29,
    Steampunk: 23,
    "Hoppily Ever After": 27,
  });

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

        //setBeerChart(red);

        console.log(red);

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
      console.log(prevChart);
      const copy = prevChart;
      if (copy.length > 20) {
        copy.shift();
      }
      console.log(queue);
      return [
        ...copy,
        { number: queue.length, timestamp: formatDate(Date.now()) },
      ];
    });
  }, [queueUpdate]);

  const config = {
    xField: "timestamp",
    yField: "number",
    point: {
      size: 5,
      shape: "diamond",
    },
    xAxis: {},
    yAxis: {
      min: 0,
      max: 7,
      title: {
        text: "Customers in Queue",
      },
    },
    smooth: true,
    areaStyle: {
      fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
    },
  };

  const renderBeerChart = () => {
    const maxValue = Math.max(...Object.values(beerChart));
    const height = maxValue + maxValue / 10;

    const renderBars = () => {
      return Object.keys(beerChart)
        .sort((a, b) => beerChart[b] - beerChart[a])
        .map((key) => {
          return (
            <div
              key={key}
              className="column"
              style={{ "--height": `${(beerChart[key] / height) * 100}%` }}
            >
              <img className="column__image" src={getImage(key)} alt="chart" />
              <div className="column__bar">{beerChart[key]}</div>
            </div>
          );
        });
    };

    const renderNames = () => {
      return (
        <div className="annotations">
          {Object.keys(beerChart)
            .sort((a, b) => beerChart[b] - beerChart[a])
            .map((key) => {
              return <div className="annotations__name">{key}</div>;
            })}
        </div>
      );
    };
    return (
      <>
        <div className="beer-chart-content">{renderBars()}</div>
        {renderNames()}
      </>
    );
  };

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
        <section className="queue-chart">
          <Area data={queueChart} {...config} />
        </section>

        <section className="beer-chart">{renderBeerChart()}</section>
      </div>
    </>
  );
}

export default Dashboard;
