import mongoose, { Schema } from 'mongoose';


const bankSchema = new Schema({
  holder_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  bank_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  account_number: {
    type: Number,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  ifsc_code: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 25,
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

const BankD = mongoose.models.bank || mongoose.model('bank', bankSchema);

export default BankD;