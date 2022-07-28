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
import CreateAlbum from "./components/CreateAlbum";
import SelectUserAlbum from "./components/SelectAlbum/SelectAlbum";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
          <Route path='/songs'>
          </Route>
          <Route path='/you/library'>
            <UsersSongs />
            <UsersAlbums />
          </Route>
          <Route path='/api/songs/:songId'>
            <SongView />
          </Route>
          <Route path='/upload'>
            <SelectUserAlbum />
            <CreateAlbum />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
