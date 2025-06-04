// Routes/postRoutes.js
import express from "express";
import multer from "multer";
import upload from '../middleware/multer.js';
import { createPost, getAllPosts ,getFriendsPosts ,getUserPosts} from "../Controllers/postController.js";
import { storage } from "../config/cloudinary.js";

const router = express.Router();

router.post("/uploads", upload.single("image"), createPost);
router.get("/", getAllPosts);

//Feed Posts
router.get('/friends/:uid', getFriendsPosts);

//Get Profile Posts
router.get('/user/:uid', getUserPosts);
export default router;


// import express from "express";
// import { upload } from "../middleware/upload.js";
// import { uploadPost } from "../Controllers/postController.js";

// const router = express.Router();

// // Route to upload post
// router.post("/uploads", upload.single("image"), uploadPost);

// export default router;
