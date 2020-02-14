import React from "react";

const Button = props => (
  <button
    style={props.style}
    type={props.type}
    className={`btn ${
      props.addClass === "close"
        ? props.addClass
        : ["btn", props.addClass].join("-")
    }`}
    onClick={props.click}
  >
    {props.label}
  </button>
);

export default Button;
