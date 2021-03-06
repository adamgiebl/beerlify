export const statusMessages = {
  pourBeer: "Pouring beer",
  releaseTap: "Releasing the tap",
  startServing: "Starting to serve",
  receivePayment: "Receiving payment",
  replaceKeg: "Replacing a keg",
  endServing: "Finishing serving",
  waiting: "Waiting...",
  reserveTap: "Reserving the tap",
};

export const antChartConfig = {
  xField: "timestamp",
  yField: "number",
  point: {
    size: 0,
    shape: "diamond",
    color: "#292d3c",
  },
  line: {
    color: "#eeb448",
  },
  style: {
    lineWidth: 10,
    fillOpacity: 0,
  },
  lineStyle: {
    fill: "red",
  },
  xAxis: {},
  yAxis: {
    tickInterval: 1,
    min: 0,
  },

  smooth: true,
  areaStyle: {
    fill: "l(270) 0:#ffffff 0.5:#eeb448 1:#eeb448",
  },
};
