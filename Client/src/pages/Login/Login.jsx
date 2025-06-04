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

