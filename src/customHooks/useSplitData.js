import { useState } from "react";
import useMemoizeArray from "./useMemoizeArray";

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

  const isQueueDifferent = useMemoizeArray();
  const isServingDifferent = useMemoizeArray();

  const updateData = ({ queue, bartenders, serving, taps }) => {
    setTaps(taps);

    setTapMap(createTapMap(taps));

    setBartenders(bartenders);

    if (isQueueDifferent(queue)) {
      setQueue(queue);
    }

    if (isServingDifferent(serving)) {
      setServing(serving);
    }
  };

  return [updateData, taps, serving, queue, bartenders, tapMap];
};

export default useSplitData;
