/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useReducer, memo } from "react";
import { statusMessages } from "../constants";
import { getImage } from "../utils";
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

  useEffect(() => {
    setOrder(serving.find((item) => item.id === servingCustomer));
  }, [servingCustomer, serving]);

  useEffect(() => {
    if (order) {
      setTaps(Object.values(_.groupBy(order.order, (x) => x)));
    }
  }, [order]);

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
        {taps.map((tap) => (
          <TapAnimation
            key={tap[0]}
            active={tap[0] === activeTap}
            repeat={tap.length}
            statusDetail={statusDetail}
          />
        ))}
      </div>
      <div className="taps">
        {taps &&
          activeTap !== "none" &&
          taps.map((tap) => (
            <div className={`tap-image ${activeTap === tap[0] && "active"}`}>
              <img src={getImage(tap[0])} alt="tap logo" />
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
