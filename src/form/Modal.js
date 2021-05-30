import { useState, useEffect } from "react";
import downArrowSrc from "../images/downarrow.svg";
import { getImage } from "../utils.js";

const Modal = (props) => {
  const accumulatedPrice = props.order.reduce(
    (accumulator, currentBeer) => accumulator + currentBeer.count * 54,
    0
  );
  console.log(props);
  return (
    <section className="modal">
      <div className="modal-content">
        <button
          className="close-arrow"
          onClick={() => props.setModalOpen(false)}
        >
          <img src={downArrowSrc} alt="" />
        </button>
        <div className="rows-container">
          <div className="row-header">
            <h3>Order summary</h3>
          </div>
          {props.order.map((item) => (
            <BeerRow
              {...item}
              key={item.name}
              addToOrder={props.addToOrder}
              removeFromOrder={props.removeFromOrder}
            />
          ))}
          <div className="total">
            <h3 className="price">Total</h3>
            <h3 className="price">{accumulatedPrice},-</h3>
          </div>
          <button className="checkout-button">Checkout</button>
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
