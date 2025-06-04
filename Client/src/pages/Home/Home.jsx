import React from 'react'
import './Home.css'
import Nav from '../../components/Nav/Nav';
import Posts from '../../components/Posts/Posts';
import Suggest from '../../components/Suggest/Suggest';
import bg from "../../assets/Backg.png"

import { useAuth } from "../../context/AuthContext";


const Home = () => {
  const { currentUser } = useAuth();
  console.log("Current UID:", currentUser?.uid);
  if (!currentUser?.uid) return null;


  return (
    <div className='home' >
      <Nav />
      <Posts />
      <Suggest currentUid={currentUser.uid} />
    </div>
  );
}

export default Home

