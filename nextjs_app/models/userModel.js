import mongoose, { Schema } from 'mongoose';

const phoneRegex = /^[6789]\d{9}$/;

const userSchema = new Schema({
  U_ID: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 8,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(value) {
        return phoneRegex.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 100,
  },
  refer_code: { 
    type: String,
    trim: true,
  },
  signpBy_refer: {
    type: Object,
    trim: true,
  },
  isPlan_buy: {
    type: Boolean,
    trim: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;