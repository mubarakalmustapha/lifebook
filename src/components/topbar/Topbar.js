import React from 'react';
import { Chat, Person, Search, Notifications } from '@material-ui/icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './../../context/UserContext';
import './topbar.css';

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(UserContext);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link style={{ textDecoration: 'none' }} to="/">
          <span className="logo">Lifebook</span>
        </Link>
      </div>

      <div className="topbar-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            placeholder="Search for friends, videos or posts"
            className="search-input"
          />
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/logout'}>
          <span>Logout</span>
        </Link>
        <Link to={`/profile/${currentUser.name}`}>
          <img src={PF + 'mubarak.jpg'} alt="" className="profile-pic" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
