import { useState } from "react";

const TapAnimation = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <svg
        viewBox="0 0 910 1809"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="tap-svg"
      >
        <g id="draft" onClick={() => setActive(!active)}>
          <Stand />
          <Base />
          <Tap />
          <Misc />
          <rect id="stream" x="432" y="1068" width="45" fill="#FFB62C" />
          <Beer active={active} />
        </g>
      </svg>
    </div>
  );
};

const Beer = ({ active }) => {
  return (
    <g
      id="beer"
      className="beer"
      style={{ transform: `translate(${active ? "0 0" : "-300 0"})` }}
      transform={{}}
    >
      <rect
        id="liquid"
        x="377"
        y="1498"
        width="155"
        height="250"
        fill="#FFB62C"
        opacity={0}
      />

      <rect
        id="Rectangle 130"
        x="355"
        y="1477"
        width="199"
        height="290"
        rx="7"
        fill="#EEEEEE"
        fillOpacity="0.37"
      />
      <path
        id="Rectangle 132"
        d="M455 1477H547C550.866 1477 554 1480.13 554 1484V1760C554 1763.87 550.866 1767 547 1767H455V1477Z"
        fill="white"
        fillOpacity="0.26"
      />
      <g id="Rectangle 133">
        <mask id="path-23-inside-1" fill="white">
          <path d="M532 1550H595C598.866 1550 602 1553.13 602 1557V1689C602 1692.87 598.866 1696 595 1696H532V1550Z" />
        </mask>
        <path
          d="M532 1550H595C598.866 1550 602 1553.13 602 1557V1689C602 1692.87 598.866 1696 595 1696H532V1550Z"
          stroke="#D3D3D3"
          strokeWidth="40"
          mask="url(#path-23-inside-1)"
        />
      </g>
    </g>
  );
};

const Misc = () => {
  return (
    <g id="misc">
      <path
        id="plate"
        d="M784.482 1767.03H455.015H0V1808.75H455.015H909.9V1767.03H784.482Z"
        fill="#494949"
      />
      <path
        id="image"
        d="M455.015 96.6961C365.207 96.6961 292.426 170.517 292.426 261.494C292.426 352.471 365.207 426.293 455.015 426.293C544.822 426.293 617.604 352.471 617.604 261.494C617.604 170.517 544.822 96.6961 455.015 96.6961Z"
        stroke="#515E6C"
        strokeWidth="14"
        strokeMiterlimit="10"
      />
    </g>
  );
};

const Base = () => {
  return (
    <g id="base">
      <path
        id="Vector_4"
        d="M455.015 0H750.17C811.515 0 861.292 49.7774 861.162 111.122V1021.15C861.162 1082.5 811.385 1132.27 750.04 1132.27H627.351H454.885V1094.84V1042.47L455.015 486.727V432.661C548.201 432.661 623.842 355.98 623.842 261.494C623.842 167.008 548.331 90.3272 455.015 90.3272V0Z"
        fill="#AFB6BC"
      />
      <path
        id="Vector_5"
        d="M286.057 261.494C286.057 167.008 361.698 90.3272 454.885 90.3272V0H159.729C98.3848 0 48.6074 49.7774 48.6074 111.122V1021.02C48.6074 1082.37 98.3848 1132.14 159.729 1132.14H455.015V432.661C361.698 432.661 286.057 355.98 286.057 261.494Z"
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
        d="M455.014 1158.92V1768.59H125.027L125.417 1767.03L301.003 1158.92H455.014Z"
        fill="#BEBEBE"
      />
      <path
        id="Vector_2"
        d="M784.48 1767.03H455.014V1158.92H634.108L784.48 1767.03Z"
        fill="#A8A8A8"
      />
      <path
        id="Vector_3"
        d="M627.481 1132.27H455.015V1094.84H319.459L308.672 1132.27L301.004 1158.92H455.015H634.11L627.481 1132.27Z"
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
        d="M454.818 699.543H368V935.693H454.818V699.543Z"
        fill="#747E89"
      />
      <path
        id="Vector_7"
        d="M454.818 935.693V1067.74H422.196L368 935.693H454.818Z"
        fill="#515E6C"
      />
      <path
        id="Vector_8"
        d="M454.687 713.449H395.682V782.852H454.687V713.449Z"
        fill="#979EA7"
      />
      <path
        id="Vector_9"
        d="M454.688 720.338H409.59V755.039H454.688V720.338Z"
        fill="#B9BFC4"
      />
      <path
        id="Vector_10"
        d="M454.817 512V741.262H425.315L422.716 720.337L421.936 713.449L420.246 699.543L397.502 512H454.817Z"
        fill="#E5A038"
      />
      <path
        id="Vector_11"
        d="M512.132 512L492.247 699.543H454.816V512H512.132Z"
        fill="#EEB448"
      />
      <path
        id="Vector_12"
        d="M541.634 699.543V935.693H454.816V782.852H513.821V713.449H490.687L492.247 699.543H541.634Z"
        fill="#515E6C"
      />
      <path
        id="Vector_13"
        d="M513.821 713.449V782.852H454.816V755.039H499.915V720.337H490.038L490.687 713.449H513.821Z"
        fill="#747E89"
      />
      <path
        id="Vector_14"
        d="M499.915 720.338V755.039H454.816V741.263H487.828L490.038 720.338H499.915Z"
        fill="#979EA7"
      />
      <path
        id="Vector_15"
        d="M454.816 699.543V713.449V720.338V741.262H487.828L490.038 720.338L490.687 713.449L492.247 699.543H454.816Z"
        fill="#EEB448"
      />
      <path
        id="Vector_16"
        d="M541.634 935.693L487.308 1067.74H454.816V935.693H541.634Z"
        fill="#424C5A"
      />
    </g>
  );
};

export default TapAnimation;
