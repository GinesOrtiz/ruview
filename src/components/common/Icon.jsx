import React from "react";

const Icon = props => (
  <i
    className={`icon ${props.className}`}
    style={{
      fontSize: `${props.size || 32}px`,
      lineHeight: `${props.size || 32}px`,
      display: `${props.display || "inline-block"}`
    }}
  >
    {props.type}
  </i>
);

export default Icon;
