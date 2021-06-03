import { useEffect, useState } from "react";
import { usePrevious } from "../customHooks";
import _ from "lodash/array";
import Bartender from "./Bartender";
import { runAnimationOnce } from "../utils";
import orderIcon from "../images/order-icon.svg";

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
  setTimeout(() => {
    runAnimationOnce(bartenderCardEl, "pop");
  }, 370); // timeout set 130ms before the transition ends
  order.addEventListener("transitionend", () => {
    order.style.display = "none";
  });
};

const Bartenders = ({ bartenders, queue, serving, tapMap }) => {
  const [pickedOrders, setPickedOrders] = useState([]);
  const previousQueue = usePrevious(queue);

  useEffect(() => {
    // find the current order that has been picked up by a bartender
    const diff = _.differenceBy(previousQueue, queue, (item) => item.id);
    if (diff.length > 0) {
      setPickedOrders(diff);
    }
  }, [queue, previousQueue, bartenders]);

  useEffect(() => {
    // animation when a bartender picks up a new order from the queue
    const readyOrders = document.querySelectorAll(".ready");
    readyOrders.forEach((order) => {
      translateOrderToBartenderCard(order);
    });
  }, [pickedOrders]);

  return (
    <main className="dashboard-wrapper dashboard-wrapper--bartenders">
      <div className="bartenders">
        {bartenders.map((bartender) => (
          <Bartender {...bartender} serving={serving} tapMap={tapMap} />
        ))}
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
          <article className="bartenders-queue__order">
            <img src={orderIcon} alt="" /> #{order?.id}
          </article>
        ))}
      </div>
    </main>
  );
};

export default Bartenders;
