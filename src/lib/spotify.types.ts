export interface SpotifyAlbumImage {
  url: string;
}

export interface SpotifyAlbum {
  images: SpotifyAlbumImage[];
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  name: string;
  duration_ms: number;
}

export interface SpotifyLoginState {
  token: string;
}

export interface SpotifyPlayerState {
  item: SpotifyItem;
  is_playing: boolean;
  progress_ms: number;
}

export interface SpotifyPlaylists {
  playlists: SpotifyPlaylist[];
}

export interface SpotifyPlaylist {
  name: string;
  items: SpotifyItem[];
}