import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getUsers } from '../../services/userService';
import Topbar from '../topbar/Topbar';
import Sidebar from '../common/sidebar/Sidebar';
import Feed from '../feed/Feed';
import Rightbar from '../rightbar/Rightbar';
import './profile.css';

const Profile = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUsers(`/users?username=${username}`);
      setUser(data);
    }
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg-1"
                src={PF + 'cover.png'}
                alt=""
              />
              <img
                className="profileCoverImg-2"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'no-avata.png'
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4>{user.name}</h4>
              <p>{user.bio}</p>
            </div>
          </div>
          <div className="profileRghtBottom">
            <Feed user={user} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
