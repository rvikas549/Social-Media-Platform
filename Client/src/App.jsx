import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import PostPage from './pages/PostPage/PostPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
         <Route path='/'element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route path='/home'element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/chat'element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path='/post'element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login/Login.jsx';
// import Home from './pages/Home/Home';
// import Chat from './pages/Chat/Chat';
// import PostPage from './pages/PostPage/PostPage';
// import ProfilePage from './pages/ProfilePage/ProfilePage';

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/home' element={<Home />} />
//         <Route path='/chat' element={<Chat />} />
//         <Route path='/post' element={<PostPage />} />
//         <Route path='/profile' element={<ProfilePage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
