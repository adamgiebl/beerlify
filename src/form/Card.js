import volumeSrc from "../images/barells/volume.svg";
import { getImage } from "../utils.js";

const Card = (props) => {
  console.log(props);
  const onButtonClick = (event) => {
    if (!props.available) {
      return;
    }
    event.stopPropagation(); // stops event from bubbling up to the parent onClick handler

    const currentBeerToBeAdded = props;
    props.addToOrder(currentBeerToBeAdded);
  };
  return (
    <article
      className="card"
      onClick={() => (props.available ? props.openDetailPage : null)}
    >
      {!props.available && (
        <div className="sold-out">
          <p>
            Not
            <br />
            available
            <br />
            today
          </p>
        </div>
      )}
      <img
        className="keg"
        src={getImage(props.name, "./images/barells/")}
        alt="hoppily"
      />
      <span className="beer-type">{props.category}</span>
      <h3>{props.name}</h3>
      <div className="volume-price">
        <div className="volume">
          <img className="beer-icon" src={volumeSrc} alt="" />
          <span className="volume-txt">
            500<small>ml</small>
          </span>
        </div>
        <span className="price">54,-</span>
      </div>
      <button className="add-button" onClick={onButtonClick}>
        + Add to order
      </button>
    </article>
  );
};
export default Card;
