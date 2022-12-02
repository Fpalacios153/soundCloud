import { NavLink, Route, Switch } from "react-router-dom";
import AlbumView from "../Albums/AlbumDetails";
import AlbumBrowser from "../Albums/AlbumsAll";
import LibraryPage from "../LibraryPage/Library";
import ProfileButton from "../Navigation/ProfileButton";
import PlaylistDetails from "../Playlist/PlaylistDetails.js/playlistDetails";
import GetAllSongs from "../SongAll";
import SongDetails from "../SongDetails";
import UploadHolder from "../Upload/Upload";

export default function LandingPage({ sessionUser }) {
    // const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div className='mainHeader'>
                <nav className='mainNav'>
                    <NavLink className='logo-after-login' to='/' >
                        <img src='https://a-v2.sndcdn.com/assets/images/peace-cloud-28ad0963.svg' alt='logo' className='navLogo' />
                    </NavLink>
                    <NavLink exact to="/discover">Home</NavLink>
                    <NavLink to='/you/albums'>Library</NavLink>
                    <NavLink to='/upload'>Upload</NavLink>
                    <ProfileButton user={sessionUser} />
                </nav>
            </div>
            <div className="app">
                <Switch>
                    <Route exact path='/'>
                        <AlbumBrowser />
                        <GetAllSongs />
                    </Route>
                    <Route exact path='/discover'>
                        <AlbumBrowser />
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
            </div>
        </>
    )
}
