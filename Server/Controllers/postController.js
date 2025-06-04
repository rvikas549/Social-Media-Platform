import Post from "../Models/postModel.js"
import User from "../Models/userModel.js";

// controllers/postController.js

export const createPost = async (req, res) => {
  try {
    const { caption, uid } = req.body;
    const imageUrl = req.file?.path;
    if (!imageUrl || !caption || !uid) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new Post({
      caption,
      imageUrl,
      author: user._id,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};


// export const createPost = async (req, res) => {
//   try {
//     const { caption, author } = req.body;
//     const imageUrl = req.file.path; // multer + cloudinary handles this

//     const newPost = new Post({ imageUrl, caption, author });
//     await newPost.save();

//     res.status(201).json(newPost);
//   } catch (error) {
//     console.error("Create Post Error:", error);
//     res.status(500).json({ message: "Failed to create post" });
//   }
// };
// In postController.js

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


// Example: /api/posts/friends/:uid
export const getFriendsPosts = async (req, res) => {
  const { uid } = req.params;
  try {
    const currentUser = await User.findOne({ uid });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendUIDs = currentUser.friends || [];

    const friendUsers = await User.find({ uid: { $in: friendUIDs } });
    const friendIds = friendUsers.map(user => user._id); // ObjectIds for query

    const posts = await Post.find({ author: { $in: friendIds } })
      .populate("author", "username uid")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Fetch Friends Posts Error:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};


// export const getFriendsPosts = async (req, res) => {
//   const { uid } = req.params;
//   try {
//     const currentUser = await User.findOne({ uid });
//     if (!currentUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const friendUIDs = currentUser.friends || [];

//     console.log("Friend UIDs:", friendUIDs);
//     // Get ObjectIds of friend users
//     const friendObjectIds = (currentUser.friends || []).map(id => new mongoose.Types.ObjectId(id));
    
//     console.log("Friend Users:", friendUsers.map(u => ({ uid: u.uid, _id: u._id })));

//     const friendIds = friendUsers.map((f) => f._id);
//     const posts = await Post.find({ author: { $in: friendObjectIds } })
//       .populate("author", "username uid") // populate name and uid of author
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Fetch Friends Posts Error:", error);
//     res.status(500).json({ message: "Failed to fetch posts", error });
//   }
// };





//Get Current Post
export const getUserPosts = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};









// export const getFriendsPosts = async (req, res) => {
//   const { uid } = req.params;

//   try {
//     // Get current user and their friends' UIDs
//     const currentUser = await User.findOne({ uid });
//     const friendUIDs = currentUser.friends; // assuming an array of friend UIDs

//     // Get posts from friends
//     const posts = await Post.find({ authorUid: { $in: friendUIDs } })
//       .populate('author') // if you want author details
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch posts', error });
//   }
// };



// import Post from '../models/postModel.js';

// export const createPost = async (req, res) => {
//   const { content, imageUrl } = req.body;
//   try {
//     const post = await Post.create({
//       author: req.user.uid,
//       content,
//       imageUrl
//     });
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate('author', 'username');
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
