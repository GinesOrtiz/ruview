import React from "react";
import { Link } from "react-router-dom";
import "./mediaCard.css";
import history from "../../../store/history";

const onMediaCardClick = props => {
  if (props.onMediaCardClick) {
    props.onMediaCardClick(props.id);
  } else {
    history.push(`/${props.type}/${props.id}`);
  }
};

const isTimeline = props =>
  JSON.parse(localStorage.getItem(`video-${props.id}`));

const MediaCard = props => (
  <div
    onClick={() => onMediaCardClick(props)}
    className={`media-card col ${props.cardType}`}
  >
    <img
      alt={props.name}
      src={`${props.thumbnail}?fit=crop&fm=jpg&q=75&w=240&h135`}
      width="240px"
      height="135px"
    />
    <div className="media-name row align-items-center">
      <span className="col">{props.name}</span>
    </div>
    {isTimeline(props) && (
      <div className="timeline">
        <div
          className="timeline-bar"
          style={{ width: `${isTimeline(props).percentage}%` }}
        />
      </div>
    )}
  </div>
);

export default MediaCard;
