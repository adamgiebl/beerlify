import { useState, useRef, useEffect } from "react";
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

  const lastQueueOrderID = useRef(null);
  const lastServingOrderID = useRef(null);

  const firstQueueOrderID = useRef(null);
  const firstServingOrderID = useRef(null);

  const updateData = ({ queue, bartenders, serving, taps }) => {
    setTaps(taps);

    setTapMap(createTapMap(taps));

    setBartenders(bartenders);

    if (queue.length > 0) {
      const currentLastQueueOrderID = queue[queue.length - 1].id;
      const currentFirstQueueOrderID = queue[0].id;
      if (
        lastQueueOrderID.current !== currentLastQueueOrderID ||
        firstQueueOrderID.current !== currentFirstQueueOrderID ||
        currentLastQueueOrderID === currentFirstQueueOrderID
      ) {
        lastQueueOrderID.current = currentLastQueueOrderID;
        firstQueueOrderID.current = currentFirstQueueOrderID;
        setQueue(queue);
      } else {
      }
    }

    if (serving.length > 0) {
      const currentLastServingOrderID = serving[serving.length - 1].id;
      const currentFirstServingOrderID = serving[0].id;
      if (
        lastServingOrderID.current !== currentLastServingOrderID ||
        firstServingOrderID.current !== currentFirstServingOrderID ||
        currentLastServingOrderID === currentFirstServingOrderID
      ) {
        lastServingOrderID.current = currentLastServingOrderID;
        firstServingOrderID.current = currentFirstServingOrderID;
        setServing(serving);
      } else {
      }
    }
  };

  return [updateData, taps, serving, queue, bartenders, tapMap];
};

export default useSplitData;
