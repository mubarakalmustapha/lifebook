import React, { useContext, useEffect, useState } from 'react';
import { getPosts, deletePost } from '../../services/postService';
import Post from '../post/Post';
import Share from '../share/Share';
import UserContext from './../../context/UserContext';
import './feed.css';

function Feed({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = user?.name
        ? await getPosts(`/profile/${user.name}`)
        : await getPosts(`/timeline/${currentUser._id}`);
      setPosts(
        data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
    }
    fetchPosts();
  }, [currentUser, user]);

  const handleDelete = async (post) => {
    const originalPosts = posts;
    const existPost = originalPosts.filter((p) => p._id !== post._id);
    setPosts(existPost);
    try {
      await deletePost(post._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('This post has already been deleted.');
      setPosts({ posts: originalPosts });
    }
  };

  return (
    <div className="feed">
      {!user && (
        <div className="storyContainer">
          <div className="story">
            <img className="storyImage" src={`${PF}mubarak.jpg`} alt="" />
            <p className="storyUsername">Crate story</p>
            <img
              src={`${PF}upload.png`}
              alt=""
              className="userAvata isMyStory"
            />
          </div>
          <div className="story">
            <img className="storyImage" src={`${PF}status-5.png`} alt="" />
            <p className="storyUsername">John Doe</p>
            <img src={`${PF}member-1.png`} alt="" className="userAvata" />
          </div>
          <div className="story">
            <img className="storyImage" src={`${PF}status-2.png`} alt="" />
            <p className="storyUsername">Maria</p>
            <img src={`${PF}member-2.png`} alt="" className="userAvata" />
          </div>
          <div className="story">
            <img className="storyImage" src={`${PF}status-3.png`} alt="" />
            <p className="storyUsername">Susan</p>
            <img src={`${PF}member-3.png`} alt="" className="userAvata" />
          </div>
          <div className="story">
            <img className="storyImage" src={`${PF}status-4.png`} alt="" />
            <p className="storyUsername">Emma</p>
            <img src={`${PF}member-5.png`} alt="" className="userAvata" />
          </div>
        </div>
      )}
      {(!user || user._id === currentUser._id) && <Share />}
      {posts.map((post) => (
        <Post key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Feed;
