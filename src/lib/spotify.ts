
import { SpotifyPlayerState } from 'lib/spotify.types'
declare let SPOTIFY_CLIENT_ID : string;
declare let SPOTIFY_CALLBACK_URL : string;

export const getCurrentTrack = async (token: string) : Promise<SpotifyPlayerState> => {
  return new Promise((accept, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", 'https://api.spotify.com/v1/me/player');
    req.setRequestHeader('Authorization', `Bearer ${token}`);
    req.onerror = (e: ProgressEvent) =>  {
      // This could be better
      reject("Error reaching Spotify API")
      return e;
    }
    req.onload = (e: ProgressEvent) => {
      // Nothing is playing, empty body returned
      if(req.status === 204){
        reject({
          errorText: 'Spotify is not currently playing anything'
        })
      } else {
        try {
          const json = JSON.parse(req.response);
          accept(json)
        } catch(e){
          reject(e)
        }
      }
      return e;
    }
    req.send();
  })
}

export const getAuthorizationUrl = () : string => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const clientId = SPOTIFY_CLIENT_ID;
  const redirectUri = SPOTIFY_CALLBACK_URL;
  const scopes: string[] = [
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  const urlParams: string = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    response_type: 'token',
    show_dialog: 'true',
  }).toString()

  return authEndpoint + '?' + urlParams
}