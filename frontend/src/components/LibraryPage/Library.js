import { useEffect, useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import UsersAlbums from "../AlbumsCurrentUsers";
import CreatePlaylist from "../Playlist/PlaylistCreate/playlistCreate";
import PlaylistGet from "../Playlist/PlaylistGet/playlistGet";
import UsersSongs from "../SongsCurrentUsers";
import './LibraryPage.css'

export default function LibraryPage() {
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        setSelected(true)
    }, [])


    return selected ? (
        <>
            <div className="library-container">

                <div className="library-navlink-container">
                    {/* comback to this  */}
                    <NavLink className='library-navlink-item' to='/you/library'>Overview</NavLink>

                    <NavLink className='library-navlink-item' to='/you/albums'>Albums</NavLink>
                    <NavLink className='library-navlink-item' to='/you/songs'>Songs</NavLink>
                    <NavLink className='library-navlink-item' to='/you/playlists'>Playlist</NavLink>
                </div>
            </div>
            <div>
                <Switch>
                    <Route path='/you/library'>
                        <div>Overview</div>
                    </Route>
                    <Route path='/you/albums'>
                        <UsersAlbums />
                    </Route>
                    <Route path='/you/songs'>
                        <UsersSongs />
                    </Route>
                    <Route path='/you/playlists'>
                        <PlaylistGet />
                        <CreatePlaylist />
                    </Route>
                </Switch>
            </div>
        </>
    ) : null

}
