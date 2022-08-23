import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { HomePage } from '../HomePage';
import SongDetails from '../SongDetails';
import './Navigation.css';
// import AudioPlayer from '../AudioPlayer';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className='mainHeader'>
          <nav className='mainNav'>
            <NavLink to='/discover'  >
              <div className='navLogo'> </div>
            </NavLink>
            <NavLink exact to="/discover">Home</NavLink>
            {/* <NavLink to="/songs">Songs</NavLink> */}
            <NavLink to='/you/library'>Library</NavLink>
            <NavLink to='/upload'>Upload</NavLink>
            <ProfileButton user={sessionUser} />
          </nav>
        </div>
      </>
    );
  } else {

    sessionLinks = (
      <>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      </>


    );
  }
  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;
