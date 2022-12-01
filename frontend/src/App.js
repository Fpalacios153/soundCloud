import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/SongAll";
import SongDetails from "./components/SongDetails";
import UsersSongs from './components/SongsCurrentUsers'
import AlbumBrowser from "./components/Albums/AlbumsAll";
import AlbumView from "./components/Albums/AlbumDetails";
import UsersAlbums from "./components/Albums/AlbumsCurrentUsers";
import AudioPlayers from "./components/AudioPlayer";
import { getSongs } from "./store/songs"
import { getAlbums } from "./store/albums";
import { HomePage } from "./components/HomePage";
import UploadHolder from "./components/Upload/Upload";
import { useSongContext } from "./context/setSongContext";
import PlaylistGet from "./components/Playlist/PlaylistGet/playlistGet";
import LibraryPage from "./components/LibraryPage/Library";
import PlaylistDetails from "./components/Playlist/PlaylistDetails.js/playlistDetails";
// import SelectUserAlbum from "./components/AlbumSelect/SelectAlbum";
// import CreateAlbumModal from './components/AlbumCreate/index'
// import { getSongByCurrentUser } from './store/songs'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { song } = useSongContext()
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(getSongs()))
      .then(() => dispatch(getAlbums()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="app">
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/discover'>
              <AlbumBrowser />
              {/* <h2 className="allSongs">All Songs</h2> */}
              <GetAllSongs />
            </Route>
            <Route path='/albums/:albumId'>
              <AlbumView />
            </Route>
            <Route path='/songs/:songId'>
              <SongDetails />
            </Route>
            <Route path='/playlists/:playlistId'>
              <PlaylistDetails />
            </Route>
            <Route path='/upload'>
              <UploadHolder />
            </Route>

            {/* library Routes */}
            <Route path='/you/library'>
              <LibraryPage />
              {/* <UsersAlbums />
              <UsersSongs />
              <PlaylistGet /> */}
            </Route>
            {/* <Route path='/you/overview'>
              <LibraryPage />
            </Route> */}
            <Route path='/you/albums'>
              <LibraryPage />
            </Route>
            <Route path='/you/songs'>
              <LibraryPage />
            </Route>
            <Route path='/you/playlists'>
              <LibraryPage />
            </Route>
            <Route>
              <h1>Page Not Found</h1>
            </Route>
          </Switch>
        )}
      </div>
      <div className="audio-holder">
        {/* <div className='audio-tile'>
          {song && (
            <div className='currently-playing'>
              <img style={{ width: '2em', height: '2em' }} src={song.previewImage} />
              <div className='audio-word-holder'>
                <p>{song.title}</p>
              </div>
            </div>
          )}
        </div> */}
        <AudioPlayers />
      </div>
    </>
  );
}

export default App;
