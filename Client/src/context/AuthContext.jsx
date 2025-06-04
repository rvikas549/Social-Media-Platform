import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

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


export const useAuth = () => useContext(AuthContext);

