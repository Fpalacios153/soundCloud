import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { HomePage } from '../HomePage';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <header className='mainHeader'>

          <nav className='mainNav'>
            <NavLink to='/discover'><h1 className='navLogo'></h1></NavLink>
            <NavLink exact to="/discover">Home</NavLink>
            <NavLink to="/songs">Songs</NavLink>
            <NavLink to='/you/library'>Library</NavLink>
            <NavLink to='/upload'>Upload</NavLink>
            <ProfileButton user={sessionUser} />
          </nav>
        </header>
      </>
    );
  } else {

    sessionLinks = (
      <HomePage />

    );
  }
  return (
    <>
      {isLoaded && sessionLinks}
      <figure>
        <figcaption>AUDIO PLAYER</figcaption>
        <audio
          controls
          src="https://res.cloudinary.com/fpalacios153/video/upload/v1659048867/Symphony_No.6_1st_movement_y2via3.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>

    </>
  );
}

export default Navigation;
