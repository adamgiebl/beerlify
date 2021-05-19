export const formatDate = (timestamp) =>
  new Intl.DateTimeFormat("dk-DK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);

export const getImage = (name) => {
  try {
    return require(`./images/${name
      .toLowerCase()
      .replaceAll(":", "")
      .replaceAll(" ", "")}.png`).default;
  } catch {
    return null;
  }
};
