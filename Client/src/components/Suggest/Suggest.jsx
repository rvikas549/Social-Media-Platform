import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Suggest.css'

const Posts = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingFriend, setAddingFriend] = useState(null);
  

useEffect(() => {
  const fetchFriendsPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/all/${currentUser?.uid}`);
      const data = res.data;
      console.log('Response:', res.data);
      console.log('Data type:', typeof res.data);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching friends posts', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser?.uid) {
    fetchFriendsPosts();
  }
}, [currentUser]);


const handleAddFriend = async (toUid) => {
    if (!currentUser?.uid || !toUid || addingFriend) return;
    setAddingFriend(toUid);
    try {
      console.log("Sending friend request:", { fromUid: currentUser.uid, toUid: toUid,});
      const res = await axios.post(`http://localhost:5000/api/users/add-friend`, {
        fromUid: currentUser.uid,
        toUid: toUid
      },{
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (res.data.message === "Friend added successfully (mutual)") {
      alert("Friend added!");
      // Remove the user from suggestions list
      // setUsers((prev) => prev.filter((user) => user.uid !== toUid));
    } else {
      // Log unexpected success responses
      console.warn("Unexpected response:", res.data);
    }
    } catch (err) {
      console.error("Error adding friend:", err);
    } finally {
      setAddingFriend(null);
    }
  };

  const isAlreadyFriend = (userUid) => {
  return currentUser?.friends?.includes(userUid);
  };

  return (
  <div className="suggestion">
    <h3>USERS</h3>
    {loading ? (
      <p>Loading suggestions...</p>
    ) : users.length > 0 ? (
      users.map((user) => (
        <div key={user.uid} className="suggestion-user">
          <div className="suggestion-info">
            <img
              src={
                user.profilePic?.data
                  ? `data:${user.profilePic.contentType};base64,${btoa(
                      new Uint8Array(user.profilePic.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    )}`
                  : '/default-profile.png'
              }
              alt="Profile"
              className="pro-pic"
            />
            <span className="username">{user.username}</span>
          </div>

          {/* ✅ Only show "+" if not already friends */}
          {!isAlreadyFriend(user.uid) && (
            <button
              className="add-btn"
              onClick={() => handleAddFriend(user.uid)}
              disabled={addingFriend === user.uid}
              title="Add Friend"
            >
              {addingFriend === user.uid ? "Adding..." : "+"}
            </button>
          )}
        </div>
      ))
    ) : (
      <p>No suggestions available.</p>
    )}
  </div>
);

};

export default Posts;
