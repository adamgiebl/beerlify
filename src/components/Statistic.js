import { useSpring, animated } from "react-spring";

const Statistic = ({ value = 0, title, suffix = "" }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
  });

  return (
    <div>
      <span>{title}: </span>
      <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
      {suffix}
    </div>
  );
};

export default Statistic;
