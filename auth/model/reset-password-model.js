import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('reset_password_model', schema);
