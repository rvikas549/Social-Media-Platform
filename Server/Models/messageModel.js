import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,  
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model('Message', messageSchema);

