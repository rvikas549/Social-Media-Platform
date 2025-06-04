import express from 'express';
import { getFriends, sendMessage, getMessages } from '../Controllers/messageController.js';
import Message from '../models/messageModel.js';

const router = express.Router();

router.get('/friends/:uid', getFriends);
router.post('/messages', getMessages);
router.post('/send', sendMessage);

// In routes/messageRoutes.js
router.get('/:from/:to', async (req, res) => {
  const { from, to } = req.params;
  try {
    const msgs = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(msgs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});


export default router;
