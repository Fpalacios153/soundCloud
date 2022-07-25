import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink exact to="/">Home</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className='topPart'>
      <div className='nav'>
      <h1 className='logo'>CloudSound</h1>
      <div className='leftNav'>
        <LoginFormModal />
        <SignupFormModal />
      </div>
      </div>
      </div>
    );
  }
  return (
    <>
       {isLoaded && sessionLinks}
    </>
    );
}

export default Navigation;
