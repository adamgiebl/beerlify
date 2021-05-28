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
