import React from 'react';

const Friends = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <ul className='sidebarFriendList'>
            <li className="sidebarFriend">
                <img src={PF + user.profilePicture} alt="" className="friendimage" />
                <span className="sidebarFriendName">{user.name}</span>
            </li>
        </ul>
    );
};

export default Friends;