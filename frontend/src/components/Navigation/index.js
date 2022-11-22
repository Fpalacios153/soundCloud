import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUser from '../DemoUser';
import LoginFormModal from '../ModalLoginForm';
import SignupFormModal from '../ModalSignupForm';
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
            <NavLink className='logo-after-login' to='/discover' >
              <img src='https://a-v2.sndcdn.com/assets/images/peace-cloud-28ad0963.svg' alt='logo' className='navLogo' />
            </NavLink>
            <NavLink exact to="/discover">Home</NavLink>
            <NavLink to='/you/albums'>Library</NavLink>
            <NavLink to='/upload'>Upload</NavLink>
            <ProfileButton user={sessionUser} />
          </nav>
        </div>
      </>
    );
  } else {

    sessionLinks = (
      <>
        <div className='app-Container'>
          <div className='topPart'>
            <div className='nav'>
              <div className='logo-container'>
                <h1 className='logo'></h1>
                <h1 className='logoWords'>CLOUDSOUNDS</h1>
              </div>
              <div className='leftNav'>
                <DemoUser />
                <LoginFormModal />
                <SignupFormModal />
              </div>
            </div>
          </div>
        </div>
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
