import mongoose, { Schema } from 'mongoose';

const phoneRegex = /^[6789]\d{9}$/;

const upiSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 17,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    validate: {
      validator: function(value) {
        return phoneRegex.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  upi: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

const UpiId = mongoose.models.upid || mongoose.model('upid', upiSchema);

export default UpiId;