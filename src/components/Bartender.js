/* eslint-disable no-unused-vars */
import { useEffect, useState, memo } from "react";
import { statusMessages } from "../constants";
import { countOccurances, getImage } from "../utils";
import _ from "lodash/collection";
import "../styles/Bartenders.scss";
import TapAnimation from "./TapAnimation";
import orderIcon from "../images/order-icon.svg";

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
      <h3 className="bartender__title">{name}</h3>
      <div className="bartender__card" id={`bartender${servingCustomer}`}>
        <span className="order-number">
          <img src={orderIcon} alt="" /> #{order?.id}
        </span>
        <TapAnimation
          activeTap={activeTap}
          repeat={taps[activeTap]}
          statusDetail={statusDetail}
        />
        <div className="taps">
          {taps &&
            activeTap !== "none" &&
            Object.keys(taps).map((tap) => (
              <div
                className={`tap-image ${activeTap === tap && "active"} ${
                  taps[tap] > 1 && "show-count"
                }`}
                data-count={taps[tap]}
              >
                <img src={getImage(tap)} alt="tap logo" />
              </div>
            ))}
        </div>
        <span>{statusMessages[statusDetail]}</span>
      </div>
    </div>
  );
};

export default memo(Bartender);
