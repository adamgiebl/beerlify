export const formatDate = (timestamp) =>
  new Intl.DateTimeFormat("dk-DK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
