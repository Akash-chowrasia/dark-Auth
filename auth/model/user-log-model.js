import mongoose from 'mongoose';

const schema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  date: {
    type: Date,
    default: Date,
  },

  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model('user_log', schema);
