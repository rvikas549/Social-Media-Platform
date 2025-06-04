import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyADZzWLj-82abYjLBjPY3B5JInOtWTNmdU",
  authDomain: "petgram-87b19.firebaseapp.com",
  projectId: "petgram-87b19",
  storageBucket: "petgram-87b19.firebasestorage.app",
  messagingSenderId: "895571830538",
  appId: "1:895571830538:web:30f61bc834b182e9b37cf3",
  measurementId: "G-DBHWVF3WNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };

