import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {HomePage }from '../HomePage';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <header className='mainHeader'>

      <nav className='mainNav'>
      <NavLink to='/'><h1 className='navLogo'></h1></NavLink>
      <NavLink exact to="/discover">Home</NavLink>
      <NavLink  to="/songs">Songs</NavLink>
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
    </>
    );
}

export default Navigation;