import { useEffect, useState } from "react";
import { statusMessages } from "../constants";
import { Steps } from "antd";
import _ from "lodash/collection";
import "./Bartender.scss";

const { Step } = Steps;

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
  const [current, setCurrent] = useState();
  const [step, setStep] = useState();

  const checkMap = (item) => {
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
    if (usingTap) {
      setActiveTap(usingTap);
    }
  }, [usingTap, tapMap]);

  useEffect(() => {
    console.log("useEffect", statusDetail);
    if (step !== statusDetail) {
      console.log("setting", activeTap);
      setStep(statusDetail);
      setCurrent((prevState) => prevState + 1);
    } else if (statusDetail === "startServing") {
      console.log("START SERVING");
      setCurrent(0);
    }
  });

  //console.log(name, statusDetail);

  const renderPouringState = () => {
    if (order) {
      return taps.map((item, index) => {
        return (
          <>
            <Step
              className={`step ${checkMap(item[0]) ? "yes" : null}`}
              description={item[0]}
              status={checkMap(item[0]) ? "yes" : null}
              key={item[0]}
            />
          </>
        );
      });
    }
  };

  return (
    <div className="bartender">
      <h3>
        {name} Order: {order?.id}
      </h3>
      <Steps current={current}>
        <Step description={"starting to serve"} />
        {renderPouringState()}

        <Step description={"receiving payment"} />
      </Steps>
    </div>
  );
};

export default Bartender;
