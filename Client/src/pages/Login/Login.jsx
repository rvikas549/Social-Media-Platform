import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      setCurrentUser(user); // ✅ this is now inside try block

      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';

      const payload = isLogin
        ? { email }
        : { email, username, uid: user.uid };

      const res = await axios.post(url, payload, {
        withCredentials: true
      });

      console.log('✅ Backend response:', res.data);

      setTimeout(() => {
        toast.success("Welcome back!");
        navigate('/home');
      }, 500);

    } catch (err) {
      toast.success("Welcome back!");
      console.error('❌ Auth error:', err.message || err.response?.data?.message);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="login-title">PETGRAM</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "20px" }}>{isLogin ? 'Login' : 'Sign Up'}</h2>

          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="login-input"
              required
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="login-input"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            required
            onChange={handleChange}
          />

          <button type="submit" className="login-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {!isLogin && (
            <div className="login-check">
              <input type="checkbox" required />
              <p>I agree to the terms and policies</p>
            </div>
          )}

          <div className="login-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={toggleMode} style={{ cursor: "pointer", color: "#007bff" }}>
                {isLogin ? ' Sign Up' : ' Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import { useState } from 'react';
// import axios from 'axios';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../../config/firebase.js';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const { setCurrentUser } = useAuth();
//   setCurrentUser(userCredential.user);
//   const navigate = useNavigate();

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, email, password } = formData;

//     try {
//       let userCredential;
//       if (isLogin) {
//         // Login with Firebase
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         // Register with Firebase
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       }

//       const uid = userCredential.user.uid;

//       // Send user data to backend (MongoDB)
//       const url = isLogin 
//         ? 'http://localhost:5000/api/auth/login'
//         : 'http://localhost:5000/api/auth/register';

//       const payload = isLogin
//         ? { email }
//         : { email, username, uid };

//       const res = await axios.post(url, payload, {
//         withCredentials: true
//       });


//       console.log('✅ Backend response:', res.data);
//       setTimeout(() => {
//         navigate('/home');
//        }, 500);

//     } catch (err) {
//       console.error('❌ Auth error:', err.message || err.response?.data?.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-box">
//         <h1 className="login-title">PETGRAM</h1>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2 style={{ marginBottom: "20px" }}>{isLogin ? 'Login' : 'Sign Up'}</h2>

//           {!isLogin && (
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               className="login-input"
//               required
//               onChange={handleChange}
//             />
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             className="login-input"
//             required
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="login-input"
//             required
//             onChange={handleChange}
//           />

//           <button type="submit" className="login-btn">
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>

//           {!isLogin && (
//             <div className="login-check">
//               <input type="checkbox" required />
//               <p>I agree to the terms and policies</p>
//             </div>
//           )}

//           <div className="login-toggle">
//             <p>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <span onClick={toggleMode}>
//                 {isLogin ? ' Sign Up' : ' Login'}
//               </span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';


// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
  
//     username: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();
//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isLogin 
//         ? 'http://localhost:5000/api/auth/login' 
//         : 'http://localhost:5000/api/auth/register';

//         const payload = isLogin
//         ? formData
//         : { ...formData, uid: uuidv4() };

//         console.log("Payload sent:", payload); 

//       const res = await axios.post(url, payload, {
//         withCredentials: true 
//       });

//       console.log('Response:', res.data);
//       navigate('/home');
//       // Handle login success (e.g., navigate to homepage)
//     } catch (err) {
//       console.error('Auth error:', err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-box">
//         <h1 className="login-title">PETGRAM</h1>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2 style={{ marginBottom: "20px" }}>{isLogin ? 'Login' : 'SignUp'}</h2>
//           {!isLogin && (
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               className="login-input"
//               required
//               onChange={handleChange}
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             className="login-input"
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="login-input"
//             required
//             onChange={handleChange}
//           />
//           <button type="submit" className="login-btn">
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>

//           {!isLogin && (
//             <div className="login-check">
//               <input type="checkbox" required />
//               <p>I agree to the terms and policies</p>
//             </div>
//           )}

//           <div className="login-toggle">
//             <p>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <span onClick={toggleMode}>
//                 {isLogin ? ' Sign Up' : ' Login'}
//               </span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import './Login.css';
// import axios from '../../lib/axios';
// import { API } from '../../config/api';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isLogin) {
//         const res = await axios.post(API.login, { email, password });
//         console.log('Login success:', res.data);
//         // Save token or redirect as needed
//       } else {
//         const res = await axios.post(API.register, { username, email, password });
//         console.log('Sign-up success:', res.data);
//         // Save token or redirect as needed
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Something went wrong';
//       setError(msg);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-box">      
//         <h1 className="login-title">PETGRAM</h1>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2 style={{ marginBottom: "20px" }}>{isLogin ? 'Login' : 'Sign Up'}</h2>

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Username"
//               className="login-input"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email address"
//             className="login-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="login-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

//           <button type="submit" className="login-btn">
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>

//           {!isLogin && (
//             <div className="login-check">
//               <input type="checkbox" required />
//               <p>I agree to the terms and policies</p>
//             </div>
//           )}

//           <div className="login-toggle">
//             <p>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <span onClick={toggleMode}>
//                 {isLogin ? ' Sign Up' : ' Login'}
//               </span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="login">
//       <div className="login-box">      
//       <h1 className="login-title" >PETGRAM</h1>
//       <form className="login-form">
//       <h2 style={{ marginBottom : "20px" }}>{isLogin?'Login':'SignUp'}</h2>
//         {!isLogin && (
//           <input type="text" placeholder="Username" className="login-input" required />
//         )}
//         <input type="email" placeholder="Email address" className="login-input" required />
//         <input type="password" placeholder="Password" className="login-input" required />
//         <button type="submit" className="login-btn"> {isLogin ? 'Login' : 'Sign Up'} </button>

//         {!isLogin && (
//           <div className="login-check">
//             <input type="checkbox" required />
//             <p>I agree to the terms and policies</p>
//           </div>
//         )}

//         <div className="login-toggle">
//           <p>
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <span onClick={toggleMode}>
//               {isLogin ? ' Sign Up' : ' Login'}
//             </span>
//           </p>
//         </div>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react'
// import './Login.css'
// const Login = () => {

//   const [currState,setState] = useState("Sign Up");
//   return (
//     <div className='login'>
//       <form className='login-form'>
//         <input type="text" placeholder='username' className='login-input' required/>
//         <input type="email" placeholder='Email address' className='login-input' required/>
//         <input type="password" placeholder='Password' className='login-input' required/>
//         <button type="submit">{currState}</button>
//         <div className='login-check'>
//           <input type='checkbox'/>
//           <p>Agreed terms and policies</p>
//         </div>
//         <div className='login-check'>
//           <p>Already have an account? <span>Login</span></p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login