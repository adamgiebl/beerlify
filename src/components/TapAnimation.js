import { useEffect, useRef, forwardRef, memo } from "react";
import { gsap } from "gsap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { SyncOutlined } from "@ant-design/icons";
import "../styles/TapAnimation.scss";
import moneyIcon from "../images/money.svg";

const TapAnimation = ({ activeTap, repeat, statusDetail }) => {
  const svgRef = useRef(null);
  const beerRef = useRef(null);
  const beerContainerRef = useRef(null);
  const beerLiquidRef = useRef(null);
  const tapStreamRef = useRef(null);

  useEffect(() => {
    if (activeTap !== "none") {
      const secondTimeline = gsap.timeline({ repeat: repeat - 1 });
      const timeline = gsap.timeline().add(secondTimeline, 0.5);
      timeline.from(svgRef.current, {
        x: 120,
        opacity: 0,
        duration: 0.5,
      });
      secondTimeline.from(
        beerContainerRef.current,
        {
          x: 200,
          duration: 1,
          ease: "expo",
        },
        "+=0.5"
      );
      secondTimeline.from(
        tapStreamRef.current,
        {
          height: 0,
          duration: 0.5,
        },
        "+=1"
      );
      secondTimeline.from(beerLiquidRef.current, {
        scaleY: 0,
        duration: 5.5,
        transformOrigin: "50% 100%",
        ease: "linear",
      });
      secondTimeline.to(tapStreamRef.current, {
        scaleY: 0,
        y: 100,
        duration: 0.5,
      });
      secondTimeline.to(beerContainerRef.current, {
        x: -200,
        duration: 0.5,
        ease: "expo",
      });
      secondTimeline.progress(0);
    }
  }, [activeTap, repeat]);

  return (
    <TransitionGroup className="transition-container" key={activeTap}>
      {statusDetail !== "releaseTap" && activeTap !== "none" && (
        <CSSTransition in={true} classNames="tap-animation" timeout={300}>
          <div className={`svg-wrapper`}>
            <svg
              viewBox="0 0 178 422"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="tap-svg"
              ref={svgRef}
            >
              <g id="draft">
                <Stand />
                <Base />
                <Tap />
                <Misc />
                <rect
                  id="stream"
                  x="79"
                  y="201"
                  width="17"
                  height="196"
                  fill="#FFB62C"
                  fillOpacity="0.65"
                  ref={tapStreamRef}
                />
                <Beer ref={{ beerRef, beerContainerRef, beerLiquidRef }} />
              </g>
            </svg>
          </div>
        </CSSTransition>
      )}
      {(statusDetail === "waiting" ||
        statusDetail === "replaceKeg" ||
        statusDetail === "reserveTap" ||
        statusDetail === "startServing") && (
        <CSSTransition in={true} timeout={0}>
          <div className="status">
            <SyncOutlined spin={true} style={{ fontSize: "60px" }} />
          </div>
        </CSSTransition>
      )}
      {statusDetail === "receivePayment" && (
        <CSSTransition in={true} timeout={0}>
          <div className="status">
            <img className="status__image" src={moneyIcon} alt="" />
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

const Beer = forwardRef(
  (props, { beerRef, beerContainerRef, beerLiquidRef }) => {
    return (
      <g className="beer-container" ref={beerContainerRef}>
        <g id="beer" className="beer" ref={beerRef}>
          <rect
            id="liquid"
            x="44"
            y="276.173"
            width="86.1135"
            height="121.1"
            fill="#FFB62C"
            ref={beerLiquidRef}
          />
          <rect
            id="Rectangle 130"
            x="32"
            y="266.001"
            width="110.559"
            height="140.476"
            rx="0.900137"
            fill="#CBCBCB"
            fillOpacity="0.29"
          />
          <path
            id="Rectangle 132"
            d="M87.5625 266H141.664C142.161 266 142.564 266.403 142.564 266.9V405.576C142.564 406.073 142.161 406.476 141.664 406.476H87.5625V266Z"
            fill="#E4E4E4"
            fillOpacity="0.27"
          />
          <g id="Rectangle 133">
            <path
              id="Rectangle 133"
              d="M136 301H169.1C169.597 301 170 301.403 170 301.9V375.1C170 375.597 169.597 376 169.1 376H136V301Z"
              stroke="#D3D3D3"
              strokeOpacity="0.62"
              strokeWidth="12"
            />
          </g>
        </g>
      </g>
    );
  }
);

const Misc = () => {
  return (
    <g id="misc">
      <path
        id="plate"
        d="M151.809 405.917H88.2601H0.495117V421.085H88.2601H176V405.917H151.809Z"
        fill="#494949"
      />
    </g>
  );
};

const Base = () => {
  return (
    <g id="base">
      <path
        id="Vector_4"
        d="M87.0468 98.5137H115.736C121.698 98.5137 126.537 104.054 126.524 110.882V212.176C126.524 219.004 121.686 224.545 115.723 224.545H103.798H87.0342V220.379V214.549L87.0468 152.69V146.672C96.1045 146.672 103.457 138.137 103.457 127.62C103.457 117.103 96.1171 108.568 87.0468 108.568V98.5137Z"
        fill="#AFB6BC"
      />
      <path
        id="Vector_5"
        d="M71.8472 127.623C71.8472 117.105 78.7029 108.569 87.1487 108.569V98.5137H60.3976C54.8377 98.5137 50.3262 104.055 50.3262 110.884V212.175C50.3262 219.004 54.8377 224.545 60.3976 224.545H87.1605V146.678C78.7029 146.678 71.8472 138.142 71.8472 127.623Z"
        fill="#BDC3C9"
      />
    </g>
  );
};

const Stand = () => {
  return (
    <g id="stand">
      <path
        id="Vector"
        d="M100.658 221.464V405.832H45.2744L45.3399 405.36L74.8097 221.464H100.658Z"
        fill="#BEBEBE"
      />
      <path
        id="Vector_2"
        d="M128.38 405.918H73.083V222.022H103.142L128.38 405.918Z"
        fill="#A8A8A8"
      />
      <path
        id="Vector_3"
        d="M103.056 220.325H85.7723V209.019H74.6036L73.083 220.325V228.373H85.7723H103.959L103.056 220.325Z"
        fill="#424C5A"
      />
    </g>
  );
};

const Tap = () => {
  return (
    <g id="tap">
      <path
        id="Vector_6"
        d="M88.1829 68.377H56.8311V153.656H88.1829V68.377Z"
        fill="#747E89"
      />
      <path
        id="Vector_7"
        d="M88.1829 153.657V201.342H76.4025L56.8311 153.657H88.1829Z"
        fill="#515E6C"
      />
      <path
        id="Vector_8"
        d="M88.1351 73.3994H66.8271V98.4621H88.1351V73.3994Z"
        fill="#979EA7"
      />
      <path
        id="Vector_9"
        d="M88.1347 75.8872H71.8486V88.4186H88.1347V75.8872Z"
        fill="#B9BFC4"
      />
      <path
        id="Vector_10"
        d="M88.1832 0.651367V83.4427H77.5292L76.5905 75.8864L76.3089 73.3989L75.6988 68.3769L67.4854 0.651367H88.1832Z"
        fill="#E5A038"
      />
      <path
        id="Vector_11"
        d="M108.88 0.651367L101.7 68.3769H88.1826V0.651367H108.88Z"
        fill="#EEB448"
      />
      <path
        id="Vector_12"
        d="M119.534 68.377V153.656H88.1826V98.4616H109.491V73.3989H101.136L101.7 68.377H119.534Z"
        fill="#515E6C"
      />
      <path
        id="Vector_13"
        d="M109.491 73.3994V98.4621H88.1826V88.4183H104.469V75.8869H100.902L101.136 73.3994H109.491Z"
        fill="#747E89"
      />
      <path
        id="Vector_14"
        d="M104.469 75.8872V88.4186H88.1826V83.4436H100.104L100.902 75.8872H104.469Z"
        fill="#979EA7"
      />
      <path
        id="Vector_15"
        d="M88.1826 68.377V73.3989V75.8864V83.4427H100.104L100.902 75.8864L101.136 73.3989L101.7 68.377H88.1826Z"
        fill="#EEB448"
      />
      <path
        id="Vector_16"
        d="M119.534 153.657L99.9161 201.342H88.1826V153.657H119.534Z"
        fill="#424C5A"
      />
    </g>
  );
};

export default memo(TapAnimation);
