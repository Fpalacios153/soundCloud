import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import SongBrowser from '../SongsFeature/index';
import {HomePage }from '../HomePage';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      {/* <nav className='signedInNav'>
        <h1 className='logo'></h1>
        <h1>CloudSounds</h1> */}
      <NavLink exact to="/">Home</NavLink>
      <ProfileButton user={sessionUser} />
      {/* </nav> */}

      <SongBrowser />
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
    </>
    );
}

export default Navigation;
