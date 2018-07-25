import React from "react";
import { Button } from "reactstrap";
import ShareButton from "../common/ShareButton";

const SerieDescription = props => (
  <div className="row serie-info">
    <div className="col col-2 info-thumb">
      <img
        src={`${props.thumbnail}?fit=crop&fm=jpg&q=75&w=240&h135`}
        alt={props.name}
      />
    </div>
    <div className="col">
      <h3 className="default-title">{props.name}</h3>
      <span className="description">{props.description}</span>
      <hr />
      <ShareButton name={props.name}/>
    </div>
  </div>
);

export default SerieDescription;
