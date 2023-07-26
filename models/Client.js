import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Client must have a name'],
    min: [3, 'Your name is too short!'],
  },
  email: {
    type: String,
    required: [true, 'A Client must have an email'],
    unique: [true, 'Please, enter your email'],
  },
  phone: {
    type: String,
    required: [true, 'A Client must have a phone number'],
    unique: [true, 'Please, enter your phone number'],
  },
});

export default mongoose.model('Client', ClientSchema);
