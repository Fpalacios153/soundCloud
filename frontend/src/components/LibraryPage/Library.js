import { NavLink, Route, Switch } from "react-router-dom";
import UsersAlbums from "../AlbumsCurrentUsers";
import PlaylistGet from "../Playlist/PlaylistGet/playlistGet";
import UsersSongs from "../SongsCurrentUsers";
import './LibraryPage.css'

export default function LibraryPage() {


    return (
        <>
            <div className="library-container">

                <div className="library-navlink-container">
                    <NavLink className='library-navlink-item' to='/user/overview'>Overview</NavLink>
                    <NavLink className='library-navlink-item' to='/user/albums'>Albums</NavLink>
                    <NavLink className='library-navlink-item' to='/user/songs'>Songs</NavLink>
                    <NavLink className='library-navlink-item' to='/user/playlists'>Playlist</NavLink>
                </div>
            </div>
            <div>
                <Switch>
                    <Route path='/user/overview'>
                        <div>Overview</div>
                    </Route>
                    <Route path='/user/albums'>
                        <UsersAlbums />
                    </Route>
                    <Route path='/user/songs'>
                        <UsersSongs />
                    </Route>
                    <Route path='/user/playlists'>
                        <PlaylistGet />
                    </Route>
                </Switch>
            </div>
        </>
    )

}
