import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import './Posts.css'
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/friends/${currentUser?.uid}`);
        console.log('Response:', res);
        
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching friends posts', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFeed();
    }
  }, [currentUser]);
  
  const handleTitleClick = () => {
    navigate("/home");
  };

  return (
    <div className='fullHome'>
    <h1 onClick={handleTitleClick} style={{ fontWeight: "bolder", fontSize: "4rem" ,cursor: "pointer" }}>PETGRAM</h1>

    <div className="feed-container">
    {loading ? (
      <p>Loading feed...</p>
    ) : posts.length > 0 ? (
      posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>{post.author?.username || "Unknown User"}</h3>
          <img src={post.imageUrl} alt="Post" className="post-image" />
          <p>{post.caption}</p>
        </div>
      ))
    ) : (
      <p>No posts from friends.</p>
    )}
  </div>


    </div>
  );
};

export default Posts;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext'; // adjust based on your context

// const Posts = () => {
//   const { currentUser } = useAuth();
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchFriendsPosts = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5180/api/posts/friends/${currentUser.uid}`);
//         setPosts(res.data);
//       } catch (err) {
//         console.error('Error fetching friends posts', err);
//       }
//     };

//     if (currentUser) {
//       fetchFriendsPosts();
//     }
//   }, [currentUser]);

//   return (
//     <div className="feed-container">
//       {posts.length > 0 ? (
//         posts.map((post, idx) => (
//           <Posts key={idx} username={post.author.name} image={post.imageUrl} />))) 
//           : (<p>No posts from friends yet.</p>)}
//     </div>
//   );
// };

// export default Posts;


// import React from 'react';
// import './Posts.css';
// import bg from "../../assets/Backg.png"
// import Nav from "../Nav/Nav.jsx";
// //import { FaUserCircle } from 'react-icons/fa';

// const Posts = ({ username, image }) => {
//   return (
//     <div className="post" >
//       <h1 className="login-title">PETGRAM</h1>
//       <div className="container" >

//         <div className="post-header">
//           {/* <FaUserCircle size={28} className="post-icon" /> */}
//           <span className="post-username">{username}</span>
//         </div>
//         <div className="post-image">
//           <img src={image} alt="Post" />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Posts;
