import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongView from "./components/GetOneSong";
import SongBrowser from "./components/GetSongs";
import UsersSongs from './components/CurrentUsersSongs'
import AlbumBrowser from "./components/GetAlbums";
import AlbumView from "./components/GetOneAlbum";
import UsersAlbums from "./components/CurrentUsersAlbums";
import SelectUserAlbum from "./components/SelectAlbum/SelectAlbum";
import CreateAlbumModal from './components/CreateAlbum/index'
import AudioPlayer from "./components/AudioPlayer";
import { getSongs } from "./store/songs"
import { getAlbums } from "./store/albums";
import { getSongByCurrentUser } from './store/songs'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(getSongByCurrentUser))
      .then(() => dispatch(getSongs()))
      .then(() => dispatch(getAlbums()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path='/discover'>
              <AlbumBrowser />
              <SongBrowser />
            </Route>
            <Route path='/api/albums/:albumId'>
              <AlbumView />
            </Route>
            {/* <Route path='/songs'>
          </Route> */}
            <Route path='/you/library'>
              <UsersSongs />
              <UsersAlbums />
            </Route>
            <Route path='/api/songs/:songId'>
              <SongView />
            </Route>
            <Route path='/upload'>
              <SelectUserAlbum />
              <CreateAlbumModal />
            </Route>
          </Switch>
        )}
        <AudioPlayer />
      </div>
    </>
  );
}

export default App;
