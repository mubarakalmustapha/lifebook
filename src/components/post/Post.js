import React, { useState, useEffect, useContext } from 'react';
import { MoreVert } from '@material-ui/icons';
import { format } from 'timeago.js';
import { getUsers } from './../../services/userService';
import { getLikes } from './../../services/postService';
import { Link } from 'react-router-dom';
import UserContext from './../../context/UserContext';
import './post.css';

const Post = ({ post, handleDelete }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(UserContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await getUsers(`/users?userId=${post.userId}`);
      setUsers(data);
    }
    fetchUsers();
  }, [post.userId]);

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [post, currentUser]);

  const handleLike = async () => {
    await getLikes(`/${post._id}/like`, {
      userId: currentUser._id,
    });
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };

  const hideDeleteButton = (post) => {
    if (currentUser.isAdmin && currentUser._id === post.userId) {
      return (
        <button className="delete" onClick={() => handleDelete(post)}>
          Delete
        </button>
      );
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${users.name}`}>
              <img
                src={
                  users.profilePicture
                    ? PF + users.profilePicture
                    : PF + 'no-avata.png'
                }
                alt=""
              />
            </Link>
            <span className="postUserName">{users.name}</span>
            <span className="postDate">{format(post.date)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <p>{post.desc}</p>
          <img className="postimg" src={PF + post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              onClick={handleLike}
              src={isLike ? '/images/like-blue.png' : '/images/like.png'}
              alt=""
            />
            <span className="likesCounter">{post.likes.length}</span>
          </div>
          <div className="postBottomRight">
            <span className="commentText">{post.comment} Commemts</span>
            {hideDeleteButton(post)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
