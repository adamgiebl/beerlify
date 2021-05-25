import { useSpring, animated } from "react-spring";
import "./Statistic.scss";

const Statistic = ({ value = 0, title, suffix = "" }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value || 0,
    delay: 200,
  });

  return (
    <div className="statistic">
      <div>
        {typeof value === "number" ? (
          <animated.span className="statistic__value">
            {number.to((n) => n.toFixed(0))}
          </animated.span>
        ) : (
          <span className="statistic__value">{value}</span>
        )}

        <span className="statistic__suffix">{suffix}</span>
      </div>
      <span className="statistic__title">{title}</span>
    </div>
  );
};

export default Statistic;
