import express from "express";
import { getAllUsersExcept, addFriend ,getProfilePic ,uploadProfilePic} from "../controllers/authController.js";
import multer from "multer";
import User from "../Models/userModel.js"
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Suggestion Box
router.get("/all/:uid", getAllUsersExcept);

//Friend Request
router.post("/add-friend", addFriend);

//Profile Pic
router.get('/profile/:uid', getProfilePic);

//Upload ProfilePic
router.post('/profile-pic/:uid', upload.single('profilePic'),uploadProfilePic );

export default router;