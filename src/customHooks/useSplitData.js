import { useState } from "react";
import { formatDate } from "../utils";

const createTapMap = (taps) => {
  let map = {};
  taps.forEach((tap) => {
    map[tap.id] = tap.beer;
  });
  return map;
};

const useSplitData = () => {
  const [taps, setTaps] = useState([]);
  const [serving, setServing] = useState([]);
  const [queue, setQueue] = useState([]);
  const [bartenders, setBartenders] = useState([]);
  const [tapMap, setTapMap] = useState({});

  const updateData = (data) => {
    setTaps(
      data.taps.map((item) => ({
        ...item,
        key: item.id,
      }))
    );

    setTapMap(createTapMap(data.taps));

    setBartenders(
      data.bartenders.map((item) => ({
        ...item,
        key: item.name,
      }))
    );

    setQueue(
      data.queue.map((item) => ({
        ...item,
        key: item.id,
        startTime: formatDate(item.startTime),
      }))
    );

    setServing(
      data.serving.map((item) => ({
        ...item,
        key: item.id,
        startTime: formatDate(item.startTime),
      }))
    );
  };

  return [updateData, taps, serving, queue, bartenders, tapMap];
};

export default useSplitData;
