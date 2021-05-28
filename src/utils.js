import _ from "lodash";

export const formatDate = (timestamp) =>
  new Intl.DateTimeFormat("dk-DK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);

export const getImage = (name, directory = "./images/") => {
  try {
    return require(`${directory}${name
      .toLowerCase()
      .replaceAll(":", "")
      .replaceAll(" ", "")}.png`).default;
  } catch {
    return null;
  }
};

export const getBeersSold = (completedOrders) => {
  if (completedOrders.length > 0) {
    return completedOrders.reduce((acc, curr) => acc + curr.order.length, 0);
  } else {
    return 0;
  }
};

export const getTopSelling = (beerChart) => {
  if (beerChart) {
    return _.maxBy(Object.keys(beerChart), (o) => beerChart[o]);
  } else {
    return "Collecting data...";
  }
};

export const countOccurances = (array) => {
  return array.reduce((acc, curr) => {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }

    return acc;
  }, {});
};
