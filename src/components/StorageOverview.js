import barrelIcon from "../images/barrel-icon.png";

const StorageOverview = ({ storage }) => {
  const renderBarrels = (amount) => {
    const barrels = [];
    if (amount <= 5) {
      for (let i = 0; i < amount; i++) {
        barrels.push(
          <img src={barrelIcon} className="barrel-image" alt="" key={i} />
        );
      }
      return barrels;
    } else {
      for (let i = 0; i < 5; i++) {
        barrels.push(
          <img src={barrelIcon} className="barrel-image" alt="" key={i} />
        );
      }
      barrels.push(
        <span className="barrel-number" key={"123123"}>
          +{amount - 5}
        </span>
      );
      return barrels;
    }
  };
  const renderStorageItem = (item) => {
    return (
      <article className="storage-item" key={item.name}>
        <div className="storage-item__name">{item.name}</div>
        <div className="storage-item__barrels">
          {renderBarrels(item.amount)}
        </div>
      </article>
    );
  };
  return (
    <div className="storage-overview">
      {storage
        .sort((a, b) => b.amount - a.amount)
        .map((item) => renderStorageItem(item))}
    </div>
  );
};

export default StorageOverview;
