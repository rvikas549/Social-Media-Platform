import express from 'express';
import {loginUser, registerUser  ,getAllUsersExcept } from '../controllers/authController.js';
import multer from "multer";
import User from "../Models/userModel.js";
import Post from "../Models/postModel.js"

//Express Router
const router = express.Router();

//Bytes Storing
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', registerUser);
router.post('/login', loginUser);     

router.get('/all/:uid', getAllUsersExcept);







// Upload profile pic
router.post("/profile-pic/:uid", upload.single("profilePic"), async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ uid });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.profilePic = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  await user.save();
  res.json({ success: true });
});


// Get profile data and posts
router.get("/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid }).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: user._id }).lean();
    res.json({
      user: {
        profilePic: user.profilePic,
        username: user.username || user.email || "Unknown User",
      },
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
