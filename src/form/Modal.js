import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import downArrowSrc from "../images/arrow.svg";
import { getImage } from "../utils.js";
import "./Modal.scss";

const Modal = (props) => {
  const accumulatedPrice = props.order.reduce(
    (accumulator, currentBeer) => accumulator + currentBeer.count * 54,
    0
  );

  const { accumulatedPriceAnimated } = useSpring({
    from: { accumulatedPriceAnimated: 0 },
    accumulatedPriceAnimated: accumulatedPrice || 0,
    delay: 200,
  });

  return (
    <section className={`modal ${props.modalMinimized && "modal--minimized"}`}>
      <div className="modal-content">
        <button
          className="close-arrow"
          onClick={() => props.setModalMinimized(!props.modalMinimized)}
        >
          <img src={downArrowSrc} alt="" />
        </button>
        <div className="rows-container">
          <div className="row-header">
            <h3>Order summary</h3>
          </div>
          <div className="rows">
            {!props.modalMinimized &&
              props.order.map((item) => (
                <BeerRow
                  {...item}
                  key={item.name}
                  addToOrder={props.addToOrder}
                  removeFromOrder={props.removeFromOrder}
                />
              ))}
          </div>

          <div className="total">
            <span className="total__label">Total: </span>
            <animated.span className="total__price">
              {accumulatedPriceAnimated.to((n) => n.toFixed(0))}
            </animated.span>
            <span className="total__price">,-</span>
            <button className="total__checkout" onClick={props.checkout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeerRow = (props) => {
  //console.log("beerRow", props);
  const [amount, setAmount] = useState(props.count);

  useEffect(() => {
    setAmount(props.count);
  }, [props.count]);

  return (
    <article className="beer-row">
      <img
        className="beer-small-pic"
        src={getImage(props.name, "./images/barells/")}
        alt=""
      />
      <div className="name-type">
        <h3>{props.name}</h3>
        <span className="beer-type">{props.category}</span>
      </div>
      <div className="qty">
        <button
          onClick={() => props.removeFromOrder(props)}
          disabled={amount === 0}
        >
          -
        </button>
        <input value={amount} readOnly />
        <button onClick={() => props.addToOrder(props)}>+</button>
      </div>
      <div className="price">54,-</div>
    </article>
  );
};

export default Modal;
