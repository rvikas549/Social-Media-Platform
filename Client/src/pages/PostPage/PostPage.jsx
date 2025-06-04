import { useState } from 'react';
import "./PostPage.css"
import Nav from '../../components/Nav/Nav';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PostPage = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  
  //Current User
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !caption || !currentUser?.uid) {
      alert("Please fill all fields");
      return;
    }
    // Placeholder for backend API call to upload post
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    formData.append("uid", currentUser.uid); 

    try {
      const response = await fetch('http://localhost:5000/api/posts/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        toast.error(`Upload failed: ${errText}`);
        return;
      }

      const data = await response.json();
      toast.success(data.message || "Post uploaded successfully!");
      setImage(null);
      setCaption("");
      setTimeout(() => {
        navigate("/home"); 
      }, 3000);


    } catch (error) {
      console.error('Upload failed', error);
      toast.error("An error occurred while uploading.");
    }
  };
  const handleTitleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="postPage">
        <h1 className="heading" onClick={handleTitleClick} style={{ cursor: "pointer" }}>
          PETGRAM
        </h1>

        <div className="post-container">
          <Nav />
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="image-preview">
              <label htmlFor="imageUpload" className="upload-box">
                📷 Click to upload
              </label>
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
                />
            </div>
            <textarea
              placeholder="Caption"
              className="caption-box"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              ></textarea>
            <button type="submit" className="uplod-btn">UPLOAD</button>
          </form>
        </div>
          <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </>
  );
};

export default PostPage;
