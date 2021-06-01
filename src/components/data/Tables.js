import { Table, Tag, Progress, Typography, Badge } from "antd";
import { SyncOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { formatDate, getImage } from "../../utils";
import { statusMessages } from "../../constants";

const tableConfig = {
  bordered: true,
  pagination: false,
  size: "small",
};

const { Title } = Typography;

const { Column } = Table;

const Tables = ({
  taps,
  queue,
  serving,
  bartenders,
  tapMap,
  completedOrders,
}) => {
  return (
    <>
      <div className="group">
        <Table
          title={() => <Title level={4}>Taps</Title>}
          dataSource={taps}
          loading={taps.length === 0}
          {...tableConfig}
          rowKey="id"
        >
          <Column title="ID" dataIndex="id" key="id" />
          <Column
            title="Name"
            className="table-name"
            dataIndex="beer"
            key="beer"
            render={(value) => (
              <>
                <img className="table-image" src={getImage(value)} alt="beer" />
                {value}
              </>
            )}
          />
          <Column
            title="Level"
            dataIndex="level"
            key="level"
            render={(value, record) => `${value}/${record.capacity}`}
          />
          <Column
            title="Percentage"
            dataIndex="level"
            key="level"
            render={(value, record) => (
              <Progress
                status={record.inUse ? "active" : "normal"}
                strokeColor={record.inUse ? "" : "lightgrey"}
                percent={Math.floor((value / 2500) * 100)}
              />
            )}
          />
          <Column
            title="In Use"
            dataIndex="inUse"
            key="inUse"
            render={(inUse) => (
              <>
                {inUse ? (
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    In use
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="default">
                    Stand-by
                  </Tag>
                )}
              </>
            )}
          />
        </Table>
        <Table
          title={() => <Title level={4}>Bartenders</Title>}
          dataSource={bartenders}
          loading={bartenders.length === 0}
          {...tableConfig}
          size={"small"}
          rowKey="name"
        >
          <Column
            title="Name"
            className="table-name"
            dataIndex="name"
            key="name"
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              <>
                {status === "WORKING" ? (
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    Working
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="default">
                    Slacking off
                  </Tag>
                )}
              </>
            )}
          />
          <Column
            title="Status message"
            dataIndex="statusDetail"
            key="statusDetail"
            render={(value) => statusMessages[value]}
          />
          <Column
            title="Serving customer"
            dataIndex="servingCustomer"
            key="servingCustomer"
          />
          <Column
            title="Using tap"
            dataIndex="usingTap"
            key="usingTap"
            render={(value) =>
              value !== null ? (
                <span>
                  {`No. ${value} - `}
                  <b>{tapMap[value]}</b>
                </span>
              ) : (
                "no tap"
              )
            }
          />
        </Table>
      </div>

      <div className="group">
        <Table
          title={() => (
            <Badge
              count={completedOrders.length}
              offset={[20, 15]}
              style={{ backgroundColor: "#52c41a" }}
              showZero
            >
              <Title level={4}>Completed</Title>
            </Badge>
          )}
          dataSource={completedOrders}
          {...tableConfig}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 300 }}
          rowKey="id"
        >
          <Column title="Customer ID" dataIndex="id" key="id" />
          <Column
            title="Order"
            dataIndex="order"
            key="order"
            render={(taps) => (
              <>
                {taps.map((tap, index) => (
                  <Tag color="gold" key={tap + index}>
                    {tap}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Order Time"
            dataIndex="startTime"
            key="startTime"
            render={(timestamp) => formatDate(timestamp)}
          />
          <Column
            title="End Time"
            dataIndex="endTime"
            key="endTime"
            render={(timestamp) => formatDate(timestamp)}
          />
          <Column
            title="Finished in"
            dataIndex="finishedIn"
            key="finishedIn"
            render={(finishedIn) => finishedIn + "s"}
          />
        </Table>
        <Table
          title={() => (
            <Badge
              count={serving.length}
              offset={[20, 15]}
              style={{ backgroundColor: "royalblue" }}
              showZero
            >
              <Title level={4}>Serving</Title>
            </Badge>
          )}
          dataSource={serving}
          rowKey="id"
          {...tableConfig}
        >
          <Column title="Customer ID" dataIndex="id" key="id" />
          <Column
            title="Order"
            dataIndex="order"
            key="order"
            render={(taps) => (
              <>
                {taps.map((tap, index) => (
                  <Tag color="gold" key={tap + index}>
                    {tap}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Order Time"
            dataIndex="startTime"
            key="startTime"
            render={(timestamp) => formatDate(timestamp)}
          />
        </Table>
        <Table
          title={() => (
            <Badge
              count={queue.length}
              offset={[20, 15]}
              style={{ backgroundColor: "orange" }}
              showZero
            >
              <Title level={4}>Queue</Title>
            </Badge>
          )}
          dataSource={queue}
          rowKey="id"
          {...tableConfig}
        >
          <Column title="Customer ID" dataIndex="id" key="id" />
          <Column
            title="Order"
            dataIndex="order"
            key="order"
            render={(taps) => (
              <>
                {taps.map((tap, index) => (
                  <Tag color="gold" key={tap + index}>
                    {tap}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Order Time"
            dataIndex="startTime"
            key="startTime"
            render={(timestamp) => formatDate(timestamp)}
          />
        </Table>
      </div>
    </>
  );
};

export default Tables;
