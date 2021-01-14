import mongoose from 'mongoose';
import User from './user.model';

const schema = new mongoose.Schema({
  stripeCardId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  lastDigits: {
    type: String,
    required: true,
    maxlength: 4,
    minlength: 4,
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

schema.method({
  /**
   * Finds user owning the card
   *
   * @returns
   */
  owner() {
    return User.findOne({ _id: this.userId }).exec();
  },
  /**
   * Fetches corresponding stripe card object
   *
   * @returns
   */
  stripe() {
    // TODO Implement logic
  },
});

const Card = mongoose.model('Card', schema);

export default Card;
