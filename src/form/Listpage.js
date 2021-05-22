import { useState, useEffect } from "react";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import hoppilySrc from "../images/barells/hoppilyeverafter.png";
import volumeSrc from "../images/barells/volume.svg";
import downArrowSrc from "../images/downarrow.svg";
import "./Listpage.scss";
const Listpage = (props) => {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  const [order, setOrder] = useState([]);

  function addToOrder(payload) {
    const inOrder = order.findIndex((item) => item.id === payload.id);
    if (inOrder === -1) {
      //add
      const nextPayload = { ...payload };
      nextPayload.amount = 1;
      setOrder((prevState) => [...prevState, nextPayload]);
    } else {
      //it exists, modify amount
      const nextOrder = order.map((item) => {
        if (item.id === payload.id) {
          item.amount += 1;
        }
        return item;
      });
      setOrder(nextOrder);
    }
  }
  return (
    <div className="list-page">
      <div className="elem-up">
        <img src={elemupSrc} alt="" />
      </div>
      <header className="wrapper">
        <h1>Select from the options below to add beer to your order</h1>
        <img className="logo" src={logoSrc} alt="logo" />
      </header>
      <section className="filters-cards">
        <article className="filters wrapper ">
          <span className="active">All </span>
          <span>| IPA | </span>
          <span>Belgian Specialty Ale |</span>
          <span>European Lager |</span>
          <span>Belgian Specialty Ale |</span>
          <span>Belgian Specialty Ale</span>
        </article>
        <article className="card-container">
          <div className="card">
            <img className="keg" src={hoppilySrc} alt="hoppily" />
            <span className="beer-type">IPA</span>
            <h3>Hoppily Ever After</h3>
            <div className="volume-price">
              <div className="volume">
                <img className="beer-icon" src={volumeSrc} alt="" />
                <span className="volume-txt">50cl</span>
              </div>
              <span className="price">54,-</span>
            </div>
            <button>
              {" "}
              <span>+ Add to order</span>
            </button>
          </div>
          <div className="card">
            <img className="keg" src={hoppilySrc} alt="hoppily" />
            <span className="beer-type">IPA</span>
            <h3>Hoppily Ever After</h3>
            <div className="volume-price">
              <div className="volume">
                <img className="beer-icon" src={volumeSrc} alt="" />
                <span className="volume-txt">50cl</span>
              </div>
              <span className="price">54,-</span>
            </div>
            <button> + Add to order</button>
          </div>
          <div className="card">
            <img className="keg" src={hoppilySrc} alt="hoppily" />
            <span className="beer-type">IPA</span>
            <h3>Hoppily Ever After</h3>
            <div className="volume-price">
              <div className="volume">
                <img className="beer-icon" src={volumeSrc} alt="" />
                <span className="volume-txt">50cl</span>
              </div>
              <span className="price">54,-</span>
            </div>
            <button> + Add to order</button>
          </div>
          <div className="card">
            <img className="keg" src={hoppilySrc} alt="hoppily" />
            <span className="beer-type">IPA</span>
            <h3>Hoppily Ever After</h3>
            <div className="volume-price">
              <div className="volume">
                <img className="beer-icon" src={volumeSrc} alt="" />
                <span className="volume-txt">50cl</span>
              </div>
              <span className="price">54,-</span>
            </div>
            <button> + Add to order</button>
          </div>
          <div className="card">
            <img className="keg" src={hoppilySrc} alt="hoppily" />
            <span className="beer-type">IPA</span>
            <h3>Hoppily Ever After</h3>
            <div className="volume-price">
              <div className="volume">
                <img className="beer-icon" src={volumeSrc} alt="" />
                <span className="volume-txt">50cl</span>
              </div>
              <span className="price">54,-</span>
            </div>
            <button onClick={() => addToOrder({ data: true })}>
              {" "}
              + Add to order
            </button>
          </div>
        </article>
      </section>
      <div className="elem-down">
        <img src={elemdownSrc} alt="" />
      </div>
      <footer>Foobar 2021 • All rights reserved</footer>
      {/* <div className="modal">
        <div className="modal-content">
          <button className="close-arrow">
            <img src={downArrowSrc} alt="" />
          </button>
          <div className="rows-container">
            <div className="row-header">
              <h3>Order summary</h3>
            </div>
            <div className="beer-row">
              <img className="beer-small-pic" src={hoppilySrc} alt="" />
              <div className="name-type">
                <h3> Hoppily Ever After</h3>
                <span className="beer-type">Belgian Specialty Ale</span>
              </div>
              <div className="qty">
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount - 1)}
                  disabled={amount === 0}
                >
                  -
                </button>
                <input value={amount} />
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                >
                  +
                </button>
              </div>
              <div className="price">54,-</div>
            </div>
            <div className="beer-row">
              <img className="beer-small-pic" src={hoppilySrc} alt="" />
              <div className="name-type">
                <h3> Hoppily Ever After</h3>
                <span className="beer-type">Belgian Specialty Ale</span>
              </div>
              <div className="qty">
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount - 1)}
                  disabled={amount === 0}
                >
                  -
                </button>
                <input value={amount} />
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                >
                  +
                </button>
              </div>
              <div className="price">54,-</div>
            </div>
            <div className="beer-row">
              <img className="beer-small-pic" src={hoppilySrc} alt="" />
              <div className="name-type">
                <h3> Hoppily Ever After</h3>
                <span className="beer-type">Belgian Specialty Ale</span>
              </div>
              <div className="qty">
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount - 1)}
                  disabled={amount === 0}
                >
                  -
                </button>
                <input value={amount} />
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                >
                  +
                </button>
              </div>
              <div className="price">54,-</div>
            </div>
            <div className="total">
              <h3 className="price">Total</h3>
              <h3 className="price">162,-</h3>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Listpage;
