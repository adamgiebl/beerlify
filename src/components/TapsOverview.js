import { getImage } from "../utils";
import "./TapsOverview.scss";

const getVolumeColor = (level, capacity) => {
  const percentage = Math.floor((level / capacity) * 100);
  if (percentage > 60) {
    return "#7AC77C";
  } else if (percentage > 30) {
    return "#EEB448";
  } else {
    return "#FF4236";
  }
};

const TapsOverview = ({ taps }) => {
  console.log("taps", taps);
  return (
    <div className="taps-overview">
      {taps.map((tap) => (
        <article className="barrel">
          <div className="barrel__volume">
            <span style={{ color: getVolumeColor(tap.level, tap.capacity) }}>
              {tap.level}
            </span>{" "}
            / {tap.capacity}
          </div>
          <div
            className="barrel__image"
            style={{
              "--volume": Math.floor((tap.level / tap.capacity) * 100) + "%",
            }}
          >
            <img
              className="barrel-image"
              src={getImage(tap.beer, "./images/barells/")}
              alt="beer barrel"
            />
          </div>
          <span className="barrel__title">{tap.beer}</span>
        </article>
      ))}
    </div>
  );
};

export default TapsOverview;
