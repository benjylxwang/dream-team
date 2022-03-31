import { useState } from "react";

const CircleText = (props) => {
  let [rotation] = useState(Math.random() * 360);
  let id = "circle-" + rotation;

  return (
    <svg id={id} height="100%" width="100%" viewBox="0 0 200 200" {...props}>
      <circle r={80.5} cx={100} cy={100} stroke="white" fill="none" strokeWidth={30} />
      <g transform="translate(100,100)">
        <path
          id={id + "-webCompatible"}
          d="M 64,0 A 64,64 0 0 1 -64,0 A 64,64 0 0 1 64,0"
          transform={`rotate(${rotation})`}
          strokeWidth={5}
          stroke="black"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values={`0;${rotation}`}
            begin="0s"
            dur="1s"
          />
        </path>
        <text fill="#000" fontSize="24">
          <textPath href={"#" + id + "-webCompatible"}>
            <tspan dy={-7}>{props.text}</tspan>
          </textPath>
        </text>
      </g>
    </svg>
  );
};

export default CircleText;
