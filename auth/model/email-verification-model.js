import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
  verification_code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('email_verification', verificationSchema);
