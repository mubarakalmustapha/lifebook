import React, { useContext, useState } from 'react';
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from '@material-ui/icons';
import { savePost } from '../../services/postService';
import UserContext from '../../context/UserContext';
import './share.css';

function Share(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(UserContext);
  const [text, setText] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await savePost({
      userId: currentUser._id,
      desc: text,
      image: file ? file.name : ' ',
    });
    window.location.reload();
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareImage"
            src={
              currentUser.profilePicture
                ? PF + currentUser.profilePicture
                : PF + 'no-avata.png'
            }
            alt=""
          />
          <input
            className="shareInput"
            type="text"
            placeholder={`What's in your mind ${currentUser.name}?`}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="post-image-container">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="post-image"
            />
            <Cancel className="calcel-image" onClick={() => setFile(null)} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptinText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                accept={'.jpg, .png, .jpeg, .jfif'}
                type={'file'}
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptinText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptinText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptinText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
