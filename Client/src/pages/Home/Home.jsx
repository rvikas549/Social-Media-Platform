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


// import React from 'react';
// import Post from './Post';
// import Suggestion from './Suggestion';
// import Nav from './Nav';
// import './Home.css';

// const Home = () => {
//   const posts = [
//     { username: 'alice', image: 'https://via.placeholder.com/300' },
//     { username: 'bob', image: 'https://via.placeholder.com/300' },
//   ];

//   const users = ['charlie', 'dave', 'emma'];

//   return (
//     <div className="home">
//       <Nav />
//       <div className="post-section">
//         {posts.map((post, index) => (
//           <Post key={index} username={post.username} image={post.image} />
//         ))}
//       </div>
//       <Suggestion suggestions={users} />
//     </div>
//   );
// };

// export default Home;

// .home {
//   display: flex;
//   height: 100vh;
//   background: linear-gradient(to bottom right, #aac1ff, #e6c1f2);
//   padding: 1rem;
//   gap: 2rem;
// }

// .post-section {
//   flex: 2;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: auto;
// }

// .suggestion {
//   flex: 0.6;
// }

