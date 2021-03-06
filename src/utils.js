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
    return 0;
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

export const getRandomDelay = () => {
  return randomNumber(0, 1);
};

export const getRandomPosition = () => {
  return randomNumber(0, 80);
};

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function runAnimationOnce(element, className, callback = () => {}) {
  if (!element) return;
  element.classList.add(className);
  element.addEventListener("animationend", () => {
    element.classList.remove(className);
    callback();
  });
}

export const createTapMap = (taps) => {
  let map = {};
  taps.forEach((tap) => {
    map[tap.id] = tap.beer;
  });
  return map;
};
