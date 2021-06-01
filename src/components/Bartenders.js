import { useRef, useEffect, useState } from "react";
import { usePrevious } from "../customHooks";
import _ from "lodash/array";
import Bartender from "./Bartender";
import { runAnimationOnce } from "../utils";

const translateOrderToBartenderCard = (order) => {
  const bartenderCardEl = document.querySelector(`#bartender${order.id}`);

  const startPos = order.getBoundingClientRect();

  const endPos = bartenderCardEl.getBoundingClientRect();

  const difX =
    startPos.left - endPos.left + startPos.width / 2 - endPos.width / 2;
  const difY =
    startPos.top - endPos.top + startPos.height / 2 - endPos.height / 2;

  const sizeDifX = endPos.width / startPos.width;
  const sizeDifY = endPos.height / startPos.height;

  order.style.transform = `translate(${-difX}px, ${-difY}px) scale(${sizeDifX}, ${sizeDifY})`;

  order.addEventListener("transitionend", () => {
    order.style.display = "none";
    runAnimationOnce(bartenderCardEl, "pop");
  });
};

const Bartenders = ({ bartenders, queue, serving, tapMap }) => {
  //const pickedOrders = useRef(null);
  const [pickedOrders, setPickedOrders] = useState([]);

  const previousQueue = usePrevious(queue);

  useEffect(() => {
    const diff = _.differenceBy(previousQueue, queue, (item) => item.id);
    if (diff.length > 0) {
      setPickedOrders(diff);
    }

    // does order match
    /* const matching = diff.map((order) => {
      return bartenders.find(
        (bartender) => order.id === bartender.servingCustomer
      );
    }); */
  }, [queue, previousQueue, bartenders]);

  useEffect(() => {
    const readyOrders = document.querySelectorAll(".ready");
    readyOrders.forEach((order) => {
      translateOrderToBartenderCard(order);
    });
  }, [pickedOrders]);

  return (
    <main className="dashboard-wrapper dashboard-wrapper--bartenders">
      <div className="bartenders">
        <Bartender {...bartenders[0]} serving={serving} tapMap={tapMap} />
        <Bartender {...bartenders[1]} serving={serving} tapMap={tapMap} />
        <Bartender {...bartenders[2]} serving={serving} tapMap={tapMap} />
      </div>
      <div className="bartenders-queue">
        {pickedOrders.map((order) => (
          <article
            className="bartenders-queue__order ready"
            id={order.id}
            key={order.id}
          >
            {order.id}
          </article>
        ))}
        {queue.map((order) => (
          <article className="bartenders-queue__order">{order.id}</article>
        ))}
      </div>
    </main>
  );
};

export default Bartenders;
