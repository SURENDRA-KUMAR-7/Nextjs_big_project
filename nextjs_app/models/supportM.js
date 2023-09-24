import mongoose, { Schema } from 'mongoose';

const phoneRegex = /^[6789]\d{9}$/;

const supportSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 35,
  },
  phoneNumber: {
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
  reason: {
    type: String,
    trim: true,
    required: true,
    minlength: 16,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

const Support = mongoose.models.support || mongoose.model('support', supportSchema);

export default Support;