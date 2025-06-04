import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';



const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // Holds profile data: image, username, posts
  const [profileData, setProfileData] = useState({
    user: {
      profilePic: "https://placehold.co/100x100",
      username: "",
    },
    posts: [],
  });

  // For storing the selected image file
  const [selectedFile, setSelectedFile] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch user profile and post data from backend
  const fetchProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${currentUser.uid}`);
      const data = await res.json();

      // Convert profilePic from bytes to base64 if present
      if (data.user.profilePic?.data) {
        data.user.profilePic = `data:${data.user.profilePic.contentType};base64,${data.user.profilePic.data}`;
      } else {
        data.user.profilePic = "https://placehold.co/100x100";
      }


      setProfileData(data);

    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  // Fetch current user's posts from backend
  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/user/${currentUser.uid}`);
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [currentUser]);

  // Upload profile image to backend
  const handleUpload = async () => {
      if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await fetch(`http://localhost:5000/api/users/profile-pic/${currentUser.uid}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        // After successful upload, refetch profile
        toast.success("Profile picture updated!");
        await fetchProfile();
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  
  const handleLogout = async () => {
  try {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login"); // redirect after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  const handleTitleClick = () => {
    navigate("/");
  };

  
return (
  <div className="profile-page">
    <Nav />
    <main className="profile-main">
            <h1 className="heading" onClick={handleTitleClick} style={{ cursor: "pointer" }}>
              PETGRAM
            </h1>


      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-pic-container" onClick={() => document.getElementById('fileInput').click()}>
          <img
            src={profileData.user.profilePic}
            alt="Profile"
            className="profile-pic"
          />
        </div>
        <div className="username-box">{profileData.user.username}</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        {selectedFile && (
          <button className="upload-btn" onClick={handleUpload}>
            Upload Profile Picture
          </button>
        )}
      </div>

      <hr className="divider" />

      {/* Posts Grid */}
      {/* <div className="posts-grid">
        {profileData.posts.length > 0 ? (
          profileData.posts.map((post, i) => (
            <img
              key={i}
              src={post.imageUrl}
              className="post-preview"
              alt={`Post ${i}`}
            />
          ))
        ) : (
          <div className="no-posts">No posts to show.</div>
        )}
      </div> */}
      {/* Posts Grid */}
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <img
              key={i}
              src={post.imageUrl}
              className="post-preview"
              alt={`Post ${i}`}
            />
          ))
        ) : (
          <div className="no-posts">No posts to show.</div>
        )}
      </div>
    </main>
  </div>
);


};

export default ProfilePage;

