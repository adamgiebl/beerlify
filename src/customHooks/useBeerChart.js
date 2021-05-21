import { useEffect, useState } from "react";

const useBeerChart = (completedOrders) => {
  const [beerChart, setBeerChart] = useState();
  useEffect(() => {
    const red = completedOrders.reduce((acc, curr) => {
      curr.order.forEach((beer) => {
        if (acc[beer]) {
          acc[beer] += 1;
        } else {
          acc[beer] = 1;
        }
      });
      return acc;
    }, {});

    setBeerChart(red);
  }, [completedOrders]);

  return beerChart;
};

export default useBeerChart;
