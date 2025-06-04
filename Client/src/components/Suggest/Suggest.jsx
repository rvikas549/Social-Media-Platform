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

  // return (
  //   <div className="suggestion">
  //     <h3>Suggestions</h3>
  //     {loading ? (
  //       <p>Loading suggestions...</p>
  //     ) : users.length > 0 ? (
  //       users.map((user) => (
  //         <div key={user.uid} className="suggestion-user">
  //           <div className="suggestion-info">
  //             <img
  //               src={
  //                 user.profilePic?.data
  //                   ? `data:${user.profilePic.contentType};base64,${btoa(
  //                       new Uint8Array(user.profilePic.data.data).reduce(
  //                         (data, byte) => data + String.fromCharCode(byte),
  //                         ''
  //                       )
  //                     )}`
  //                   : '/default-profile.png'
  //               }
  //               alt="Profile"
  //               className="profile-pic"
  //             />
  //             <span className="username">{user.username}</span>
  //           </div>
  //           <button
  //             className="add-btn"
  //             onClick={() => handleAddFriend(user.uid)}
  //             disabled={addingFriend === user.uid}
  //             title="Add Friend"
  //           >
  //             +
  //           </button>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No suggestions available.</p>
  //     )}
  //   </div>
  // );



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaUserPlus } from "react-icons/fa";
// import "./Suggest.css";

// //User
// import { useAuth } from "../../context/AuthContext";


// const Suggestion = ({ currentUid }) => {
//   const { currentUser } = useAuth();
//   console.log("Current UID:", currentUser?.uid);


//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5180/api/users/all/:${currentUid}`);
//         setUsers(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching users", err);
//       }
//     };
//     fetchSuggestions();
//   }, [currentUid]);

//   const handleSendRequest = async (toUid) => {
//     try {
//       await axios.post("http://localhost:5000/api/users/send-request", {
//         fromUid: currentUid,
//         toUid,
//       });
//       alert("✅ Friend request sent!");
//     } catch (err) {
//       console.error("❌ Failed to send request", err);
//     }
//   };

//   return (
//     <div className="suggestion">
//       <h3>Suggestions</h3>
//       {users.map((user) => (
//         <div className="suggestion-user" key={user.uid}>
//           <div className="suggestion-info">
//             <img
//               src={user.profilePic || "/default-user.png"}
//               alt="profile"
//               className="profile-pic"
//             />
//             <span className="username">{user.username}</span>
//           </div>
//           <button
//             className="add-btn"
//             onClick={() => handleSendRequest(user.uid)}
//             title="Send Friend Request"
//           >
//             <FaUserPlus />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Suggestion;


// import React from 'react';
// import './Suggest.css';

// const Suggest = ({ suggestions }) => {
//   return (
//     <div className="suggestion">
//       <h3>Suggestion</h3>
//       {/* {suggestions.map((user, index) => (
//         <div key={index} className="suggestion-user">
//           {user}
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default Suggest;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Suggest.css";

// const Suggestion = ({ currentUid }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/all/${currentUid}`);
//         setUsers(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching users", err);
//       }
//     };
//     fetchSuggestions();
//   }, [currentUid]);

//   const handleSendRequest = async (toUid) => {
//     try {
//       await axios.post("http://localhost:5000/api/users/send-request", {
//         fromUid: currentUid,
//         toUid,
//       });
//       alert("✅ Friend request sent!");
//     } catch (err) {
//       console.error("❌ Failed to send request", err);
//     }
//   };

//   return (
//     <div className="suggestion">
//       <h3>Suggestions</h3>
//       {users.map((user) => (
//         <div className="suggestion-user" key={user.uid}>
//           <span>{user.username}</span>
//           <button onClick={() => handleSendRequest(user.uid)}>➕</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Suggestion;
