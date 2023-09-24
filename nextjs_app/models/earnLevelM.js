import mongoose, { Schema } from 'mongoose';


const earningSchema = new Schema({
  total_earning: {
    type: Number,
    trim: true,
    required: true,
    default: 0,
  },
  total_withdraw: {
    type: Number,
    trim: true,
    required: true,
    default: 0,
  },
  current_amount: {
    type: Number,
    trim: true,
    required: true,
    default: 0,
  },
  today_earning: {
    type: Number,
    trim: true,
    required: true,
    default: 0,
  },
  level_1: {
    type: Array,
    trim: true,
  },
  level_2: {
    type: Array,
    trim: true,
  },
  level_3: {
    type: Array,
    trim: true,
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

const EarnLevels = mongoose.models.earnlevel || mongoose.model('earnlevel', earningSchema);

export default EarnLevels;