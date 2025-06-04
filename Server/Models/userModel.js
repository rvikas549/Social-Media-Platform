// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friends: [String],
  profilePic: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   uid: { type: String, required: true, unique: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// export default User;

