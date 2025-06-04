// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";


// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("🟢 AuthContext: currentUser =", user?.uid || "None");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// PropTypes for safety
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);


// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { auth } from "../config/firebase.js";
// import { onAuthStateChanged } from "firebase/auth";

// // Create context
// const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Optional: track auth loading

//   useEffect(() => {
//     // Listen for Firebase auth changes
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       console.log("🟢 AuthContext: currentUser =", user?.uid || "None");
//       setLoading(false); // Stop loading once state is known
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);
//    const logout = () => signOut(auth);

//   return (
//     <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
//       {!loading && children} {/* Render children only after auth state is known */}
//     </AuthContext.Provider>
//   );
// };

// // PropTypes for development safety
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // Custom hook for easy use
// export const useAuth = () => useContext(AuthContext);




// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../config/firebase.js";
// import { onAuthStateChanged } from "firebase/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       console.log("🟢 AuthContext: currentUser =", user?.uid || "None");
//     });
//     return () => unsub();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser,setCurrentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
