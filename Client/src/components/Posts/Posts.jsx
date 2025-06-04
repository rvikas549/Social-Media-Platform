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

