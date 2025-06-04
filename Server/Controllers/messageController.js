import Message from '../models/messageModel.js';
import User from '../Models/userModel.js';


export const getFriends = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get list of friend UIDs
    const friendUIDs = user.friends;

    // Fetch all friends using their UIDs
    const friends = await User.find({ uid: { $in: friendUIDs } })
      .select('uid username email'); // select only needed fields

    res.status(200).json(friends);
  } catch (err) {
    console.error('Error fetching friends:', err);
    res.status(500).json({ message: 'Failed to get friends' });
  }
};

// export const getFriends = async (req, res) => {
//   const { uid } = req.params;
//   try {
//     const user = await User.findOne({ uid });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const friendUIDs = user.friends;
//     // Manually find all users whose uid matches any in user's friends array
//     const friends = await User.find({ uid: { $in: user.friends } }).select('uid username email');
//     res.status(200).json(friends);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to get friends' });
//   }
// };


export const getMessages = async (req, res) => {
  const { from, to } = req.body;
  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from }
      ]
    }).sort('createdAt');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

export const sendMessage = async (req, res) => {
  const { from, to, text } = req.body;
  try {
    const message = new Message({ from, to, text });
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};


// export const sendMessage = async (req, res) => {
//   const { receiverId, text } = req.body;

//   try {
//     const message = await Message.create({
//       sender: req.user.uid,
//       receiver: receiverId,
//       text,
//     });
//     res.status(201).json(message);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getMessages = async (req, res) => {
//   const { receiverId } = req.params;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: req.user.uid, receiver: receiverId },
//         { sender: receiverId, receiver: req.user.uid },
//       ],
//     }).sort('createdAt');
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
