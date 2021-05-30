import { Table, Tag } from "antd";
import { formatDate, countOccurances } from "../utils";

const tableConfig = {
  pagination: false,
  size: "small",
};

const { Column } = Table;

const CompletedOrdersChart = ({ completedOrders }) => {
  const renderBeers = (taps) => {
    const beers = countOccurances(taps);
    return (
      <>
        {Object.keys(beers).map((beerName, index) => (
          <Tag color="gold" key={beerName + index}>
            {beers[beerName] > 1 && `${beers[beerName]}x`} {beerName}
          </Tag>
        ))}
      </>
    );
  };
  return (
    <Table
      autoFit={true}
      dataSource={completedOrders}
      {...tableConfig}
      pagination={{ pageSize: 10 }}
      rowKey="id"
    >
      <Column title="Customer ID" dataIndex="id" key="id" />
      <Column
        title="Order"
        dataIndex="order"
        key="order"
        render={renderBeers}
      />
      <Column
        title="Order Time"
        dataIndex="startTime"
        key="startTime"
        align={"right"}
        render={(timestamp) => formatDate(timestamp)}
      />
      <Column
        title="Finished in"
        dataIndex="finishedIn"
        key="finishedIn"
        align={"right"}
        render={(finishedIn) => finishedIn + "s"}
      />
    </Table>
  );
};

export default CompletedOrdersChart;
