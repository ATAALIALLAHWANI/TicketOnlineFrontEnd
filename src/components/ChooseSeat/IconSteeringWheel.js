import * as React from "react";
import './Modal.css';

function IconSteeringWheel(props) {
  return (
    <svg 
      className="icon-steering"
      fill="none"
      stroke="#777"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      viewBox="-1 0 0.1 24"
      height="2.2em"
      width="5.5em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M21 12 A9 9 0 0 1 12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 21 12 z" />
      <path d="M14 12 A2 2 0 0 1 12 14 A2 2 0 0 1 10 12 A2 2 0 0 1 14 12 z" />
      <path d="M12 14v7M10 12l-6.75-2M14 12l6.75-2" />
    </svg>
  );
}

export default IconSteeringWheel;