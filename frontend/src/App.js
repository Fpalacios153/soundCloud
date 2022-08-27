import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/SongAll";
import SongDetails from "./components/SongDetails";
import UsersSongs from './components/SongsCurrentUsers'
import AlbumBrowser from "./components/AlbumsAll";
import AlbumView from "./components/AlbumDetails";
import UsersAlbums from "./components/AlbumsCurrentUsers";
// import SelectUserAlbum from "./components/AlbumSelect/SelectAlbum";
// import CreateAlbumModal from './components/AlbumCreate/index'
import AudioPlayers from "./components/AudioPlayer";
import { getSongs } from "./store/songs"
import { getAlbums } from "./store/albums";
// import { HomePage } from "./components/HomePage";
import UploadHolder from "./components/Upload/Upload";
// import { getSongByCurrentUser } from './store/songs'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(getSongs()))
      .then(() => dispatch(getAlbums()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);
  // const [song, setSong] = useState('')

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="app">
        {isLoaded && (
          <Switch>
            {/* <Route exact path='/'>
              <h1>Welcome to CloudSounds</h1>
            </Route> */}
            {/* <Route exact path='/'>
            <HomePage />
          </Route> */}
            <Route path='/discover'>
              <AlbumBrowser />
              <h2 className="allSongs">All Songs</h2>
              <GetAllSongs />
            </Route>
            <Route path='/api/albums/:albumId'>
              <AlbumView />
            </Route>
            <Route path='/you/library'>
              <UsersAlbums />
              <UsersSongs />
            </Route>
            <Route path='/api/songs/:songId'>
              <SongDetails />
            </Route>
            <Route path='/upload'>
              <UploadHolder />
              {/* <SelectUserAlbum />
              <CreateAlbumModal /> */}
            </Route>
            {/* <Route>
              <h2>Page Not Found</h2>
            </Route> */}
          </Switch>
        )}
        <AudioPlayers />
      </div>
    </>
  );
}

export default App;
