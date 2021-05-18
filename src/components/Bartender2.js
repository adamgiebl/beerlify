import { useEffect, useState, useRef, useReducer, memo } from "react";
import { statusMessages } from "../constants";
import _ from "lodash/collection";
import "./Bartender.scss";
import Tap from "./Tap";

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

  const isActiveTap = (item) => {
    return item === tapMap[activeTap];
  };

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
      setActiveTap(usingTap);
    } else if (statusDetail !== "releaseTap") {
      setActiveTap("none");
    }
  }, [usingTap, statusDetail, order]);

  const renderPouringState = () => {
    if (order) {
      return taps.map((item, index) => {
        return (
          <Tap
            beerArray={item}
            isActiveTap={isActiveTap}
            statusDetail={statusDetail}
            key={item[0]}
          />
        );
      });
    }
  };

  return (
    <div className="bartender">
      <h3>
        {name} - Order: {order?.id}
      </h3>
      <div className="steps">
        <div
          className={`step step--starting ${
            statusDetail === "startServing" ? "yes" : null
          }`}
        >
          Starting to serve
        </div>
        {renderPouringState()}

        <div
          className={`step step--receiving ${
            statusDetail === "receivePayment" ? "yes" : null
          }`}
        >
          Receiving payment
        </div>
      </div>
    </div>
  );
};

export default memo(Bartender);
