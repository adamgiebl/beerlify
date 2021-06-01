import { useEffect, useState } from "react";

const Tap = ({ beerArray, isActiveTap, statusDetail }) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (statusDetail === "pourBeer") {
        setTimer((t) => (t >= 10 ? 0 : t + 0.1));
      }
    }, 100);

    return () => {
      clearInterval(id);
      setTimer(0);
    };
  }, [statusDetail]);

  return (
    <div>
      <div
        className={`step step--tap ${isActiveTap(beerArray[0]) ? "yes" : null}`}
        style={{
          "--iterations": beerArray.length,
          "--height": timer * 10 + "%",
        }}
      >
        <div className="tap-info">
          <span>{beerArray.length}</span>
          <span className="time">
            {isActiveTap(beerArray[0]) && Math.floor(timer)}
          </span>
        </div>

        <span className="tap-name">{beerArray[0]}</span>
      </div>
      <div
        className={`step step--releasing ${
          statusDetail === "releaseTap" && isActiveTap(beerArray[0])
            ? "yes"
            : null
        }`}
      >
        Releasing the tap
      </div>
    </div>
  );
};

export default Tap;
