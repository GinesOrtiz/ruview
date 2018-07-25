import React from "react";
import "./qualitySelector.css";

const QualitySelector = props => (
  <div className="quality-selector">
    <select
      onChange={props.onQualityChange}
      defaultValue={props.currentOption.quality}
    >
      {props.options
        .filter(e => !["mpd", "m3u8"].includes(e.format))
        .map(e => <option key={`${e.quality}${e.format}`}>{e.quality}</option>)}
    </select>
  </div>
);

export default QualitySelector;
