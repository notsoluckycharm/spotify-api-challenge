
## Spotify API Code Test
![img](https://i.imgur.com/xnlMi8e.png)

Code demonstration performed with React and Typescript over 5 hours without
any external libraries.

### Features
Connected to the Spotify API and polls every second for updates.
- Does not handle ads very well
- Does not handle "nothing playing" (status code 204) well, logs error to console
Left side playlist management uses local storage as requested
- Add track adds the currently playing track to this playlist
- Unique on name, no validation, still works if you use the same name.
- Delete playlist deletes on name, more than one name more than one delete
Tracks can be deleted from the playlist
- Doesn't deduplicate adds, removes all of the same name from the playlist
- If your playlist names are the same, it will remove the track from all playlists

Improvements would be to validate name uniqueness, tests, etc

### To run
Developed on node v15.13.0
`yarn install`
`SPOTIFY_CLIENT_ID= SPOTIFY_CALLBACK_URL='http://localhost:9000'  npm run start`
