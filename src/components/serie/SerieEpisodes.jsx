import React from "react";
import MediaCard from "../common/mediaCard/MediaCard";

const SerieEpisodes = props => (
  <div className="episode-selector row">
    {props.episodes.map(e => (
      <div className="col media-content" key={e.id}>
        <MediaCard
          {...e}
          type={"video"}
          key={e.id}
          cardType="with-content"
          onMediaCardClick={props.onMediaCardClick}
        />
      </div>
    ))}
  </div>
);

export default SerieEpisodes;
