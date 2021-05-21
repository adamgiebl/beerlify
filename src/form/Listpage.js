import { useState } from "react";
import logoSrc from "../images/logo.svg";
import elemupSrc from "../images/5thup.svg";
import elemdownSrc from "../images/5thdown.svg";
import hoppilySrc from "../images/barells/hoppilyeverafter.png";
import volumeSrc from "../images/barells/volume.svg";
import downArrowSrc from "../images/downarrow.svg";
import "./Listpage.scss";
const Listpage = () => {
  const [amount, setAmount] = useState(1);
  return (
    <div className="list-page">
      <div className="elem-up">
        <img src={elemupSrc} alt="" />
      </div>
      <header className="wrapper">
        <h1>Select from the options below to add beer to your order</h1>
        <img src={logoSrc} alt="logo" />
      </header>
      <section className="filters-cards">
        <article className="filters">
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
        </article>
      </section>
      <div className="elem-down">
        <img src={elemdownSrc} alt="" />
      </div>
      <footer>Foobar 2021 • All rights reserved</footer>
      <div className="modal">
        <div className="modal-header">
          <h1>Order summary</h1>
          <img className="close-arrow" src={downArrowSrc} alt="" />
        </div>
        <div className="modal-content">
          <div className="beer-row">
            <img className="single-beer" src={hoppilySrc} alt="" />
            <button
              onClick={() => setAmount((prevAmount) => prevAmount - 1)}
              disabled={amount === 0}
            >
              -
            </button>
            <input value={amount} />
            <button onClick={() => setAmount((prevAmount) => prevAmount + 1)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Listpage;
