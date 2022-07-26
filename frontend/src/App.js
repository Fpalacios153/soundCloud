import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongView from "./components/GetOneSong";
import SongBrowser from "./components/GetSongs";
import UsersSongs from './components/CurrentUsersSongs'
import { CreateSongg } from "./components/CreateSong";

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
          <Route path='/upload'>
            <CreateSongg />
          </Route>
          <Route path='/songs'>
            <SongBrowser/>
          </Route>
          <Route path='/api/songs/:songId'>
            <SongView />
          </Route>
          <Route path='/you/libary'>
            <UsersSongs />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
