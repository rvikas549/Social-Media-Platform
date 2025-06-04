import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className='nav'>
      <button onClick={() => navigate('/chat')}>Message</button>
      <button onClick={() => navigate('/post')}>Post</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
    </div>
  );
};

export default Nav;
