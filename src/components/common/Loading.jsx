import React from "react";
import Icon from "./Icon";

const Loading = props => (
  <div className="ru-loading row align-items-center">
    <div className="loading-content col">
      <Icon type={props.icon || "query_builder"} />
      {props.text && <div>{props.text}</div>}
    </div>
  </div>
);

export default Loading;
