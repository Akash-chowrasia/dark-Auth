import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ['ROOT', 'ADMIN', 'TENANT'],
    default: () => {
      const isLocal = process.env.NODE_ENV.toLowerCase() === 'local';
      return isLocal ? 'ADMIN' : 'TENANT';
    },
  },

  password: {
    type: String,
    required: true,
  },

  is_email_verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('user_models', userSchema);
