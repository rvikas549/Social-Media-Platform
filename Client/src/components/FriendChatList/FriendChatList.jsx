// FriendChatList.jsx
import React ,{ useEffect, useState } from 'react';
import './FriendChatList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const FriendChatList = ({ onSelectFriend }) => {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

   useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/friends/${currentUser?.uid}`);
        console.log('Friends:', res.data);
        setFriends(res.data);
      } catch (err) {
        console.error('Failed to load friends', err);
      }
    };
    if (currentUser?.uid) {
      fetchFriends();
    }
  }, [currentUser]);

  const handleTitleClick = () => {
    navigate("/home");
  };
  return (
    <div style={{padding:"0px 30px", borderRight:"2px solid black", borderRadius:"0%"}}>
      <h1 onClick={handleTitleClick} style={{ fontWeight: "bolder", fontSize: "4rem" ,cursor: "pointer",textAlign: "center", marginBottom:"15px" }}>PETGRAM</h1>
      <div className="friend-chat-list">
        <h2 className='messHeader'>Message</h2>

        <div className='messageCard'>

          {friends.map((friend) => (
            <div
            key={friend._id}
            className="friend-item"
            onClick={() => onSelectFriend(friend)}
            >
              {friend.username}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default FriendChatList;
