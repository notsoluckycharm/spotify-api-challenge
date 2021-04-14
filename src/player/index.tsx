import React from "react";
import "./player.css";
import { SpotifyPlayerState } from 'lib/spotify.types'

const Player: React.FC<SpotifyPlayerState> = ({
  item: { name, album, artists, duration_ms },
  is_playing,
  progress_ms,
}: SpotifyPlayerState
) => {

  const backgroundStyles = {
    backgroundImage:`url(${album.images[0].url})`,
  };

  const seconds: number = progress_ms * 100;
  const percent: number = seconds / duration_ms;

  const progressBarStyles = {
    width: percent.toString() + '%',
  };

  const msToClock = (millis: number) : string => {
    const minutes = Math.floor((millis/1000/60/60)*60);
    const seconds = Math.floor(((millis/1000/60/60)*60 - minutes)*60);
    return `${minutes.toString()}:${seconds.toString()}`;
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={album.images[0].url} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{name}</div>
          <div className="now-playing__artist">
            {artists[0].name}
          </div>
          <div className="now-playing__status">
            {is_playing ? "Playing" : "Paused"} <br/>
            { msToClock(progress_ms) } / { msToClock(duration_ms) }
          </div>
          <div className="progress">
            <div
              className="progress__bar"
              style={progressBarStyles}
            />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}
export default Player;