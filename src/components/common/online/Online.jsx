import React from 'react';
import "./online.css"

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <ul className='rightbarFriendList'>
            <li className='rightbarFriend'>
                <div className="rightbarImgContainer">
                    <img className='profileImage' src={PF + user.profilePicture} alt="" />
                    <span className='online'></span>
                </div>
                <span className='username'>{user.name}</span>
            </li>
        </ul>

    );
}

export default Online;