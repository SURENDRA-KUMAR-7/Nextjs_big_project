import mongoose, { Schema } from 'mongoose';


const paymentRequestSchema = new Schema({
  requested_payment: {
    type: Number,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 5,
  },
  payment_status: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  payment_mode: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  payment_modeId: {
    type: mongoose.ObjectId,
    required: true,
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

const PayRequest = mongoose.models.payrequest || mongoose.model('payrequest', paymentRequestSchema);

export default PayRequest;