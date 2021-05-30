import { useState, useEffect } from "react";
import "./DetailPage.scss";
import logoSrc from "../images/logo.svg";
import volumeSrc from "../images/barells/volume.svg";
import { getImage } from "../utils.js";

const DetailPage = (props) => {
  const [amount, setAmount] = useState(1);
  console.log(props);

  // scroll to top of the page when we open the detail page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-page wrapper">
      <header>
        <button onClick={props.closeDetailPage}>« Back</button>
        <img className="logo" src={logoSrc} alt="" />
      </header>
      <main className="main-container">
        <section className="hero">
          <div className="detail-cover">
            <img
              className="detail-img"
              src={getImage(props.name, "./images/barells/")}
              alt=""
            />
          </div>
          <div className="details">
            <h2>{props.name}</h2>
            <h4>Aroma</h4>
            <p className="main-desc">{props.description.aroma}</p>
            <span className="price">54,-</span>
            <div className="add-container">
              <div className="qty">
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount - 1)}
                  disabled={amount === 0}
                >
                  -
                </button>
                <input value={amount} readOnly />
                <button
                  onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                >
                  +
                </button>
              </div>
              <button> + Add to order</button>
            </div>
            <div className="properties">
              <div className="property">
                <span className="beer-type">{props.category}</span>
              </div>
              <div className="property">
                <span className="alc">Alcohol {props.alc}%</span>
              </div>
              <div className="property">
                <div className="volume">
                  <img className="beer-icon" src={volumeSrc} alt="" />
                  <span className="volume-txt">50cl</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="additional-content">
          <h4>{props.description.overallImpression}</h4>
          <div className="additional-desc">
            <div className="additional-properties">
              <h4>Appearance</h4>
              <p>{props.description.appearance}</p>
            </div>
            <div className="additional-properties">
              <h4>Flavor</h4>
              <p>{props.description.flavor}</p>
            </div>
            <div className="additional-properties">
              <h4>Mouthfeel</h4>
              <p>{props.description.mouthfeel}</p>
            </div>
          </div>
        </section>
        <footer>Foobar 2021 • All rights reserved - The Group</footer>
      </main>
    </div>
  );
};
export default DetailPage;
