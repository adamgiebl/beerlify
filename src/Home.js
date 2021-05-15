import { useEffect, useState, useMemo } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate } from "./utils";
import { useSplitData } from "./customHooks";
import _ from "lodash/array";
import { Statistic } from "antd";
import Bartender from "./components/Bartender";
import Bartender2 from "./components/Bartender2";
import GridLayout from "react-grid-layout";

const URL = "https://beerlify.herokuapp.com/";

function Home() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [beersSold, setBeersSold] = useState(0);

  const [updateData, taps, serving, queue, bartenders, tapMap] = useSplitData();

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
    setAllOrders((allOrders) => {
      // adding the difference between current allOrders and queue into the new allOrders array
      return [...allOrders, ..._.differenceBy(queue, allOrders, (x) => x.id)];
    });
  }, [queue]);

  useEffect(() => {
    const completed = _.differenceBy(
      allOrders,
      [...serving, ...queue],
      (x) => x.id
    );

    if (completed.length > 0) {
      setBeersSold(completed.reduce((acc, curr) => acc + curr.order.length, 0));
    }

    setCompletedOrders(completed.sort((a, b) => b.id - a.id));
  }, [allOrders, serving, queue]);

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" className="widget widget--orders">
          <Statistic title="Total orders" value={allOrders.length} />
        </div>
        <div key="b" className="widget widget--revenue">
          <Statistic title="Beers sold" value={beersSold} />
        </div>
        <div key="c" className="widget widget--revenue">
          <Statistic title="Total revenue" value={beersSold * 3} suffix={"$"} />
        </div>
      </GridLayout>
      <header>
        Data refreshed at: <b>{refreshTime}</b>
      </header>
      <div className="widgets">
        <div className="widget widget--orders">
          <Statistic title="Total orders" value={allOrders.length} />
        </div>
        <div className="widget widget--revenue">
          <Statistic title="Beers sold" value={beersSold} />
        </div>
        <div className="widget widget--revenue">
          <Statistic title="Total revenue" value={beersSold * 3} suffix={"$"} />
        </div>
      </div>
      <div className="bartenders">
        {false &&
          bartenders.map((bartender) => (
            <Bartender2 {...bartender} serving={serving} tapMap={tapMap} />
          ))}
      </div>
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
    </>
  );
}

export default Home;
