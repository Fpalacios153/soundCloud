import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import SongBrowser from '../GetSongs/index';
import {HomePage }from '../HomePage';
import './Navigation.css';
import { CreateSongg } from '../CreateSong';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <nav className='mainNav'>
      <NavLink to='/'><h1 className='logo'></h1></NavLink>
      <NavLink exact to="/discover">Home</NavLink>
      <NavLink  to="/songs">Songs</NavLink>
      <NavLink to='you/libary'>Library</NavLink>
      <NavLink to='/upload'>Upload</NavLink>
      <ProfileButton user={sessionUser} />
      </nav>
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
