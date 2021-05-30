import { memo } from "react";
import { useSound } from "use-sound";

import { getRandomDelay, getRandomPosition } from "../utils";

import notificationSound from "../sounds/notification.mp3";

const MonitoringChart = ({ removeFromNewOrders, newOrders }) => {
  const [playSound] = useSound(notificationSound, { volume: 0.6 });

  console.log("render", newOrders);
  const onAnimationEnd = (id) => {
    removeFromNewOrders(id);
  };

  const onAnimationStart = () => {
    console.log("plaing sounds");
    playSound();
  };
  return (
    <>
      <h4 className="chart__label">New orders</h4>
      <div className="new-orders">
        {newOrders &&
          newOrders.map((item) => (
            <div
              className="order"
              style={{
                "--delay": `${getRandomDelay()}s`,
                "--positionX": `${getRandomPosition()}%`,
              }}
              key={item.id}
              onAnimationEnd={() => onAnimationEnd(item.id)}
              onAnimationStart={() => onAnimationStart()}
            >
              #{item.id}
            </div>
          ))}
      </div>
    </>
  );
};

export default memo(MonitoringChart);
