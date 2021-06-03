import { getImage } from "../utils";
import { Spin } from "antd";
import "../styles/BeerChart.scss";

const BeerChart = ({ data, beersServed }) => {
  if (!data)
    return (
      <div className="spinner">
        <Spin />
      </div>
    );
  const maxValue = Math.max(...Object.values(data));
  const height = maxValue;

  const renderBars = () => {
    return Object.keys(data)
      .sort((a, b) => data[b] - data[a])
      .map((key) => {
        return (
          <div
            key={key}
            className="column"
            style={{ "--height": `${(data[key] / height) * 100}%` }}
          >
            <img className="column__image" src={getImage(key)} alt="chart" />
            <div className="column__bar">{data[key]}</div>
          </div>
        );
      });
  };

  const renderNames = () =>
    Object.keys(data)
      .sort((a, b) => data[b] - data[a])
      .map((key) => {
        return (
          <div className="annotations__name" key={key}>
            {key}
          </div>
        );
      });

  return (
    <>
      <div
        className="beer-chart-content"
        style={{ width: `${beersServed.size * 75 - 20}px` }}
      >
        {renderBars()}
      </div>
      <div className="annotations">{renderNames()}</div>
    </>
  );
};

export default BeerChart;
