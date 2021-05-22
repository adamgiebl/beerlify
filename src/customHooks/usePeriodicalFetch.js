import { useEffect } from "react";

const URL = "https://beerlify.herokuapp.com/";

const usePeriodicalFetch = (callback, deps = []) => {
  useEffect(() => {
    const id = setInterval(
      () =>
        fetch(URL)
          .then((data) => data.json())
          .then((data) => {
            callback(data);
          }),
      1000
    );

    return () => clearInterval(id);
  }, [deps]);
};

export default usePeriodicalFetch;
