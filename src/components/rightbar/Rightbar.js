import React, { Fragment, useState, useContext, useEffect } from 'react';
import { getFriends } from '../../services/userService';
import { Users } from '../../services/fakePostService';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';
import { getFollow } from '../../services/userService';
import Online from '../common/online/Online';
import UserContext from './../../context/UserContext';
import './rightbar.css';

function Rightbar({ user }) {
  const { currentUser, dispatch } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    async function fetchFriends() {
      const { data } = await getFriends(`/users/friends/${currentUser._id}`);
      setFriends(data);
    }
    fetchFriends();
  }, [currentUser]);

  const handleFollow = async () => {
    if (followed) {
      const { data } = await getFollow(`/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: 'UNFOLLOW', payload: data });
    } else {
      const { data } = await getFollow(`/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({ type: 'FOLLOW', payload: data });
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/images/gift.jpg" alt="" />
          <span className="birthdayText">
            <b>{currentUser.name}</b> and <b>3 other friends </b> have a
            birthday today
          </span>
        </div>
        <img className="ad" src="images/advertisement.png" alt="" />
        <h4 className="rightbarTitle">Online Friendss</h4>
        {Users.map((user) => (
          <Online key={user._id} user={user} />
        ))}
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <Fragment>
        {currentUser._id !== user._id && (
          <button className="follow-button" onClick={handleFollow}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{currentUser.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{currentUser.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {currentUser.relationship === 1
                ? 'Single'
                : currentUser.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/profile/${friend.name}`}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.progilePicture
                      ? PF + friend.progilePicture
                      : PF + 'no-avata.png'
                  }
                  alt=""
                  className="following"
                />
                <span className="followerName">{friend.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </Fragment>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrpper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
