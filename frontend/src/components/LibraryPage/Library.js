import { NavLink, Route, Switch } from "react-router-dom";

export default function LibraryPage() {


    return (
        <>
            <div>
                <NavLink to='/Overview'>Overview</NavLink>
                <NavLink to='/Albums'>Albums</NavLink>
                <NavLink to='/Songs'>Songs</NavLink>
                <NavLink to='/Playlist'>Playlist</NavLink>
            </div>
            <div>
                <Switch>
                    <Route path='/Overview'>
                        <div>Overview</div>
                    </Route>
                    <Route path='/Albums'>
                        <div>Albums</div>
                    </Route>
                    <Route path='/Songs'>
                        <div>Songs</div>
                    </Route>
                    <Route path='/Playlist'>
                        <div>Playlist</div>
                    </Route>
                </Switch>
            </div>
        </>
    )

}
