import { useEffect, useState } from "react";
import { formatDate } from "../utils";

const useQueueChart = (queue) => {
  const [queueChart, setQueueChart] = useState([]);
  const [queueUpdate, setQueueUpdate] = useState();

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

  return queueChart;
};

export default useQueueChart;
