import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import LandingPage from "./components/LandingPage/LandingPage";
// import SelectUserAlbum from "./components/AlbumSelect/SelectAlbum";
// import CreateAlbumModal from './components/AlbumCreate/index'
// import { getSongByCurrentUser } from './store/songs'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const { song } = useSongContext()
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => dispatch(getSongs()))
      .then(() => dispatch(getAlbums()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  const Home = () => {
    if (currentUser) {
      return (
        <>
          {/* <Redirect to='/businesses' /> */}
          <LandingPage sessionUser={currentUser} />
        </>
      )
    } else {
      return (
        <>
          <HomePage />
        </>
      )
    }
  }
  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          {/* <Route path='/discover'>
              <LandingPage />
            </Route> */}
          <Route>
            <Home />
          </Route>

        </Switch>
      )}
      <div className="audio-holder">
        <AudioPlayers />
      </div>
    </>
  );
}

export default App;
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
