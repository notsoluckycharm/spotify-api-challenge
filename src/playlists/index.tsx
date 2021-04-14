import React, {
  useState,
} from 'react';
import "./playlists.css";
import {
  SpotifyItem,
  SpotifyPlaylists,
  SpotifyPlaylist,
} from 'lib/spotify.types';

// Doing this kind of thing in redux would be better
const playlistCheck = localStorage.getItem('playlists');
let playlists: SpotifyPlaylists;
if(!playlistCheck){
  playlists = {
    playlists: [],
  };
} else {
  playlists = JSON.parse(playlistCheck);
}

const Playlists: React.FC<SpotifyItem> = (props: SpotifyItem) =>
{
  const [addingPlaylist, toggleAdd] = useState(false);
  const [playlistState, setPlaylistState] = useState<SpotifyPlaylists>(playlists);

  /* Requiring local persistence is a good use case for a library
   * - Store locally and update state
   */
  const setList = (playlists: SpotifyPlaylist[]) => {
    localStorage.setItem('playlists', JSON.stringify({
      playlists
    }));
    setPlaylistState({
      playlists
    });
  }
  const handleRemove = (name: string) => {
    const newList = playlists.playlists.filter((item: SpotifyPlaylist) => item.name !== name);
    setList(newList);
  }
  const handleAdd = (name: string) => {
    setList(playlistState.playlists.map(playlist => {
      if(playlist.name === name){
        playlist.items = [...playlist.items, {...props}]
      }
      return playlist;
    }))
  }
  const deleteTrack = (playlistName: string, trackName: string) => {
    setList(playlistState.playlists.map(playlist => {
      if(playlist.name === playlistName){
        playlist.items = playlist.items.filter(playlistItem => playlistItem.name !== trackName)
      }
      return playlist;
    }))
  }

  const items = playlistState.playlists.map((playlist: SpotifyPlaylist, i: number)  => {
    console.log
    return (
      <div className="playlist__item" key={i}>
        <div className="playlist__header">
          <div>
            {playlist.name}
          </div>
          <div>
            <i onClick={() => handleAdd(playlist.name)}>
              Add Track
            </i>
          </div>
          <div>
            <i onClick={() => handleRemove(playlist.name)}>
              Delete Playlist
            </i>
          </div>
        </div>
        <div className="playlist__tracks">
          {playlist.items.map((track: SpotifyItem) => {
            return <div key={track.name}>
              <div className="track_name">{track.name}</div>
              <div className="delete_track" onClick={() => deleteTrack(playlist.name, track.name)}>delete track</div>
            </div>
          })}
        </div>
      </div>
    )
  })
  return (
    <div className="playlists">
      <div className="playlists_add" >
        <h5 onClick={() => toggleAdd(!addingPlaylist)}>Add Playlist +</h5>
        {addingPlaylist &&
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                name: { value: string };
              };
              const name = target.name.value;
              setList([...playlistState.playlists, {name, items:[]}])
              toggleAdd(false)
            }}
          >
            <div>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="submit" />
            </div>
          </form>
        }
      </div>
      <div className="playlist__container">{items}</div>
    </div>
  )
}

export default Playlists;