import { useEffect, useState } from "react";
import { usePrevious } from "../customHooks";
import _ from "lodash/array";

const useOrderProcessing = (serving, queue) => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [avgTime, setAvgTime] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const previousServing = usePrevious(serving);
  const previousQueue = usePrevious(queue);

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

  useEffect(() => {
    const diff = _.differenceBy(queue, previousQueue, (item) => item.id);
    if (diff.length > 0) {
      setNewOrders((prev) => [...prev, ...diff]);
    }

    //console.log(diff);
  }, [queue, previousQueue]);

  return [completedOrders, avgTime, newOrders, setNewOrders];
};

export default useOrderProcessing;
