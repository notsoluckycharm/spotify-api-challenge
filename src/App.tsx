import React, {
  useState,
  useEffect,
} from 'react';
import {
  SpotifyLoginState,
  SpotifyPlayerState,
} from 'lib/spotify.types'
import {
  getAuthorizationUrl,
  getCurrentTrack,
} from 'lib/spotify'
import Player from './player/index';
import Playlists from './playlists/index';

// Get the hash of the url
const params = new URLSearchParams(window.location.hash.substring(1));
// window.location.hash = "";

const App: React.FC = () =>
{
  const [spotifyLoginState, ] = useState<SpotifyLoginState>({
    token: params.get('access_token') || ''
  });

  // If you wanted to have a player template when it's not in use
  const [spotifyPlayerState, setPlayerState] = useState<SpotifyPlayerState>({
    item: {
      album: {
        images: [
          {
            url: '/'
          }
        ]
      },
      artists: [{
        name: 'Loading',
      }],
      name: 'Loading',
      duration_ms: 0,
    },
    is_playing: false,
    progress_ms: 0,
  });

  // Fetch the current track every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        if(spotifyLoginState.token){
          const results = await getCurrentTrack(spotifyLoginState.token);
          setPlayerState(results)
        }
      })()
    }, 1000);
    return () => clearInterval(interval);
  }, [spotifyLoginState.token]);

  return (
    <div className="App">
      <header className="App-header">
      {!spotifyLoginState.token && (
        <a href={getAuthorizationUrl()}>
          Spotify Login
        </a>
      )}
      {spotifyLoginState.token && (
        <div>
          <Player
            item={spotifyPlayerState.item}
            is_playing={spotifyPlayerState.is_playing}
            progress_ms={spotifyPlayerState.progress_ms}
          />
          <Playlists {...spotifyPlayerState.item} />
        </div>
      )}
      </header>
    </div>
  )
}

export default App;