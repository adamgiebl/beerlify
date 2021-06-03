import { useSpring, animated } from "react-spring";
import "../styles/Statistic.scss";
import defaultIcon from "../images/graph.svg";

const Statistic = ({
  value = 0,
  title,
  suffix = "",
  icon = <img src={defaultIcon} alt="" />,
}) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value || 0,
    delay: 200,
  });

  return (
    <div className="statistic">
      <div className="statistic__icon">{icon}</div>
      <div>
        {typeof value === "number" ? (
          <animated.span className="statistic__value">
            {number && number.to((n) => n.toFixed(0))}
          </animated.span>
        ) : (
          <span className="statistic__value statistic__value--text">
            {value}
          </span>
        )}

        <span className="statistic__suffix">{suffix}</span>
      </div>
      <span className="statistic__title">{title}</span>
    </div>
  );
};

export default Statistic;
