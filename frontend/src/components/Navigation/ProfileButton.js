import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import { useSongContext } from '../../context/setSongContext'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const { setSong } = useSongContext()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    // .then(() =>
    history.push('/')
    // )
    // .then(() =>
    setSong(null)
    // )
  };

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
        <i className="fas fa-user-circle" /> {user.firstName} {user.lastName}
      </button>
      {showMenu && (
        <div className="profile-dropdown-container">
          <ul className="profile-dropdown">
            <li className="profileLi">{user.firstName}</li>
            <li className="profileLi">{user.username}</li>
            <li className="profileLi">{user.email}</li>
            <li>
              <button className='logOutButton profileLi"' onClick={logout}>Sign Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
