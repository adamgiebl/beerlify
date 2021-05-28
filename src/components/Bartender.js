/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useReducer, memo } from "react";
import { statusMessages } from "../constants";
import { countOccurances, getImage } from "../utils";
import _ from "lodash/collection";
import "./Bartender.scss";
import Tap from "./Tap";
import TapAnimation from "./TapAnimation";

const Bartender = ({
  name,
  servingCustomer,
  status,
  statusDetail,
  usingTap,
  serving,
  tapMap,
}) => {
  const [order, setOrder] = useState(null);
  const [taps, setTaps] = useState([]);
  const [activeTap, setActiveTap] = useState(null);

  // find the current order to animate
  useEffect(() => {
    setOrder(serving.find((item) => item.id === servingCustomer));
  }, [servingCustomer, serving]);

  // group all beers inside of the order and set as taps
  useEffect(() => {
    if (order) {
      console.log(countOccurances(order.order));
      setTaps(countOccurances(order.order));
    }
  }, [order]);

  // manage the worker status
  useEffect(() => {
    if (usingTap !== null) {
      setActiveTap(tapMap[usingTap]);
    } else if (statusDetail !== "releaseTap") {
      // for keeping the active tap status when bartender is releasing the tap
      setActiveTap("none");
    }
  }, [usingTap, statusDetail, tapMap]);

  return (
    <div className="bartender">
      <h3>
        {name} - Order: {order?.id}
      </h3>
      <span>
        {statusMessages[statusDetail]} | {activeTap}
      </span>
      <div className="steps">
        {/* {taps.map((tap) => (
          <TapAnimation
            key={tap[0]}
            active={tap[0] === activeTap}
            repeat={tap.length}
            statusDetail={statusDetail}
            name={tap[0]}
          />
        ))} */}
        <TapAnimation
          activeTap={activeTap}
          repeat={taps[activeTap]}
          statusDetail={statusDetail}
          name={activeTap}
        />
      </div>
      <div className="taps">
        {taps &&
          activeTap !== "none" &&
          Object.keys(taps).map((tap) => (
            <div className={`tap-image ${activeTap === tap && "active"}`}>
              <img src={getImage(tap)} alt="tap logo" />
            </div>
          ))}
      </div>
      <div className="order">
        {order &&
          activeTap !== "none" &&
          order.order.map((item) => <span className="ant-tag">{item}</span>)}
      </div>
    </div>
  );
};

export default memo(Bartender);
