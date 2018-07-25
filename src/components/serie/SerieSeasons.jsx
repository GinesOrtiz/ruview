import React from "react";

const SerieSeasons = props => (
  <div className="season-selector">
    {props.seasons.map(e => (
      <div
        key={e.id}
        className={`season ${props.activeSeason === e.id ? "active" : ""}`}
        onClick={() => props.onSeasonClick(e.id)}
      >
        <span>{e.name}</span>
      </div>
    ))}
  </div>
);

export default SerieSeasons;
