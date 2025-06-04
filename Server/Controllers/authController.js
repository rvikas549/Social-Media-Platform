import User from '../Models/userModel.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });


//Register User using firebase and send UID to MongoDB
export const registerUser = async (req, res) => {
  const { uid, email, username } = req.body;
  console.log("📥 Register Request Body:", req.body);

  try {
    if (!uid || !email || !username) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      console.log("⚠️ User already exists in MongoDB");
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({ uid, email, username });
    await newUser.save();
    console.log("✅ User saved to MongoDB");

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};



//Login User
export const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


//Get all users except curreent user for Suggestion Box
export const getAllUsersExcept = async (req, res) => {
  const { uid } = req.params;
  try {
    const users = await User.find({ uid: { $ne: uid } }).select("username uid email profilePic"); // Exclude current user
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

//Friend Request
export const addFriend = async (req, res) => {
  const { fromUid, toUid } = req.body;
  try {
    const user = await User.findOne({ uid: fromUid });
    const friend = await User.findOne({ uid: toUid });
    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    // Prevent adding the same friend twice
    const alreadyFriends =
      user.friends.includes(toUid) || friend.friends.includes(fromUid);
    if (alreadyFriends) {
      return res.status(400).json({ message: "Already friends" });
    }
    // Add each other's UID
    user.friends.push(toUid);
    friend.friends.push(fromUid);
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend added successfully (mutual)" });
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const addFriend = async (req, res) => {
//   const { fromUid, toUid } = req.body;
//   try {
//     const user = await User.findOne({ uid: fromUid });
//     const friend = await User.findOne({ uid: toUid });
//     if (!user || !friend) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const alreadyFriends =
//       user.friends.includes(friend._id) || friend.friends.includes(user._id);
//     // Prevent adding the same friend twice
//     if (alreadyFriends) {
//       return res.status(400).json({ message: "Already friends" });
//     }
//     // Add each other as friends
//     user.friends.push(friend._id);
//     friend.friends.push(user._id);

//     await user.save();
//     await friend.save();

//     res.status(200).json({ message: "Friend added successfully (mutual)" });
//   } catch (err) {
//     console.error("Error adding friend:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export const getProfilePic = async (req, res) => {
try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await User.find({ uid: req.params.uid }).sort({ createdAt: -1 });

    let profilePic = null;
    if (user.profilePic?.data && user.profilePic?.contentType) {
      profilePic = {
        data: user.profilePic.data.toString('base64'),
        contentType: user.profilePic.contentType,
      };
    }

    const response = {
      user: {
        username: user.username,
        profilePic,
      },
      posts: posts.map((post) => ({
        imageUrl: post.imageUrl,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const uploadProfilePic =  async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    user.profilePic = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await user.save();
    res.json({ message: 'Profile picture updated' });
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
























// POST: Send Friend Request
// export const sendFriendRequest = async (req, res) => {
//   const { fromUid, toUid } = req.body;
//   try {
//     const sender = await User.findOne({ uid: fromUid });
//     const receiver = await User.findOne({ uid: toUid });

//     if (!sender || !receiver) return res.status(404).json({ error: "User not found" });

//     if (receiver.friendRequests.includes(sender._id)) {
//       return res.status(400).json({ message: "Already sent" });
//     }

//     receiver.friendRequests.push(sender._id);
//     await receiver.save();

//     res.status(200).json({ message: "Friend request sent" });
//   } catch (err) {
//     res.status(500).json({ error: "Error sending request" });
//   }
// };





// export const registerUser = async (req, res) => {
//   const { email, password, username } = req.body;
//   try {
//     // Step 1: Create user in Firebase
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//     });

//     const uid = userRecord.uid;

//     // Step 2: Store user in MongoDB
//     const existingUser = await User.findOne({ uid });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const newUser = new User({
//       uid,
//       username,
//       email,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully", uid });
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed", error: error.message });
//   }
// };


// export const loginUser = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found. Please register.' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// };
