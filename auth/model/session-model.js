import mongoose from 'mongoose';

const expireStamp = () => new Date();

const schema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  session_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: expireStamp,
  },
});

export default mongoose.model('auth_session', schema);
