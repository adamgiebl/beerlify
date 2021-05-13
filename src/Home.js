import { useEffect, useState } from "react";
import "./Home.scss";
import Tables from "./components/Tables";
import { formatDate } from "./utils";
import { useSplitData } from "./customHooks";
import _ from "lodash/array";
import Bartender from "./components/Bartender";
import Bartender2 from "./components/Bartender2";

const URL = "https://beerlify.herokuapp.com/";

function Home() {
  const [refreshTime, setRefreshTime] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const [updateData, data, taps, serving, queue, bartenders, tapMap] =
    useSplitData();

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

    setCompletedOrders(completed.sort((a, b) => b.id - a.id));
  }, [allOrders, serving, queue]);

  return (
    <>
      <header>
        Data refreshed at: <b>{refreshTime}</b>
      </header>
      <div className="bartenders">
        {bartenders.map((bartender) => (
          <Bartender2 {...bartender} serving={serving} tapMap={tapMap} />
        ))}
      </div>
      <div className="home">
        <Tables
          {...{
            data,
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
